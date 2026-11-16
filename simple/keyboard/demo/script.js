const walker = document.querySelector('#walker');
const keyName = document.querySelector('#key-name');

// How far one key press moves, in pixels. CHANGE THIS.
const step = 25;

// Where the walker is. It starts at the left and top given in the CSS.
let x = walker.offsetLeft;
let y = walker.offsetTop;

// "keydown" happens when any key is pressed.
window.addEventListener('keydown', function (event) {

  // event.key is the name of the key: 'ArrowLeft', 'a', 'Enter', ' ' (space) ...
  // Showing it on the page is a quick way to find out what a key is called.
  keyName.textContent = event.key;

  // Change x or y depending on the key.
  // CHANGE THIS: for example 'a', 'd', 'w' and 's' instead of the arrows.
  if (event.key === 'ArrowLeft') {
    x = x - step;
  } else if (event.key === 'ArrowRight') {
    x = x + step;
  } else if (event.key === 'ArrowUp') {
    y = y - step;
  } else if (event.key === 'ArrowDown') {
    y = y + step;
  } else {
    // Any other key: stop here and do nothing else.
    return;
  }

  // Arrow keys normally scroll the page. This switches that off.
  event.preventDefault();

  // Keep the walker on the screen: not less than 0, and not past the far edge.
  x = Math.max(0, Math.min(x, window.innerWidth - walker.offsetWidth));
  y = Math.max(0, Math.min(y, window.innerHeight - walker.offsetHeight));

  // Move the walker to its new place.
  walker.style.left = x + 'px';
  walker.style.top = y + 'px';
});
