const slider = document.querySelector('#slider');
const picture = document.querySelector('#picture');
const amount = document.querySelector('#amount');

// Read the slider and pass its number to the CSS.
function update() {

  // slider.value is the number the handle is on, for example 12.
  // Adding 'px' makes it a size the CSS understands: 12px.
  // CHANGE THIS: if you swap the filter in the CSS, swap the unit here and
  // the max in the HTML to suit it: 'deg' and 360 for hue-rotate,
  // '%' and 200 for brightness, '%' and 100 for grayscale.
  picture.style.setProperty('--blur', slider.value + 'px');

  // Show the number next to the label.
  amount.textContent = slider.value;
}

// "input" happens continuously while the handle is being dragged.
slider.addEventListener('input', update);

// Run it once at the start, so the picture matches the slider straight away.
update();
