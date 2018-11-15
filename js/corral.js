// Set global vars.
var corralWidth,
    corralHeight,
    corralCanvas,
    ctx,
    corralDim,
    startX,
    startY,
    boxes,
    shapeAttributes,
    shapesWhite,
    shapeColor,
    shapeBlink,
    rulerBlink;

// Set up the corral canvas.
function setupCorralCanvas() {
  // Set up the canvas.
  corralWidth = $("#corral-canvas-wrapper").width();
  corralHeight = $("#corral-canvas-wrapper").height();
  corralCanvas = document.getElementById("corral-canvas");
  corralCanvas.width = corralWidth;
  corralCanvas.height = corralHeight;

  // Set up the canvas context.
  ctx = corralCanvas.getContext("2d");
  ctx.lineWidth = 12;
  ctx.strokeStyle = "black";

  // Set the size of corral shapes.
  corralDim = 80;

  // Create a place to store click box coordinates.
  boxes = [];

  // Set the shape attributes.
  shapeAttributes = [
    [true,  "red",    1,   1],
    [true,  "blue",   1,   0.5],
    [true,  "yellow", 0.5, 1,],
    [false, "pink",   0.5, 1],
    [false, "green",  1,   0.5],
    [false, "orange", 1,   1,]
  ]

  // Start with the normal shape colors.
  shapesWhite = false;
}

// Set starting coordinates for drawing triangles
function setTriangleStart() {
  startX = 50;
  startY = (corralHeight + corralDim) / 2;
}

// Draw triangle.
function drawTriangle(left, color, w, h) {
  w *= corralDim;
  h *= corralDim;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX + w, startY);
  if (left) {
    ctx.lineTo(startX, startY - h);
  } else {
    ctx.lineTo(startX + w, startY - h);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.fill();
  if (boxes.length < shapeAttributes.length) {
    boxes.push([startX, startX + w, h])
  }
  startX += w + 90;
}

// Draw all the triangles in the corral.
function drawTriangles() {
  shapeAttributes.forEach(function(shapeAttribute) {
    if (shapesWhite) {
      shapeColor = "white";
    } else {
      shapeColor = shapeAttribute[1];
    }
    drawTriangle(
      shapeAttribute[0],
      shapeColor,
      shapeAttribute[2],
      shapeAttribute[3]
    );
  });
}

// Add non-blinking shapes to the corral.
function addNonBlinkingShapes() {
  // Start it out clean.
  ctx.clearRect(0, 0, corralWidth, corralHeight);
  clearInterval(shapeBlink);
  shapesWhite = false;

  // Draw the triangles.
  setTriangleStart();
  drawTriangles();
}

// Add blinking shapes to the corral.
function addBlinkingShapes() {
  // Start with non-blinking shapes.
  addNonBlinkingShapes();

  // Engage blink machine.
  shapeBlink = setInterval(function() {
    setTriangleStart();
    if (shapesWhite) {
      shapesWhite = false;
    } else {
      shapesWhite = true;
    }
    drawTriangles();
  }, 200);
}

// Make shapes clickable.
function makeShapesClickable() {
  $("#corral-canvas").click(function(e) {
    mouseX = e.pageX - $("#corral-canvas").offset().left;
    mouseY = e.pageY - $("#corral-canvas").offset().top;

    var i;
    var increment = false;
    for (i = 0; i < boxes.length; i++) {
      if (isWithin(mouseX, mouseY,
                   boxes[i][0], boxes[i][1],
                   startY - boxes[i][2], startY)) {
        if (getState(1) == 0) {
          addRamp(true, shapeAttributes[i]);
          increment = true;
        } else if (getState(1) == 1) {
          addRamp(false, shapeAttributes[i]);
          addNonBlinkingShapes();
          initDispenserBlinking();
          increment = true;
        }
      }
    }
    if (increment) {
      incrementState();
    }
  })
}

// Start ruler blinking.
function initRulerBlinking() {
  rulerBlink = setInterval(function() {
    $(".tick").toggleClass("white");
  }, 200);
}

// Stop the ruler from blinking.
function stopRulerBlinking() {
  clearInterval(rulerBlink);
  $(".tick").removeClass("white");
}

setupCorralCanvas();
addBlinkingShapes();
makeShapesClickable();
