var mediaRecorder,
    chunks,
    blob,
    videoURL;

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

  // Add stop button.
  var stopWrapper = $("<div id='stop-wrapper' class='row'></div>");
  stopWrapper.appendTo($("#notepad"));
  var stopElem = $("<div id='stop'>STOP</div>");
  stopElem.appendTo($("#stop-wrapper"));

  // Add the video element.
  var videoElem = $("<video autoplay muted id='vid-record' />");
  videoElem.appendTo($("#video-wrapper"));

  // Set up the video stream.
  const constraints = { video: true, audio: true };
  const video = document.querySelector("#vid-record");
  navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {
      video.srcObject = stream;
      mediaRecorder = new MediaRecorder(stream);

      chunks = [];
      mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
      }

      mediaRecorder.onstop = function(e) {
        // Stop the camera.
        var tracks = stream.getTracks();
        tracks.forEach(function(track) {
          track.stop();
        });

        blob = new Blob(chunks);
        videoURL = window.URL.createObjectURL(blob);

        $("#vid-record").remove();
        var playElem = $("<video controls id='vid-play' />");
        playElem.appendTo($("#video-wrapper"));

        var playVid = document.querySelector("#vid-play");
        playVid.src = videoURL;
        playVid.play();
      }

      // Start recording.
      mediaRecorder.start();
    })
    .catch(function(err) {
      console.log('The following getUserMedia error occured: ' + err);
    });


  $("#stop").click(function() {
    mediaRecorder.stop();
    $(this).remove();
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
