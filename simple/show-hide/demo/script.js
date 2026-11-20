// Find the button and the hidden text, using their ids.
const button = document.querySelector('#toggle');
const memory = document.querySelector('#memory');

// Each time the button is clicked ...
button.addEventListener('click', function () {

  // ... remove the class "hidden" if it is there, so the text appears,
  // or add it back if it is not, so the text disappears.
  memory.classList.toggle('hidden');
});

// Good to know: HTML can also do this by itself, with no JavaScript,
// using the <details> and <summary> elements.
