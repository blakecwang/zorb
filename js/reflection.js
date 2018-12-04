// Detect whether the user's browser supports video.
function hasGetUserMedia() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

// Replace the game with a camera logo.
function addCamera() {
  // Restructure the DOM for reflections.
  $("#upper").remove();
  $("#middle").remove();
  $("#corral").remove();
  var videoWrapper = $("<div id='video-wrapper' class='col-xs-9' />");
  videoWrapper.prependTo($("#lower"));

  // Add controls.
  var recordElem = $("<div id='record' class='row'>RECORD</div>");
  recordElem.appendTo($("#notepad"));
  var stopElem = $("<div id='stop' class='row'>STOP</div>");
  stopElem.appendTo($("#notepad"));

  // Make record button clickable.
  $("#record").click(function(e) {
    addVideo();
  });
}

// Replace the canvas with a video element.
function addVideo() {
  console.log("addVideo() was called");
  // Check browser compatability.
  if (!hasGetUserMedia()) {
    alert("Your browser does not support video!");
  }

  // Add the video element.
  var videoElem = $("<video autoplay muted id='vid-record' />");
  videoElem.appendTo($("#video-wrapper"));

  // Set up the video stream.
  const constraints = { video: true };
  const video = document.querySelector("#vid-record");
  navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {
      video.srcObject = stream;
    });
}

// Init reflection time.
function reflectionTime() {
  setTimeout(function() {
    addCamera();
  }, 1000);
}

$("#main").addClass("hidden");
