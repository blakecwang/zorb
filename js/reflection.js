// Detect whether the user's browser supports video.
function hasGetUserMedia() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

// Restructure the page for video reflection.
function addVideoWrapper() {
  $("#upper").remove();
  $("#middle").remove();
  $("#corral").remove();
  var videoWrapper = $("<div id='video-wrapper' class='col-xs-9' />");
  videoWrapper.prependTo($("#lower"));
}

// Replace the game with a camera logo.
function addCamera() {
  var cameraElem = $("<img id='camera' src='img/camera.png' />");
  cameraElem.appendTo($("#video-wrapper"));
  $("#camera").click(function(e) {
    addVideo();
  });
}

// Replace the canvas with a video element.
function addVideo() {
  // Check browser compatability.
  if (!hasGetUserMedia()) {
    alert("Your browser does not support video!");
  }

  // Remove the camera.
  $("#camera").remove();

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
    addVideoWrapper();
  }, 1000);
  setTimeout(function() {
    addCamera();
  }, 8500);
}

$("#main").addClass("hidden");
