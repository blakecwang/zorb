// Init global vars.
var Engine,
    Render,
    World,
    Bodies,
    Body,
    Events,
    engine,
    dd,
    gameWidth,
    gameHeight,
    gameCanvas,
    render,
    avoidCategory,
    dispenser,
    dispenserBlink,
    disX,
    disY,
    disW,
    disH,
    strip,
    stripReady;

// Set up the game.
function setupGame() {
  // Init setupGame vars.
  var ground;

  // Init the main MatterJS entities.
  Engine = Matter.Engine;
  Render = Matter.Render;
  World = Matter.World;
  Bodies = Matter.Bodies;
  Body = Matter.Body;
  Events = Matter.Events;

  // Set the tolerance to handle thick strokes.
  dd = 3;

  // Get the wrapper dimentions from the DOM.
  gameWidth = $("#game-canvas-wrapper").width();
  gameHeight = $("#game-canvas-wrapper").height();
  gameCanvas = document.getElementById("game-canvas");

  // Set the canvas dimensions to match its wrapper.
  gameCanvas.width = gameWidth;
  gameCanvas.height = gameHeight;

  // Instantiate an Engine.
  engine = Engine.create();
  engine.world.gravity.scale = 0.001;

  // Instantiate a Render.
  render = Render.create({
    element: document.querySelector("#game-canvas-wrapper"),
    canvas: document.querySelector("#game-canvas"),
    engine: engine,
    options: {
      width: gameWidth,
      height: gameHeight,
      background: "#9696FF",
      wireframes: false
    }
  });

  // Set the category for non-colliding objects.
  avoidCategory = 0x0002;

  // Create the ground.
  ground = Bodies.rectangle(
    gameWidth / 2,
    gameHeight + 12,
    gameWidth,
    20,
    { label: "ground",
      isStatic: true,
      render: { fillStyle: "black" } }
  );

  // Create the dispenser.
  disX = 50;
  disY = 75 - dd;
  disW = 70;
  disH = 150;
  dispenser = Bodies.rectangle(
    disX,
    disY,
    disW,
    disH,
    { label: "dispenser",
      isStatic: true,
      render: { fillStyle: "#C8C8FF",
                strokeStyle: "black",
                lineWidth: 6 },
      collisionFilter: { mask: avoidCategory } }
  );
  dispenserWhite = false;

  // Create the strip.
  strip = Bodies.rectangle(
    2 * gameWidth / 3,
    gameHeight,
    2 * gameWidth / 3,
    24,
    { label: "strip",
      isStatic: true,
      render: { fillStyle: "purple" },
      collisionFilter: { mask: avoidCategory } }
  );

  // The strip is not yet ready.
  makeStripErasable();

  // Add all of the bodies to the World.
  World.add(engine.world, [ground, dispenser, strip]);

  // Run the Render.
  Render.run(render);
}

// Reset the game.
function resetGame() {
  // Init resetGame vars.
  var zorb;

  // Create the zorb.
  zorb = Bodies.circle(
    50,
    -35,
    30,
    {
      label: "zorb",
      render: {
        fillStyle: 'red',
        strokeStyle: 'black',
        lineWidth: 6
      },
      friction: 0.01,
      frictionAir: 0.001
    }
  );

  // Set zorb initial velocity.
  Body.setVelocity(
    zorb,
    { x: 0, y: 38 }
  );

  World.add(engine.world, zorb);
}

// And...go!
function launchZorb() {
  // Run the Engine.
  Engine.run(engine);
}

// Add a ramp to the World.
function addRamp(placeLeft, coord) {
  var gameDim = -110;
  var faceLeft = coord[0],
      color = coord[1],
      w = coord[2] * gameDim,
      h = coord[3] * gameDim;
  var rampLabel = "right-ramp";
  if (placeLeft) {
    rampLabel = "left-ramp";
  }

  if (faceLeft) {
    w *= -1;
  }

  var rampVertices = [
    { x: 0,  y : 0 },
    { x: w, y : 0 },
    { x: 0,  y : h }
  ]

  var ramp = Bodies.fromVertices(
    0,
    0,
    rampVertices,
    {
      label: rampLabel,
      isStatic: true,
      render: {
        fillStyle: color,
        strokeStyle: 'black',
        lineWidth: 6
      }
    }
  );

  var posX;
  if (placeLeft) {
    posX = -ramp.bounds.min.x - dd;
  } else {
    posX = gameWidth / 3 - ramp.bounds.max.x;
  }

  Body.setPosition(
    ramp,
    {
      x: posX,
      y: gameHeight - ramp.bounds.max.y + dd
    }
  );

  World.add(engine.world, ramp);
}

// Make the dispenser blink.
function initDispenserBlinking() {
  dispenserBlink = setInterval(function() {
    if (dispenser.render.fillStyle == "white") {
      dispenser.render.fillStyle = "#C8C8FF";
    } else {
      dispenser.render.fillStyle = "white";
    }
  }, 200);
}

// Make the dispenser stop blinking.
function stopDispenserBlinking() {
  clearInterval(dispenserBlink);
  dispenser.render.fillStyle = "#C8C8FF";
}

// Make dispenser clickable.
function makeDispenserClickable() {
  $("#game-canvas").click(function(e) {
    mouseX = e.pageX - $("#game-canvas").offset().left;
    mouseY = e.pageY - $("#game-canvas").offset().top;

    if (isWithin(mouseX, mouseY,
                 disX - disW / 2, disX + disW / 2,
                 disY - disH / 2, disY + disH / 2)) {
      if (getState(1) == 2) {
        stopDispenserBlinking();
        launchZorb();
      }
      incrementState();
    }
  })
}

// Set the color strip to be erased by the zorb.
function makeStripErasable() {
  stripReady = false;
  Events.on(engine, 'collisionStart', function(e) {
    var collidedBodies = [e.pairs[0].bodyA.label, e.pairs[0].bodyB.label];
    if (collidedBodies.sort().join(" ") == "right-ramp zorb") {
      stripReady = true;
    }
    if (stripReady && collidedBodies.sort().join(" ") == "ground zorb") {
      var zorbBody = e.pairs[0].bodyA;
      if (zorbBody.label != "zorb") {
        zorbBody = e.pairs[0].bodyB;
      }

      // Do some math and partially erase the strip.
      var oldY = (strip.bounds.min.y + strip.bounds.max.y) / 2;
      var oldWidth = strip.bounds.max.x - strip.bounds.min.x;
      var newMinX = strip.bounds.min.x;
      var newMaxX = zorbBody.position.x;
      var newWidth = newMaxX - newMinX;
      var newX = (newMinX + newMaxX) / 2;
      if (newWidth > 0) {
        Body.scale(strip, newWidth / oldWidth, 1)
        Body.setPosition(strip, { x: newX, y: oldY });
      }

      // Only do this once.
      stripReady = false;

      // Pick a number! Any number!
      initRulerBlinking();
    }
  });
}

setupGame();
resetGame();
makeDispenserClickable();
