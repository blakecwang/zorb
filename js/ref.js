// square
ctx.beginPath();
ctx.rect(50, 50, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

// circle
ctx.beginPath();
ctx.arc(240, 160, 100, 0, Math.PI*2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

// stroked rectangle
ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();

// get a random color
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
