// Return true if the click coordinates are within the given box.
function isWithin(mouseX, mouseY, x1, x2, y1, y2) {
  if (mouseX >= x1 &&
    mouseX <= x2 &&
    mouseY >= y1 &&
    mouseY <= y2) {
    return true;
  } else {
    return false;
  }
}
