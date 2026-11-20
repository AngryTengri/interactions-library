// Find the walker, using its id.
const walker = document.querySelector('#walker');

// How far one key press moves it, in pixels. CHANGE THIS.
const step = 25;

// Where the walker is now. It starts where the CSS puts it (left and top).
let x = walker.offsetLeft;
let y = walker.offsetTop;

// "keydown" happens every time a key is pressed.
window.addEventListener('keydown', function (event) {

  // event.key is the name of the key that was pressed.
  // === asks: is it this key?
  // x = x - step means: x becomes what it was, minus one step.
  // CHANGE THIS: other keys, for example 'a', 'd', 'w' and 's'.
  // Letters are written in small letters, and the space bar is ' '.
  if (event.key === 'ArrowLeft') {
    x = x - step;
  }
  if (event.key === 'ArrowRight') {
    x = x + step;
  }
  if (event.key === 'ArrowUp') {
    y = y - step;
  }
  if (event.key === 'ArrowDown') {
    y = y + step;
  }

  // Move the walker to its new place.
  walker.style.left = x + 'px';
  walker.style.top = y + 'px';
});
