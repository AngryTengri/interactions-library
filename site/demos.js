/*
  The list of every interaction in the library.

  To add a new one:
  1. Copy an existing folder inside simple/ or experiments/ and rename it.
  2. Change the three files in its demo/ folder.
  3. In the copied index.html, change data-demo and the title to the new name.
  4. Add an entry to this list. "slug" must match the folder name.
*/
window.DEMOS = [

  /* ---------- Simple ---------- */

  {
    slug: 'button',
    tab: 'simple',
    title: 'Button',
    summary: 'A click switches the page between day and night.',
    terms: ['click event', 'classList.toggle', 'textContent'],
    change: [
      'The day and night colours in the CSS.',
      'The words on the button and in the message.',
      'The length of the fade: the 1s in the transition line.'
    ],
    prompt: 'On my page, when the button is clicked, also change my picture from day.jpg to night.jpg, and back again on the next click. Explain each line you add.'
  },
  {
    slug: 'hover',
    tab: 'simple',
    title: 'Hover',
    summary: 'Five words that each react when the pointer is over them. It needs no JavaScript.',
    terms: [':hover', 'transition', 'transform'],
    change: [
      'The time in a transition: try 1s or 3s.',
      'The numbers inside scale() and rotate().',
      'Give one of your own pictures a class from the CSS, for example class="grow".'
    ],
    prompt: 'Give my picture the "sharpen" hover effect from this example, and make the change take 2 seconds. Explain the transition line.'
  },
  {
    slug: 'image-swap',
    tab: 'simple',
    title: 'Image swap',
    summary: 'Each click on the picture shows the next one in a list.',
    terms: ['click event', 'list', 'src'],
    change: [
      'The file names in the list, to your own pictures.',
      'How many pictures: add or remove lines in the list.',
      'The first picture in the HTML, so it matches the first one in the list.'
    ],
    prompt: 'Make the picture fade out, change, then fade back in each time it is clicked, instead of changing instantly. Keep my list of file names.'
  },
  {
    slug: 'slider',
    tab: 'simple',
    title: 'Slider',
    summary: 'A slider blurs a picture.',
    terms: ['input event', 'slider.value', 'style.filter'],
    change: [
      'min and max on the slider in the HTML.',
      'What the slider controls: the JavaScript has two other lines to try, for brightness and for rotation.',
      'The picture, to one of your own.'
    ],
    prompt: 'Add a second slider under the first one that makes my picture see-through, using opacity. Explain how the slider number reaches the picture.'
  },
  {
    slug: 'show-hide',
    tab: 'simple',
    title: 'Show and hide',
    summary: 'A button shows a hidden text. A second click hides it again.',
    terms: ['click event', 'classList.toggle', 'display: none'],
    change: [
      'The words on the button and the hidden text.',
      'What is hidden: a picture instead of text, with the same id and class.',
      'What starts hidden: take class="hidden" off, and the text starts visible.'
    ],
    prompt: 'Add two more buttons to my page, each showing and hiding its own memory. Explain what has to be different for each one.'
  },
  {
    slug: 'scroll-reveal',
    tab: 'simple',
    title: 'Scroll reveal',
    summary: 'Lines of text fade in as they scroll into view.',
    terms: ['scroll event', 'getBoundingClientRect', 'opacity'],
    change: [
      'The fade time: the 1s in the CSS.',
      'The 0.8 in the JavaScript: how far up the screen a line comes before it appears.',
      'What fades in: give one of your pictures class="reveal".'
    ],
    prompt: 'Make each line also slide up a little as it fades in. Only change the CSS, and explain what you add.'
  },
  {
    slug: 'scroll-change',
    tab: 'simple',
    title: 'Scroll change',
    summary: 'Scrolling past a point turns day into night, and the sun sets.',
    terms: ['scroll event', 'scrollY', 'classList'],
    change: [
      'The point where it changes: changeAt at the top of the JavaScript, in pixels.',
      'The day and night colours in the CSS.',
      'Where the sun ends up: the 80vh in the CSS.'
    ],
    prompt: 'Add a dusk between day and night: the page turns orange after 200 pixels of scrolling and dark after 600. Explain how the two points work together.'
  },
  {
    slug: 'animation',
    tab: 'simple',
    title: 'Animation',
    summary: 'Two shapes that move by themselves, forever. It needs no JavaScript.',
    terms: ['@keyframes', 'animation', 'prefers-reduced-motion'],
    change: [
      'The duration of each animation: the 4s and the 1.5s.',
      'The values inside the keyframes.',
      'The easing: swap ease-in-out for linear and see how the feeling changes.'
    ],
    prompt: 'Add a third shape that swings left and right like a pendulum, using a new @keyframes block. Explain each step of the keyframes.'
  },
  {
    slug: 'sound',
    tab: 'simple',
    title: 'Sound',
    summary: 'One button rings a bell. Two more start and stop a loop.',
    terms: ['audio element', 'play()', 'pause()'],
    change: [
      'The two sound files, to your own recordings.',
      'The volume number: 0 is silent, 1 is full.',
      'The loop: take the word loop out of the audio line in the HTML, and the hum plays once and stops.'
    ],
    prompt: 'Play a different one of my three recordings each time the button is clicked, picked at random. Explain how the random choice works.'
  },
  {
    slug: 'drag',
    tab: 'simple',
    title: 'Drag',
    summary: 'Pick up the pieces and move them around the page. It works with a mouse or a finger.',
    terms: ['pointer events', 'position: absolute', 'clientX and clientY'],
    change: [
      'The pieces, to your own cut-out pictures.',
      'Where each piece starts: left and top in the HTML.',
      'The size of the pieces: width in the CSS.'
    ],
    prompt: 'Make the piece I pick up come to the front, in front of the other pieces. Explain what z-index does.'
  },
  {
    slug: 'cursor-follow',
    tab: 'simple',
    title: 'Cursor follow',
    summary: 'A circle follows the pointer, a little behind it.',
    terms: ['pointermove', 'clientX and clientY', 'transition'],
    change: [
      'The delay: the 0.2s in the transition line.',
      'The size and colour of the follower.',
      'The follower itself: the HTML says how to use one of your own pictures.'
    ],
    prompt: 'Hide the normal cursor on my page, so that my follower picture becomes the cursor. Explain the line you add.'
  },
  {
    slug: 'keyboard',
    tab: 'simple',
    title: 'Keyboard',
    summary: 'The arrow keys move a square around the page.',
    terms: ['keydown event', 'event.key', 'style.left'],
    change: [
      'The step: how far one key press moves.',
      'The keys: for example a, d, w and s instead of the arrows.',
      'The square, to one of your own drawings: the HTML says how.'
    ],
    prompt: 'Stop the square at the edges of the window, so it cannot leave the screen. Explain how you check for the edge.'
  },

  /* ---------- Experiments ---------- */

  {
    slug: 'torchlight',
    tab: 'experiments',
    title: 'Torchlight reveal',
    question: 'What if the cursor was the only way in?',
    summary: 'The page is dark. The pointer is a circle of light that shows the picture underneath.',
    terms: ['pointermove', 'CSS variable', 'radial-gradient'],
    breaks: 'Discoverability. A normal page shows you everything at once. This one makes the visitor search, so looking becomes an action.',
    change: [
      'The picture, to a photograph or drawing of your place.',
      'The size of the light and the softness of its edge: two numbers at the top of the CSS.',
      'The darkness: make it less than total so shapes are just visible.'
    ],
    prompt: 'Make the light slowly shrink the longer the visitor stays on the page, like a battery running out. Keep the size as a CSS variable and explain the timer.'
  },
  {
    slug: 'flipbook',
    tab: 'experiments',
    title: 'Flipbook scrub',
    question: 'What if the visitor controlled time?',
    summary: 'Moving across the picture plays a sequence of drawn frames forwards and backwards.',
    terms: ['pointermove', 'image sequence', 'preloading'],
    breaks: 'User control and freedom, turned up. Video normally plays at its own speed. Here nothing happens unless the visitor moves, and they can run time backwards.',
    change: [
      'The frames, to your own animation exported as numbered PNG files.',
      'The frame count at the top of the JavaScript.',
      'The direction: scrub up and down instead. In the JavaScript change clientX, box.left and box.width to clientY, box.top and box.height. In the CSS change pan-y to pan-x.'
    ],
    prompt: 'Change this so the frames are driven by scrolling the page instead of moving the pointer. Keep my frame count and file names, and explain how scroll becomes a frame number.'
  },
  {
    slug: 'sideways-walk',
    tab: 'experiments',
    title: 'Sideways walk',
    question: 'What if scrolling went sideways?',
    summary: 'Scrolling down walks you sideways along a street made of four layers. Near layers move faster than far ones.',
    terms: ['position: sticky', 'scroll progress', 'parallax'],
    breaks: 'Mapping. Scrolling down normally moves the page up. Here the same gesture moves you along a street, so the scroll bar becomes a pair of legs.',
    change: [
      'The four layers, to your own drawings saved as wide PNG files. All except the sky need a transparent background.',
      'The length of the walk: the height of #track in the CSS.',
      'The number of layers: add or remove img lines in the HTML.'
    ],
    prompt: 'Add a short caption that fades in when the walk is half way along and fades out again at three quarters. Use the progress value that already exists.'
  },
  {
    slug: 'sound-map',
    tab: 'experiments',
    title: 'Sound map',
    question: 'What if you had to listen your way around?',
    summary: 'A map with hidden sound spots. Each recording gets louder as the pointer gets closer, and they overlap.',
    terms: ['Web Audio', 'distance', 'pointermove'],
    breaks: 'Signifiers. A normal page marks what can be used: buttons look like buttons. Nothing on this map shows where to go. The only signifier is sound, so the visitor explores by ear.',
    change: [
      'The map, to your own drawing or photograph.',
      'The sounds, to your own field recordings, and where each one sits: left and top in the HTML.',
      'The reach at the top of the JavaScript: how far away a sound can be heard, as a share of the map.'
    ],
    prompt: 'Add a fourth sound spot that can only be heard after the visitor has found the other three. Explain how you keep track of which spots have been found.'
  },
  {
    slug: 'fading-memory',
    tab: 'experiments',
    title: 'Fading memory',
    question: 'What if the site decayed like a memory?',
    summary: 'The page counts your visits and fades a little more each time, and while you sit still. Touching a word brings it back for a moment.',
    terms: ['localStorage', 'setInterval', 'filter'],
    breaks: 'Consistency and standards. A web page is expected to be the same every time. This one is worn down by being looked at.',
    change: [
      'The text and the picture, to your own.',
      'The three numbers at the top of the JavaScript: how fast it fades.',
      'The kind of decay in the CSS: try letter-spacing or a colour shift instead of blur.'
    ],
    prompt: 'After the tenth visit, replace the text with a single sentence that I will write. Explain where the visit number is stored and how you read it.',
    note: 'In this playground every reload of the result counts as a visit, including the reload after you edit the code. Use "Start again" inside the result to go back to visit 1.'
  },
  {
    slug: 'runaway-link',
    tab: 'experiments',
    title: 'Runaway link',
    question: 'What if the buttons kept running away from you?',
    summary: 'The link dodges the pointer. Each dodge is slower than the last, until it is too tired to move and can be caught.',
    terms: ['pointermove', 'distance', 'Math.random'],
    breaks: 'Fitts\'s law. A good target is big, close and still. This one moves when you approach, so reaching the next page takes effort. Pressing Tab still reaches it, so keyboard users are not locked out.',
    change: [
      'The number of dodges before it gets tired.',
      'The danger distance: how close the pointer can get.',
      'What happens when it is caught: put a real page in the href, and delete the two lines named at the end of the JavaScript.'
    ],
    prompt: 'Instead of jumping to a random place, make the link move directly away from the pointer, and stop at the edges of the room. Explain how you work out the direction.'
  }
];
