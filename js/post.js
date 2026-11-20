/* Blog post extras, run on every post:
   1. Side notes: each Markdown footnote ([^1]) is copied next to the line that
      cites it. CSS shows these on wide screens and the usual footnote list at
      the bottom on narrow ones.
   2. Contents: a list of the post's ## headings in the left column, with the
      section you're reading marked. */
(function () {
  var post = document.querySelector('.post');
  var body = post && post.querySelector('.post-body');
  if (!body) return;

  /* ---------- 1. Side notes ---------- */
  var refs = body.querySelectorAll('a.footnote[href^="#fn"]');
  var made = 0;

  refs.forEach(function (ref) {
    var item = document.getElementById(decodeURIComponent(ref.getAttribute('href').slice(1)));
    if (!item) return;

    var note = document.createElement('span');
    note.className = 'sidenote';
    note.setAttribute('role', 'note');

    var num = document.createElement('sup');
    num.className = 'sidenote-num';
    num.textContent = ref.textContent;
    note.appendChild(num);

    Array.prototype.forEach.call(item.children, function (child) {
      var copy = child.cloneNode(true);
      copy.querySelectorAll('.reversefootnote').forEach(function (a) { a.remove(); });
      var para = document.createElement('span');
      para.className = 'sidenote-para';
      if (copy.tagName === 'P') {
        para.innerHTML = copy.innerHTML.trim();
      } else {
        para.appendChild(copy);
      }
      note.appendChild(para);
    });

    var anchor = ref.closest('sup') || ref;
    anchor.insertAdjacentElement('afterend', note);
    made++;

    // On wide screens the note is already beside the text: highlight it
    // instead of jumping to the hidden list at the bottom.
    ref.addEventListener('click', function (e) {
      if (getComputedStyle(note).display === 'none') return;
      e.preventDefault();
      note.classList.remove('is-flash');
      void note.offsetWidth;
      note.classList.add('is-flash');
    });
  });

  if (made) post.classList.add('has-sidenotes');

  /* ---------- 2. Contents ---------- */
  var toc = document.querySelector('.toc');
  if (!toc || toc.getAttribute('data-enabled') === 'false') return;

  var headings = body.querySelectorAll('h2[id]');
  if (headings.length < 2) return;

  var list = document.createElement('ul');
  var entries = [];

  function addEntry(text, target, href) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = href;
    a.textContent = text;
    li.appendChild(a);
    list.appendChild(li);
    entries.push({ link: a, target: target });
  }

  // Text before the first heading gets an "Introduction" entry.
  if (body.firstElementChild !== headings[0]) addEntry('Introduction', post, '#post');
  headings.forEach(function (h) { addEntry(h.textContent, h, '#' + h.id); });

  toc.appendChild(list);
  toc.parentElement.classList.add('has-toc');

  var ticking = false;
  function markCurrent() {
    ticking = false;
    var current = entries[0];
    entries.forEach(function (e) {
      if (e.target.getBoundingClientRect().top <= 120) current = e;
    });
    // At the very bottom of the page, the last section counts as current.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = entries[entries.length - 1];
    }
    entries.forEach(function (e) { e.link.classList.toggle('is-active', e === current); });
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(markCurrent); }
  }, { passive: true });
  window.addEventListener('resize', markCurrent);
  markCurrent();
})();
