// How far down the page the change happens, in pixels. CHANGE THIS.
const changeAt = 400;

// "scroll" happens every time the page moves up or down.
window.addEventListener('scroll', function () {

  // window.scrollY is how far down the page has been scrolled, in pixels.
  // Past the change point: add the class "night". Above it: remove it.
  // It works like the Button example, but the scroll flips the switch.
  if (window.scrollY > changeAt) {
    document.body.classList.add('night');
  } else {
    document.body.classList.remove('night');
  }
});
