# Interactions library

Small web interactions to take apart. Each one has its own page with the live result on top and its HTML, CSS and JavaScript underneath. The code can be edited on the page and the result updates as you type.

Made for the Kingston pathway "Interpreting Place: Interactive Experience (Digital)".

## What is in it

**Simple** (one idea each): button, hover, image swap, slider, show and hide, scroll reveal, scroll change, animation, sound, drag, cursor follow, keyboard.

**Experiments** (each answers a "What if?" question and breaks a convention on purpose): torchlight reveal, flipbook scrub, sideways walk, sound map, fading memory, runaway link.

Every image, frame and sound in the library is a plain placeholder. They are there to be replaced.

## Looking at it

The site is plain files with no build step, but it has to be opened through a web server, not by double-clicking `index.html`.

- In VS Code: right-click `index.html` and choose **Show Preview** (Live Preview extension).
- Or in a terminal, from this folder: `python3 -m http.server`, then open `http://localhost:8000`.

## Putting it online

1. Commit and push to GitHub.
2. On GitHub: **Settings**, **Pages**, **Deploy from a branch**, branch `main`, folder `/ (root)`, **Save**.
3. After a minute the site is live at `https://<username>.github.io/interactions-library/`.

## How it is organised

```
index.html                  the gallery
site/                       the library's own code (not part of any interaction)
  demos.js                  the list of interactions, with their notes and prompts
  site.js, site.css         the gallery and the playground
  vendor/                   the code editor (CodeMirror) and the font
simple/button/
  index.html                the playground page for this interaction
  demo/                     the interaction itself: a complete small website
    index.html
    style.css
    script.js
    assets/                 its images and sounds, if it has any
experiments/...             the same structure
```

A `demo` folder does not depend on anything else. Copy one out and it works as a website by itself.

## Using an interaction in your own site

1. Open the interaction and press **Copy** on each of the three panes, or copy its `demo` folder.
2. Replace the placeholder files with your own, and change the file names in the code to match. File names are case-sensitive once the site is online: `Photo.JPG` and `photo.jpg` are different files.
3. Change the values marked `CHANGE THIS`.
4. Read every comment. If you cannot explain a line, ask Copilot to explain it before you change it.

## Adding an interaction to the library

1. Copy an existing folder inside `simple/` or `experiments/` and rename it.
2. Change the three files in its `demo/` folder. Keep the lines that link `style.css` and `script.js`.
3. In the copied `index.html` (the playground page), change `data-demo` and the `<title>` to the new name.
4. Add an entry to `site/demos.js`. Its `slug` must match the folder name.

## Credits

The code editor is [CodeMirror 5](https://codemirror.net/5/) (MIT licence). The typeface is [Bricolage Grotesque](https://github.com/ateliertriay/bricolage) (SIL Open Font Licence). Both licences are in `site/vendor/`.
