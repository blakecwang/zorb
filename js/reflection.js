var mediaRecorder,
    chunks,
    blob,
    videoURL;

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

  // Restructure the DOM for reflections.
  $("#upper").remove();
  $("#middle").remove();
  $("#corral").remove();
  var videoWrapper = $("<div id='video-wrapper' class='col-xs-9' />");
  videoWrapper.prependTo($("#lower"));
  var videoElem = $("<video autoplay muted id='vid-record' />");
  videoElem.appendTo($("#video-wrapper"));
  var recordElem = $("<div id='record' class='row'>RECORD</div>");
  recordElem.appendTo($("#notepad"));
  var stopElem = $("<div id='stop' class='row'>STOP</div>");
  stopElem.appendTo($("#notepad"));

  var playElem = $("<video id='vid-play' />");
  playElem.appendTo($("#notepad"));

  // Set up the video stream.
  const constraints = { video: true, audio: true };
  const video = document.querySelector("#vid-record");
  navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {
      video.srcObject = stream;
      mediaRecorder = new MediaRecorder(stream);
      console.log(mediaRecorder.state);

      chunks = [];
      mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
      }

      mediaRecorder.onstop = function(e) {
        console.log("onstop");
        blob = new Blob(chunks);
        videoURL = window.URL.createObjectURL(blob);
        var playVid = document.querySelector("#vid-play");
        playVid.src = videoURL;
        playVid.play();
      }
    })
    .catch(function(err) {
      console.log('The following getUserMedia error occured: ' + err);
    });

  $("#record").click(function() {
    mediaRecorder.start();
    console.log(mediaRecorder.state);
    console.log("recorder started");
  })

  $("#stop").click(function() {
    mediaRecorder.stop();
    console.log(mediaRecorder.state);
    console.log("recorder stopped");
  })
}

// Init reflection time.
function reflectionTime() {
  setTimeout(function() {
    addVideo();
  }, 1000);
}
reflectionTime();

//var record = document.querySelector('#record');
//var stop = document.querySelector('#stop');
//var soundClips = document.querySelector('#sound-clips');

