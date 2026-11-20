// The list of pictures, in the order they appear.
// CHANGE THIS: your own file names. Add or remove lines to change how many there are.
const pictures = [
  'assets/picture-1.svg',
  'assets/picture-2.svg',
  'assets/picture-3.svg'
];

// Find the picture on the page, using its id.
const picture = document.querySelector('#picture');

// Which picture is showing. A list starts counting at 0, so 0 is the first one.
let number = 0;

// Each time the picture is clicked ...
picture.addEventListener('click', function () {

  // ... move on by one.
  number = number + 1;

  // After the last picture, go back to the first.
  // === asks: are these two the same?
  if (number === pictures.length) {
    number = 0;
  }

  // Show the picture with that number from the list.
  picture.src = pictures[number];
});
