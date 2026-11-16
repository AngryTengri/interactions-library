/*
  Builds the two kinds of page in the library:
  - the gallery (index.html at the top of the site)
  - a playground page for one interaction (simple/button/, experiments/torchlight/ ...)

  The interactions themselves live in each demo/ folder and never load this file.
*/
(function () {
  'use strict';

  const DEMOS = window.DEMOS || [];
  const TABS = [
    { id: 'simple', label: 'Simple', about: 'One idea each: a click, a hover, a scroll. Start here.' },
    { id: 'experiments', label: 'Experiments', about: 'Bigger pieces. Each one answers a "What if?" question and breaks a convention on purpose.' }
  ];
  const FILES = [
    { key: 'html', name: 'index.html', label: 'HTML', job: 'structure', mode: 'htmlmixed' },
    { key: 'css', name: 'style.css', label: 'CSS', job: 'appearance', mode: 'css' },
    { key: 'js', name: 'script.js', label: 'JavaScript', job: 'behaviour', mode: 'javascript' }
  ];

  const root = document.body.dataset.root || '';
  const app = document.getElementById('app');
  const inTab = (id) => DEMOS.filter((demo) => demo.tab === id);

  /* Small helper to build an element: h('a', { href: '#' }, 'text', childNode) */
  function h(tag, props, ...children) {
    const node = document.createElement(tag);
    Object.entries(props || {}).forEach(([key, value]) => {
      if (value === false || value == null) return;
      if (key === 'class') node.className = value;
      else if (key.startsWith('on')) node.addEventListener(key.slice(2), value);
      else node.setAttribute(key, value === true ? '' : value);
    });
    node.append(...children.flat().filter((child) => child != null));
    return node;
  }

  function header(currentTab) {
    return h('header', { class: 'site-header' },
      h('a', { class: 'wordmark', href: root || './' }, 'Interactions library'),
      currentTab && h('nav', { 'aria-label': 'Sections' },
        TABS.map((tab) => h('a', {
          href: `${root}#${tab.id}`,
          'aria-current': tab.id === currentTab ? 'true' : false
        }, tab.label))
      )
    );
  }

  /* ---------- Gallery ---------- */

  function renderGallery() {
    const tabFromHash = () => {
      const id = location.hash.slice(1);
      return TABS.some((tab) => tab.id === id) ? id : TABS[0].id;
    };

    const about = h('p', { class: 'tab-about' });
    const panel = h('div', { class: 'cards', role: 'tabpanel', id: 'panel' });

    const buttons = TABS.map((tab) => h('button', {
      class: 'tab',
      role: 'tab',
      id: `tab-${tab.id}`,
      'aria-controls': 'panel',
      onclick: () => {
        history.replaceState(null, '', `#${tab.id}`);
        show(tab.id);
      },
      onkeydown: (event) => {
        // Left and right arrows move between tabs, as people expect from tabs.
        const step = { ArrowLeft: -1, ArrowRight: 1 }[event.key];
        if (!step) return;
        const other = buttons[(buttons.indexOf(event.currentTarget) + step + buttons.length) % buttons.length];
        other.focus();
        other.click();
      }
    }, tab.label, h('span', { class: 'count' }, String(inTab(tab.id).length))));

    function show(id) {
      const tab = TABS.find((item) => item.id === id);
      buttons.forEach((button) => {
        const selected = button.id === `tab-${id}`;
        button.setAttribute('aria-selected', selected);
        button.tabIndex = selected ? 0 : -1;
      });
      panel.setAttribute('aria-labelledby', `tab-${id}`);
      about.textContent = tab.about;
      panel.replaceChildren(...inTab(id).map(card));
    }

    const card = (demo) => h('a', { class: 'card', href: `${demo.tab}/${demo.slug}/` },
      h('h2', {}, demo.title),
      demo.question && h('p', { class: 'question' }, demo.question),
      h('p', { class: 'summary' }, demo.summary),
      h('ul', { class: 'terms', 'aria-label': 'Uses' }, demo.terms.map((term) => h('li', {}, term)))
    );

    app.append(
      header(),
      h('main', { class: 'gallery' },
        h('h1', {}, 'Interactions library'),
        h('p', { class: 'intro' },
          'Small pieces of web behaviour to take apart. Open one, change the code and watch the result change. ' +
          'Then copy it into your own site and replace everything in it with your own images, sound and words.'),
        h('div', { class: 'tabs', role: 'tablist', 'aria-label': 'Sections' }, buttons),
        about,
        panel
      )
    );

    window.addEventListener('hashchange', () => show(tabFromHash()));
    show(tabFromHash());
  }

  /* ---------- Playground ---------- */

  function renderPlayground(demo) {
    const demoUrl = new URL('demo/', location.href).href;
    const editors = {};
    let originals = null;
    let frame = null;
    let timer = null;

    document.title = `${demo.title} | Interactions library`;

    const error = h('p', { class: 'result-error', role: 'status', hidden: true });
    const frameHolder = h('div', { class: 'frame-holder' });
    const editorRow = h('div', { class: 'editors' });

    const siblings = inTab(demo.tab);
    const position = siblings.indexOf(demo);
    const previous = siblings[position - 1];
    const next = siblings[position + 1];

    app.append(
      header(demo.tab),
      h('main', { class: 'play' },
        h('div', { class: 'play-head' },
          h('div', {},
            h('h1', {}, demo.title),
            h('p', { class: 'summary' }, demo.question && h('em', {}, demo.question + ' '), demo.summary)
          ),
          h('div', { class: 'actions' },
            h('button', { class: 'button', onclick: reset }, 'Reset code'),
            h('button', { class: 'button', onclick: openFullPage }, 'Open full page')
          )
        ),
        h('div', { class: 'workspace' },
          h('section', { class: 'sheet result', 'aria-label': 'Result' },
            h('div', { class: 'bar' },
              h('span', { class: 'bar-title' }, 'Result'),
              h('span', { class: 'bar-note' }, 'updates as you type'),
              h('button', { class: 'bar-button', onclick: run }, 'Restart')
            ),
            frameHolder,
            error
          ),
          editorRow
        ),
        notes(demo),
        h('nav', { class: 'pager', 'aria-label': 'More interactions' },
          previous ? h('a', { href: `../${previous.slug}/` }, h('span', {}, 'Previous'), previous.title) : h('span', {}),
          next ? h('a', { class: 'next', href: `../${next.slug}/` }, h('span', {}, 'Next'), next.title) : h('span', {})
        )
      )
    );

    /* The three code panes. Uses CodeMirror, or a plain text box if it failed to load. */
    function makeEditor(file, text) {
      const mount = h('div', { class: 'editor' });
      const copy = h('button', { class: 'bar-button', onclick: () => copyText(editor.get(), copy) }, 'Copy');
      editorRow.append(
        h('section', { class: `sheet pane pane-${file.key}`, 'aria-label': `${file.label} code` },
          h('div', { class: 'bar' },
            h('span', { class: 'bar-title' }, file.label),
            h('span', { class: 'bar-note' }, `${file.name}, the ${file.job}`),
            copy
          ),
          mount
        )
      );

      let editor;
      if (window.CodeMirror) {
        const cm = window.CodeMirror(mount, {
          value: text,
          mode: file.mode,
          theme: 'library',
          lineNumbers: true,
          lineWrapping: true,
          screenReaderLabel: `${file.label} code`,
          tabSize: 2,
          indentUnit: 2,
          // Tab moves focus out of the editor instead of trapping keyboard users inside it.
          extraKeys: { Tab: false, 'Shift-Tab': false }
        });
        // Wrapped lines hang under the line they belong to, two characters further in.
        const charWidth = cm.defaultCharWidth();
        cm.on('renderLine', (instance, line, element) => {
          const indent = (window.CodeMirror.countColumn(line.text, null, 2) + 2) * charWidth;
          element.style.textIndent = `-${indent}px`;
          element.style.paddingLeft = `${4 + indent}px`;
        });
        cm.refresh();
        cm.on('change', schedule);
        editor = { get: () => cm.getValue(), set: (value) => cm.setValue(value) };
      } else {
        const box = h('textarea', { spellcheck: 'false', 'aria-label': file.name, oninput: schedule });
        box.value = text;
        mount.append(box);
        editor = { get: () => box.value, set: (value) => { box.value = value; } };
      }
      return editor;
    }

    function schedule() {
      clearTimeout(timer);
      timer = setTimeout(run, 500);
    }

    /* Join the three panes into one page. */
    function buildPage() {
      const css = editors.css.get();
      const js = editors.js.get().replace(/<\/script/gi, '<\\/script');
      const extras = `<base href="${demoUrl}"><script>(${insideResult})();<\/script>`;

      const page = editors.html.get()
        .replace(/<link\b[^>]*href=["'](\.\/)?style\.css["'][^>]*>/i, () => `<style>\n${css}\n</style>`)
        .replace(/<script\b[^>]*src=["'](\.\/)?script\.js["'][^>]*>\s*<\/script>/i, () => `<script>\n${js}\n<\/script>`);

      // The extras go first inside <head>. The \s keeps <header> from matching.
      const headTag = /<head(\s[^>]*)?>/i;
      return headTag.test(page) ? page.replace(headTag, (head) => head + extras) : extras + page;
    }

    /* Show the page in a new frame each time, so old sounds and timers stop. */
    function run() {
      clearTimeout(timer);
      error.hidden = true;
      frame = h('iframe', { title: `${demo.title}: result`, allow: 'autoplay' });
      frame.srcdoc = buildPage();
      frameHolder.replaceChildren(frame);
    }

    /* The same page, edits included, in a tab of its own. */
    function openFullPage() {
      window.open(URL.createObjectURL(new Blob([buildPage()], { type: 'text/html' })), '_blank');
    }

    function reset() {
      if (!originals) return;
      FILES.forEach((file) => editors[file.key].set(originals[file.key]));
      run();
    }

    window.addEventListener('message', (event) => {
      if (!frame || event.source !== frame.contentWindow) return;
      if (!event.data || event.data.from !== 'library-result') return;
      error.textContent = event.data.message;
      error.hidden = false;
    });

    Promise.all(FILES.map((file) =>
      fetch(`demo/${file.name}`).then((response) => {
        if (!response.ok) throw new Error(file.name);
        return response.text();
      })
    )).then((texts) => {
      originals = {};
      FILES.forEach((file, index) => {
        originals[file.key] = texts[index];
        editors[file.key] = makeEditor(file, texts[index]);
      });
      run();
    }).catch(() => {
      frameHolder.replaceChildren(h('p', { class: 'load-error' },
        'The code for this interaction could not be loaded. If you opened this page by double-clicking the file, ' +
        'open it with Live Preview in VS Code or from the live site instead.'));
    });
  }

  function notes(demo) {
    const promptCopy = h('button', { class: 'bar-button', onclick: () => copyText(demo.prompt, promptCopy) }, 'Copy');
    return h('section', { class: 'notes' },
      h('div', { class: 'sheet note' },
        h('h2', {}, 'Try changing'),
        h('ul', {}, demo.change.map((item) => h('li', {}, item))),
        h('p', { class: 'small' }, 'Values that are meant to be changed are marked CHANGE THIS in the code.'),
        demo.note && h('p', { class: 'small' }, demo.note)
      ),
      demo.breaks && h('div', { class: 'sheet note' },
        h('h2', {}, 'The convention it breaks'),
        h('p', {}, demo.breaks)
      ),
      h('div', { class: 'sheet note' },
        h('h2', {}, 'A prompt to adapt it'),
        h('p', { class: 'small' }, 'Copy the code into your own site first. Then give Copilot one change at a time, and log what you kept.'),
        h('blockquote', {}, demo.prompt),
        promptCopy
      )
    );
  }

  function copyText(text, button) {
    const label = button.dataset.label || (button.dataset.label = button.textContent);
    const done = () => {
      button.textContent = 'Copied';
      setTimeout(() => { button.textContent = label; }, 1500);
    };
    const fallback = () => {
      const box = h('textarea', { class: 'offscreen' });
      box.value = text;
      document.body.append(box);
      box.select();
      document.execCommand('copy');
      box.remove();
      done();
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback);
    else fallback();
  }

  /*
    This function does not run on this page. Its text is copied into every result,
    where it reports mistakes back to the playground. It also keeps #links inside
    the result: because of the <base> tag they would otherwise load the original demo.
  */
  function insideResult() {
    function tell(message) {
      parent.postMessage({ from: 'library-result', message: message }, '*');
    }
    addEventListener('error', function (event) {
      var target = event.target;
      if (target && target !== window && (target.src || target.href)) {
        tell('Could not load the file ' + (target.getAttribute('src') || target.getAttribute('href')) +
          '. Check the file name, the folder and the capital letters.');
      } else if (event.message) {
        tell('The JavaScript stopped: ' + event.message);
      }
    }, true);
    addEventListener('unhandledrejection', function (event) {
      tell('The browser refused: ' + (event.reason && event.reason.message ? event.reason.message : event.reason));
    });
    addEventListener('click', function (event) {
      var link = event.target.closest ? event.target.closest('a[href^="#"]') : null;
      if (!link || event.defaultPrevented) return;
      event.preventDefault();
      var target = document.getElementById(link.getAttribute('href').slice(1));
      if (target) target.scrollIntoView();
    });
  }

  /* ---------- Start ---------- */

  const slug = document.body.dataset.demo;
  const demo = DEMOS.find((item) => item.slug === slug);
  if (demo) renderPlayground(demo);
  else if (slug) app.append(header(), h('main', { class: 'gallery' }, h('p', { class: 'intro' }, `There is no entry for "${slug}" in site/demos.js.`)));
  else renderGallery();
})();
