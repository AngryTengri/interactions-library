// Find everything with the class "reveal". querySelectorAll gives back a list.
const items = document.querySelectorAll('.reveal');

// A function is a set of steps with a name, so it can be run again and again.
function reveal() {

  // Do the same thing for each item in the list.
  items.forEach(function (item) {

    // How far the top of this item is from the top of the screen, in pixels.
    const top = item.getBoundingClientRect().top;

    // window.innerHeight is the height of the screen.
    // If the top of the item has come higher than 80% of the way down the screen,
    // add the class "visible". The CSS then fades it in.
    // CHANGE THIS: the 0.8. Try 1 (as soon as it appears) or 0.5 (half way up).
    if (top < window.innerHeight * 0.8) {
      item.classList.add('visible');
    }
  });
}

// Run reveal every time the page scrolls.
window.addEventListener('scroll', reveal);

// And once now, for anything that is already on the screen when the page opens.
reveal();
