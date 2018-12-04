// Detect whether the user's browser supports video.
function hasGetUserMedia() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

// Replace the canvas with a video element.
function addVideo() {
  // Check browser compatability.
  if (!hasGetUserMedia()) {
    alert("Your browser does not support video!");
  }

  // Remove stuff.
  $("#upper").remove();
  $("#middle").remove();
  $("#corral").remove();

  // Add the video element.
  var videoWrapper = $("<div id='video-wrapper' class='col-xs-9' />");
  videoWrapper.prependTo($("#lower"));
  var videoElem = $("<video autoplay muted id='vid-record' />");
  videoElem.appendTo($("#video-wrapper"));

  // Add the speaker element.
  var speakerWrapper = $("<div id='speaker-wrapper' class='col-xs-3' />");
  speakerWrapper.appendTo($("#lower"));
  var speakerElem = $("<img source='img/speaker.png' id='speaker-btn' />");
  speakerElem.appendTo($("#speaker-wrapper"));

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
    addVideo();
  }, 1000);
}
$("#main").addClass("hidden");
