// Find every title on the page. querySelectorAll gives back a list.
const titles = document.querySelectorAll('.title');

// Do the same thing for each title in the list.
titles.forEach(function (title) {

  title.addEventListener('click', function () {

    // The text that belongs to a title is the element straight after it in the HTML.
    const text = title.nextElementSibling;

    // Flip hidden: if it was hidden, show it. If it was showing, hide it.
    // The ! means "the opposite of".
    text.hidden = !text.hidden;

    // Keep aria-expanded in step. The CSS also uses it to swap the plus for a minus.
    title.setAttribute('aria-expanded', !text.hidden);
  });
});

// Good to know: HTML has a built-in version of this that needs no JavaScript,
// the <details> and <summary> elements. This version gives you more control.
