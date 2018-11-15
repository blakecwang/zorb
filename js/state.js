// Move the states forward.
function incrementState() {
  var state = $("#state").text().split("-");
  var s0 = parseInt(state[0]),
      s1 = parseInt(state[1]);

  s1++;
  if (s1 > 3) {
    s0++;
    s1 = 0;
  }
  if (s0 > 2) {
    console.log("Reflection time!");
  }

  $("#state").text(`${s0}-${s1}`);
}

function getState(level) {
  return parseInt($("#state").text().split("-")[level]);
}
