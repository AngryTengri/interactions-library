// Find the follower, using its id.
const follower = document.querySelector('#follower');

// "pointermove" happens every time the mouse or a finger moves.
// "event" holds the details of what happened, including where the pointer is.
window.addEventListener('pointermove', function (event) {

  // clientX is the distance from the left edge of the window, in pixels.
  // clientY is the distance from the top edge.
  // Adding 'px' turns the number into a size the CSS understands, for example 120px.
  follower.style.left = event.clientX + 'px';
  follower.style.top = event.clientY + 'px';
});
