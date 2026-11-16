// How many frames the animation has. CHANGE THIS.
const frameCount = 12;

// Builds the file name for a frame number: 1 gives 'assets/frame-01.png'.
// padStart(2, '0') adds a zero in front of single digits, so 7 becomes 07.
// CHANGE THIS to match how your own frames are named.
function fileName(number) {
  return 'assets/frame-' + String(number).padStart(2, '0') + '.png';
}

const stage = document.querySelector('#stage');
const frame = document.querySelector('#frame');

// Load every frame before it is needed, and keep them in a list.
// Without this, each frame would be fetched at the moment it should show,
// and the animation would stutter the first time through.
const frames = [];
for (let number = 1; number <= frameCount; number = number + 1) {
  const image = new Image();
  image.src = fileName(number);
  frames.push(image);
}

// When the pointer moves across the stage, choose a frame by its position.
stage.addEventListener('pointermove', function (event) {

  // Where the stage is on the screen, and how wide it is.
  const box = stage.getBoundingClientRect();

  // How far across the stage the pointer is: 0 at the left edge, 1 at the right.
  const progress = (event.clientX - box.left) / box.width;

  // Turn that into a position in the list. Lists count from 0,
  // so with 12 frames the positions are 0 to 11.
  let position = Math.floor(progress * frameCount);

  // Stay inside the list, even if the pointer is exactly on the edge.
  position = Math.max(0, Math.min(position, frameCount - 1));

  // Show that frame.
  frame.src = frames[position].src;
});
