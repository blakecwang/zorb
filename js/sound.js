var soundNames = [
  "add_ramp",
  "after_measure0",
  "after_measure1",
  "hello",
  "measure0",
  "measure1",
  "measure2",
  "pew",
  "reflect"
]
var soundElems = [];

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
    soundElems[i].cloneNode().play();
  }, 1000 * delay);
}
