// "Pointer" events cover a mouse, a finger and a pen with the same code.
// A drag has three moments: pointer down (pick up), pointer move (carry), pointer up (drop).

const pieces = document.querySelectorAll('.piece');

// Counts upwards so the piece picked up last always sits on top of the others.
let topLayer = 1;

pieces.forEach(function (piece) {

  // Where on the piece it was grabbed. Without this, the piece would jump
  // so that its corner is under the pointer.
  let grabX = 0;
  let grabY = 0;

  // ---- Pick up ----
  piece.addEventListener('pointerdown', function (event) {

    // Only the main mouse button picks a piece up. (A finger also counts as button 0.)
    if (event.button !== 0) {
      return;
    }

    // Keep sending this pointer's events to this piece, even if the
    // pointer moves faster than the piece and slips off it.
    piece.setPointerCapture(event.pointerId);

    // The distance between the pointer and the piece's top left corner.
    grabX = event.clientX - piece.offsetLeft;
    grabY = event.clientY - piece.offsetTop;

    // Bring it to the front, and mark it as held for the CSS.
    topLayer = topLayer + 1;
    piece.style.zIndex = topLayer;
    piece.classList.add('held');
  });

  // ---- Carry ----
  piece.addEventListener('pointermove', function (event) {

    // Only move while this piece is being held.
    if (!piece.classList.contains('held')) {
      return;
    }

    // Put the piece where the pointer is, minus the grab distance.
    piece.style.left = (event.clientX - grabX) + 'px';
    piece.style.top = (event.clientY - grabY) + 'px';
  });

  // ---- Drop ----
  function drop() {
    piece.classList.remove('held');
  }
  piece.addEventListener('pointerup', drop);
  piece.addEventListener('pointercancel', drop);  // for example, a phone call interrupts the touch
});
