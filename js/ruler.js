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
      incrementState();
    }
  })
}

makeRulerClickable();
