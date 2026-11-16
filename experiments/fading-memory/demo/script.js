// How fast the memory fades. 0 is fresh, 1 is completely gone. CHANGE THIS.
const fadePerVisit = 0.12;  // added for every earlier visit
const fadePerSecond = 0.01;  // added for every second the visitor sits still
const mostFaded = 0.9;  // never fade further than this, so a trace always remains

const text = document.querySelector('#text');
const visitNumber = document.querySelector('#visit-number');
const forgetButton = document.querySelector('#forget');

// ---- 1. Count the visits ----

// localStorage is a small notebook the browser keeps for this website.
// What is written there stays after the page is closed.
// Read the number of earlier visits. The first time there is nothing, so use 0.
let visits = Number(localStorage.getItem('fading-memory-visits')) || 0;

// This is one more visit. Write the new number back in the notebook.
visits = visits + 1;
localStorage.setItem('fading-memory-visits', visits);

// ---- 2. Wrap every word in its own <span>, so each can fade and return by itself ----

// Cut the text into words wherever there is a space or a line break.
const words = text.textContent.trim().split(/\s+/);

// Empty the paragraph, then put the words back one at a time, each in a span.
text.textContent = '';
words.forEach(function (word) {
  const span = document.createElement('span');
  span.className = 'word';
  span.textContent = word;
  text.append(span, ' ');
});

// ---- 3. Work out how faded the page is, and tell the CSS ----

let secondsStill = 0;

function showFade() {
  // Earlier visits fade it, and so does sitting still.
  let fade = (visits - 1) * fadePerVisit + secondsStill * fadePerSecond;

  // Stop at the limit.
  fade = Math.min(fade, mostFaded);

  // Store the number in the CSS variable --fade. The CSS does the rest.
  document.documentElement.style.setProperty('--fade', fade);
}

visitNumber.textContent = visits;
showFade();

// Once a second, count another second of stillness.
setInterval(function () {
  secondsStill = secondsStill + 1;
  showFade();
}, 1000);

// Anything the visitor does ends the stillness: moving the pointer,
// tapping, pressing a key or scrolling.
function wake() {
  if (secondsStill > 0) {
    secondsStill = 0;
    showFade();
  }
}
window.addEventListener('pointermove', wake);
window.addEventListener('pointerdown', wake);
window.addEventListener('keydown', wake);
window.addEventListener('scroll', wake);

// ---- 4. Start again (for testing) ----

forgetButton.addEventListener('click', function () {
  visits = 1;
  secondsStill = 0;
  localStorage.setItem('fading-memory-visits', visits);
  visitNumber.textContent = visits;
  showFade();
});
