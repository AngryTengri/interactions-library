// Find the slider and the picture, using their ids.
const slider = document.querySelector('#slider');
const picture = document.querySelector('#picture');

// "input" happens again and again while the handle is being moved.
slider.addEventListener('input', function () {

  // slider.value is the number the handle is on, for example 12.
  // This line builds the words "blur(12px)" and gives them to the picture.
  picture.style.filter = 'blur(' + slider.value + 'px)';

  // CHANGE THIS: the slider can control other things. Swap the line above
  // for one of these, and change min and max on the slider in the HTML:
  //
  //   picture.style.filter = 'brightness(' + slider.value + '%)';    min 0, max 200
  //   picture.style.transform = 'rotate(' + slider.value + 'deg)';   min 0, max 360
});
