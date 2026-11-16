const track = document.querySelector('#track');
const layers = document.querySelectorAll('.layer');

// Some people ask their computer for less movement. true if this visitor has.
const lessMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function update() {

  // How far it is possible to scroll: the height of the track, minus one screen.
  const scrollable = track.offsetHeight - window.innerHeight;

  // How far along the walk we are: 0 at the start, 1 at the end.
  let progress = 0;
  if (scrollable > 0) {
    progress = window.scrollY / scrollable;
  }
  progress = Math.max(0, Math.min(progress, 1));   // never below 0 or above 1

  // Move each layer sideways.
  layers.forEach(function (layer) {

    // The part of this layer that does not fit on the screen.
    let hidden = layer.offsetWidth - window.innerWidth;

    // For less motion, every layer moves like the first one:
    // one flat picture sliding slowly, with no layers passing each other.
    if (lessMotion) {
      hidden = layers[0].offsetWidth - window.innerWidth;
    }

    // At progress 0 the layer shows its left end. At progress 1 it has moved
    // left by the whole hidden part, so it shows its right end.
    // A wide layer has more hidden, so it travels further in the same scroll:
    // that is what makes near things pass faster than far things.
    // The text between the backticks ` ` is a template: ${...} is replaced
    // by the number, giving for example "translateX(-250px)".
    layer.style.transform = `translateX(${-progress * hidden}px)`;
  });
}

// Update when the page scrolls, and when the window changes size.
window.addEventListener('scroll', update);
window.addEventListener('resize', update);

// Update once all the pictures have loaded, because their widths are not known before.
window.addEventListener('load', update);
