// Detect whether the user's browser supports video.
function hasGetUserMedia() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

// Replace the canvas with a video element.
function addVideo() {
  // Check browser compatability.
  if (hasGetUserMedia()) {
    console.log('Good to go!');
  } else {
    alert("Your browser does not support video!");
  }

  // Remove the canvas and add the video element.
  $("#upper").remove();
  $("#middle").remove();
  $("#corral").remove();
  var videoWrapper = $("<div id='video-wrapper' class='col-xs-9' />");
  videoWrapper.prependTo($("#lower"));
  var videoElem = $("<video autoplay />");
  videoElem.appendTo($("#video-wrapper"));

  var vidWidth = $("#video-wrapper").width();
  var vidHeight = $("#video-wrapper").height();
  console.log(vidWidth);
  console.log(vidHeight);

  // Set up the video stream.
  const constraints = { video: true, audio: true };
  const video = document.querySelector("video");
  navigator.mediaDevices.getUserMedia(constraints).
    then((stream) => { video.srcObject = stream });

}

// Init reflection time.
function reflectionTime() {
  setTimeout(function() {
    addVideo();
  }, 1000);
}
