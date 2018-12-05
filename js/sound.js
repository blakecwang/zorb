var soundNames = [
  "add_ramp",
  "pew",
  "after_measure0",
  "after_measure1",
  "hello",
  "measure0",
  "measure1",
  "measure2",
  "reflect"
]
var soundElems = [];
var clonedElems = [];
var lastPlayed = "hello";

// Set up sounds.
$(document).ready(function() {
  for (var i = 0; i < soundNames.length; i++) {
    soundElems[i] = document.createElement("audio");
    soundElems[i].src = `sound/${soundNames[i]}.mp3`;
    soundElems[i].volume = 0.1;
    soundElems[i].autoPlay = false;
    soundElems[i].preLoad = true;
    soundElems[i].controls = true;
  }
});

// Play a sound with the given name.
function playSound(name, delay) {
  var i = 0;
  while (name != soundNames[i] && i < soundNames.length) {
    i++;
  }
  setTimeout(function() {
    // Don't replay add_ramp or pew.
    if (i > 1) {
      lastPlayed = name;
      clonedElems.forEach(function(elem) {
        if (elem.readyState != 0 ) {
          elem.pause();
        }
      });
    }
    clonedElems.push(soundElems[i].cloneNode());
    clonedElems[clonedElems.length - 1].play();
  }, 1000 * delay);
}

// Add the replay button.
$("#replay-btn").click(function() {
  playSound(lastPlayed, 0);
});
