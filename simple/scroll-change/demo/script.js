// Work out how far down the page we are, and tell the CSS.
function update() {

  // The whole height of the page, minus the part that fits on screen,
  // is the distance it is possible to scroll.
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;

  // window.scrollY is how far we have scrolled so far.
  // Dividing gives a number from 0 (top) to 1 (bottom).
  let progress = 0;
  if (scrollable > 0) {
    progress = window.scrollY / scrollable;
  }
  progress = Math.max(0, Math.min(progress, 1));   // never below 0 or above 1

  // Store the number in the CSS variable --progress.
  // The CSS uses it for the background, the sun and the bar.
  document.documentElement.style.setProperty('--progress', progress);
}

// Run update when the page scrolls, and when the window changes size.
window.addEventListener('scroll', update);
window.addEventListener('resize', update);

// Run it once at the start as well.
update();
