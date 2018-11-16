// Add a shape to the notepad.
function addShapeToNotepad(shape, row, side) {
  if (shape == 'green' || shape == 'blue') {
    var klass = 'wide';
  } else if (shape == 'pink' || shape == 'yellow') {
    var klass = 'tall';
  } else {
    var klass = 'iso';
  }
  var selector = `#${row}-${side}`;
  var img = `<img src="img/${shape}.png" class="${klass}" />`;
  $(selector).prepend(img)
}

// Add the given number to the given notepad row.
function addNumToNotepad(num, row) {
  var selector = `#${row}-N`;
  $(selector).text(num);
}
