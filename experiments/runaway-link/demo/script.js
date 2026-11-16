// CHANGE THIS: the numbers that set how hard the door is to catch.
const dangerDistance = 130;  // how close the pointer can get, in pixels, before the door runs
const dodgesBeforeTired = 6;  // how many times it runs before it gives up
const firstRunTime = 0.25;  // how long the first run takes, in seconds
const slowerEachRun = 0.1;  // how many seconds each later run adds

const room = document.querySelector('#room');
const door = document.querySelector('#door');
const caught = document.querySelector('#caught');

let dodges = 0;  // how many times it has run so far
let running = false;  // true while it is in the middle of a run

// ---- Run to a new place ----

function dodge() {

  // Each run is slower than the one before: 0.25s, 0.35s, 0.45s ...
  // The CSS uses --run-time as the length of the slide.
  const seconds = firstRunTime + dodges * slowerEachRun;
  door.style.setProperty('--run-time', seconds + 's');

  dodges = dodges + 1;

  // Pick a random place that keeps the whole door inside the room.
  // Math.random() gives a number between 0 and 1.
  const farthestLeft = room.clientWidth - door.offsetWidth;
  const farthestTop = room.clientHeight - door.offsetHeight;
  door.style.left = Math.random() * farthestLeft + 'px';
  door.style.top = Math.random() * farthestTop + 'px';

  // Ignore the pointer until this run has finished.
  // setTimeout waits, then runs the function. It counts in milliseconds.
  running = true;
  setTimeout(function () {
    running = false;
  }, seconds * 1000);

  // On its last run, mark it as tired. The CSS changes its colour.
  if (dodges === dodgesBeforeTired) {
    door.classList.add('tired');
  }
}

// ---- Watch the pointer ----

room.addEventListener('pointermove', function (event) {

  // Do nothing if it is tired, or already running.
  if (dodges >= dodgesBeforeTired || running) {
    return;
  }

  // Measure from the pointer to the centre of the door.
  const box = door.getBoundingClientRect();
  const doorX = box.left + box.width / 2;
  const doorY = box.top + box.height / 2;
  const distance = Math.hypot(event.clientX - doorX, event.clientY - doorY);

  if (distance < dangerDistance) {
    dodge();
  }
});

// ---- A click or tap on the door ----

door.addEventListener('click', function (event) {

  // event.detail is 0 when the "click" came from the keyboard (Tab, then Enter).
  // Keyboard users cannot chase, so for them the door opens straight away.
  const usedKeyboard = event.detail === 0;

  // On a phone there is no pointer to run from, so a tap counts as a near miss.
  if (dodges < dodgesBeforeTired && !usedKeyboard) {
    event.preventDefault();  // do not follow the link
    dodge();
    return;
  }

  // Caught. In this demo we stay on the page and show a message.
  // To go to a real page instead: put that page in the href in the HTML,
  // and delete the two lines below.
  event.preventDefault();
  caught.hidden = false;
});
