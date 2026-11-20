// Good to know: browsers only play sound after the visitor has clicked or
// tapped something. A page cannot start making noise by itself when it opens.

// Find the three buttons and the two sounds, using their ids.
const bellButton = document.querySelector('#bell-button');
const startButton = document.querySelector('#start-button');
const stopButton = document.querySelector('#stop-button');
const bell = document.querySelector('#bell');
const hum = document.querySelector('#hum');

// How loud the hum is: 0 is silent, 1 is full volume. CHANGE THIS.
// (iPhones ignore this and use the phone's own volume.)
hum.volume = 0.6;

// The bell plays once per click.
bellButton.addEventListener('click', function () {

  // Go back to the start of the sound first,
  // so a quick second click rings it again.
  bell.currentTime = 0;
  bell.play();
});

// The hum starts ...
startButton.addEventListener('click', function () {
  hum.play();
});

// ... and stops.
stopButton.addEventListener('click', function () {
  hum.pause();
});
