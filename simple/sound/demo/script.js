// Important: browsers only allow sound after the visitor has clicked or tapped
// something. A page cannot start making noise by itself when it opens.

const bellButton = document.querySelector('#bell-button');
const humButton = document.querySelector('#hum-button');
const bell = document.querySelector('#bell');
const hum = document.querySelector('#hum');

// How loud the hum is. 0 is silent, 1 is full volume. CHANGE THIS.
// (iPhones ignore this and use the phone's own volume.)
hum.volume = 0.6;

// ---- A short sound: plays once per click ----

bellButton.addEventListener('click', function () {

  // Go back to the start of the sound first.
  // Without this, a second click while it is still playing would do nothing.
  bell.currentTime = 0;

  bell.play();
});

// ---- A loop: one click starts it, the next click stops it ----

humButton.addEventListener('click', function () {

  // hum.paused is true when the sound is not playing.
  if (hum.paused) {
    hum.play();
    humButton.textContent = 'Stop the hum';
    humButton.classList.add('playing');
  } else {
    hum.pause();
    humButton.textContent = 'Start the hum';
    humButton.classList.remove('playing');
  }
});
