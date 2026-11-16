const follower = document.querySelector('#follower');

// "pointermove" happens every time the mouse or a finger moves.
// The event carries the details of what happened, including where the pointer is.
window.addEventListener('pointermove', function (event) {

  // clientX is the distance from the left edge of the screen, in pixels.
  // clientY is the distance from the top edge.
  const x = event.clientX;
  const y = event.clientY;

  // Move the follower there. The text between the backticks ` ` is a template:
  // ${x} is replaced by the number in x, giving for example "translate(120px, 300px)".
  follower.style.transform = `translate(${x}px, ${y}px)`;

  // Show the follower. It starts invisible in the CSS, so it does not
  // sit in the corner of the screen before the pointer has moved.
  follower.style.opacity = 1;
});
