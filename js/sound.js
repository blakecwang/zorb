var soundNames = ["pew", "raspberry", "belch"];
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
function playSound(name) {
  var i = 0;
  while (name != soundNames[i] && i < soundNames.length) {
    i++;
  }
  soundElems[i].cloneNode().play();
}
