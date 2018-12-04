function onSignIn(googleUser) {
  // Show the game.
  $("#main").removeClass("hidden");
  $("#signin").addClass("hidden");

  // Welcome the learner.
  playSound("hello");
reflectionTime();
};

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    $("#main").addClass("hidden");
    $("#signin").removeClass("hidden");
  });
}
