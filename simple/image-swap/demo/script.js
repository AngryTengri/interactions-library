// The list of pictures, in the order they appear.
// CHANGE THIS: use your own file names. Add or remove lines to change how many there are.
const pictures = [
  'assets/picture-1.svg',
  'assets/picture-2.svg',
  'assets/picture-3.svg'
];

const button = document.querySelector('#next');
const picture = document.querySelector('#picture');
const count = document.querySelector('#count');

// Which picture is showing. Lists start counting at 0, so 0 is the first one.
let current = 0;

// Put the current picture on the page, and update the counter.
function show() {
  picture.src = pictures[current];
  count.textContent = (current + 1) + ' of ' + pictures.length;
}

button.addEventListener('click', function () {

  // Move on by one.
  current = current + 1;

  // After the last picture, go back to the first.
  if (current === pictures.length) {
    current = 0;
  }

  show();
});

// Run it once at the start, so the counter is right before the first click.
show();
