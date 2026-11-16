// How far away a sound can be heard, compared to the width of the map.
// 0.25 is a quarter of the map. CHANGE THIS.
const reach = 0.25;

const map = document.querySelector('#map');
const startButton = document.querySelector('#start');
const spots = document.querySelectorAll('.spot');

// Filled in when the visitor clicks start.
let audioContext = null;  // the browser's sound engine
const sounds = [];  // one entry per spot: the spot and its volume control

// Good to know: this only makes sound when the page comes from a web server
// (Live Preview in VS Code, or the live site). Opened by double-clicking the
// file, the browser keeps it silent.

// ---- Start: runs once, on the first click ----

startButton.addEventListener('click', function () {

  audioContext = new AudioContext();

  spots.forEach(function (spot) {

    // Load the recording named in the spot's data-sound, and make it loop.
    const recording = new Audio(spot.dataset.sound);
    recording.loop = true;

    // Wire it up: recording -> volume control -> speakers.
    // The volume control is called a "gain". It starts at 0, which is silent.
    const source = audioContext.createMediaElementSource(recording);
    const volume = audioContext.createGain();
    volume.gain.value = 0;
    source.connect(volume);
    volume.connect(audioContext.destination);

    // Every recording plays all the time. Only its volume changes.
    recording.play();

    sounds.push({ spot: spot, volume: volume });
  });

  // Uncover the map.
  startButton.hidden = true;
});

// ---- Listen: runs every time the pointer moves over the map ----

map.addEventListener('pointermove', function (event) {

  // The reach in pixels, for the size the map has right now.
  const reachInPixels = map.clientWidth * reach;

  sounds.forEach(function (sound) {

    // Where the centre of this spot is on the screen.
    const box = sound.spot.getBoundingClientRect();
    const spotX = box.left + box.width / 2;
    const spotY = box.top + box.height / 2;

    // The distance between the pointer and the spot, in pixels.
    const distance = Math.hypot(event.clientX - spotX, event.clientY - spotY);

    // Turn distance into loudness: 1 on the spot, 0 at the edge of its reach or beyond.
    const loudness = Math.max(0, 1 - distance / reachInPixels);

    // Glide to the new volume over a fraction of a second, so it does not crackle.
    sound.volume.gain.setTargetAtTime(loudness, audioContext.currentTime, 0.1);

    // Let the spot glow as it gets louder.
    sound.spot.style.opacity = loudness;
  });
});
