// The animations run by themselves in the CSS.
// The only job of the JavaScript is the pause button.
const button = document.querySelector('#pause');

button.addEventListener('click', function () {

  // Add the class "paused" to the body, or remove it if it is already there.
  // toggle() also answers true or false: is the class there now?
  const paused = document.body.classList.toggle('paused');

  // Make the button say what the next click will do.
  if (paused) {
    button.textContent = 'Play';
  } else {
    button.textContent = 'Pause';
  }
});
