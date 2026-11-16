const scene = document.querySelector('#scene');

// "pointermove" happens when the mouse moves, or when a finger drags.
scene.addEventListener('pointermove', function (event) {

  // event.clientX and event.clientY say where the pointer is in the window.
  // Subtracting the scene's own position gives the place inside the scene,
  // so the light stays under the pointer even if the scene does not fill the window.
  const box = scene.getBoundingClientRect();
  const x = event.clientX - box.left;
  const y = event.clientY - box.top;

  // Store them in the CSS variables --x and --y.
  // The gradient in the CSS uses them as the centre of the light.
  document.documentElement.style.setProperty('--x', x + 'px');
  document.documentElement.style.setProperty('--y', y + 'px');
});
