// Find the two elements we want to work with, using their ids.
const button = document.querySelector('#light-switch');
const message = document.querySelector('#message');

// Listen for a click on the button.
// Everything between the { } runs each time it is clicked.
button.addEventListener('click', function () {

  // Add the class "night" to the body if it is not there. Remove it if it is.
  document.body.classList.toggle('night');

  // Ask: does the body have the class "night" now? Then change the words to match.
  if (document.body.classList.contains('night')) {
    message.textContent = 'It is night.';  // CHANGE THIS
    button.textContent = 'Turn on the light';  // CHANGE THIS
  } else {
    message.textContent = 'It is day.';  // CHANGE THIS
    button.textContent = 'Turn off the light';  // CHANGE THIS
  }
});
