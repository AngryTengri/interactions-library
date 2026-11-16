// Find everything that should be revealed.
const items = document.querySelectorAll('.reveal');

// An IntersectionObserver watches elements and tells us when they
// come onto the screen and when they leave it.
const observer = new IntersectionObserver(function (entries) {

  // "entries" is the list of elements whose situation just changed.
  entries.forEach(function (entry) {

    if (entry.isIntersecting) {
      // It is on screen: add the class, and the CSS fades it in.
      entry.target.classList.add('visible');
    } else {
      // It has left the screen: remove the class, so it can fade in again later.
      // DELETE this line to make each thing appear once and then stay.
      entry.target.classList.remove('visible');
    }
  });

}, {
  // How much of the element must be on screen before it counts.
  // 0.5 is half of it. CHANGE THIS: a number from 0 to 1.
  threshold: 0.5
});

// Tell the observer to watch each item.
items.forEach(function (item) {
  observer.observe(item);
});
