// "Pointer" events work for a mouse, a finger and a pen.
// A drag has three moments: press on a piece (pick it up),
// move (carry it), let go (drop it).

// Find every piece. querySelectorAll gives back a list.
const pieces = document.querySelectorAll('.piece');

// The piece being carried. null means "none".
let held = null;

// ---- Pick up ----
// Do the same thing for each piece in the list:
// when it is pressed, remember it as the piece being carried.
pieces.forEach(function (piece) {
  piece.addEventListener('pointerdown', function () {
    held = piece;
  });
});

// ---- Carry ----
// When the pointer moves anywhere on the page ...
window.addEventListener('pointermove', function (event) {

  // ... and a piece is being carried, put the piece where the pointer is.
  // clientX and clientY are where the pointer is, in pixels
  // from the left and top edges of the window.
  if (held) {
    held.style.left = event.clientX + 'px';
    held.style.top = event.clientY + 'px';
  }
});

// ---- Drop ----
// When the pointer is let go, nothing is being carried any more.
window.addEventListener('pointerup', function () {
  held = null;
});
