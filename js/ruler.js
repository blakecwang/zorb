// Set global vars.
var rulerBlink;

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

// Make ruler clickable.
function makeRulerClickable() {
  $(".tick").click(function(e) {
    if (getState(1) == 4) {
      addNumToNotepad($(this).text(), getState(0) + 1);
      stopRulerBlinking();
      addBlinkingShapes();
      resetGame();
      var round = getState(0);
      if (round < 2) {
        playSound("after_measure" + round, 1);
      } else {
        playSound("reflect", 1);
      }
      incrementState();
    }
  })
}

makeRulerClickable();
