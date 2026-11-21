/* Blog post extras, run on every post:
   1. Side notes: each Markdown footnote ([^1]) is copied next to the line that
      cites it. CSS shows these on wide screens and the usual footnote list at
      the bottom on narrow ones.
   2. Image zoom: click (or tap) an image to see it as large as the screen
      allows. Click it again to see it at full size and scroll around; click
      outside it, press Esc or the × button to close.
   3. Contents: a list of the post's ## headings in the left column, with the
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

  /* ---------- 2. Image zoom ---------- */
  // Images that are already links keep opening their link instead.
  var images = Array.prototype.filter.call(body.querySelectorAll('img'), function (img) {
    return !img.closest('a');
  });

  if (images.length && window.HTMLDialogElement) {
    var box = document.createElement('dialog');
    box.className = 'lightbox';
    box.setAttribute('aria-label', 'Enlarged image');
    box.innerHTML =
      '<button class="lightbox-close" type="button" aria-label="Close">×</button>' +
      '<figure><img alt=""><figcaption></figcaption></figure>';
    document.body.appendChild(box);

    var big = box.querySelector('img');
    var caption = box.querySelector('figcaption');

    // Full size is only worth offering when it is bigger than what fits.
    function checkZoom() {
      if (box.classList.contains('is-full')) return;
      box.classList.toggle('can-zoom',
        big.naturalWidth > big.clientWidth + 1 || big.naturalHeight > big.clientHeight + 1);
    }

    function open(img) {
      box.classList.remove('is-full', 'can-zoom');
      big.src = img.currentSrc || img.src;
      big.alt = img.alt;
      // The italic line right under an image is its caption.
      var next = img.nextElementSibling;
      caption.textContent = next && next.tagName === 'EM' ? next.textContent : '';
      document.documentElement.classList.add('lightbox-open');
      box.showModal();
      box.scrollTo(0, 0);
      if (big.complete) checkZoom();
    }

    big.addEventListener('load', checkZoom);
    window.addEventListener('resize', checkZoom);

    box.addEventListener('close', function () {
      document.documentElement.classList.remove('lightbox-open');
    });
    box.querySelector('.lightbox-close').addEventListener('click', function () { box.close(); });

    box.addEventListener('click', function (e) {
      // Clicks on the scroll bars of a full-size image don't close it.
      if (e.clientX >= box.clientWidth || e.clientY >= box.clientHeight) return;
      if (e.target === caption) return;
      if (e.target !== big || !box.classList.contains('can-zoom')) { box.close(); return; }

      // Switch between "fit the screen" and full size, keeping the clicked
      // spot of the image under the pointer.
      var before = big.getBoundingClientRect();
      var fx = (e.clientX - before.left) / before.width;
      var fy = (e.clientY - before.top) / before.height;
      box.classList.toggle('is-full');
      var after = big.getBoundingClientRect();
      box.scrollLeft += after.left + fx * after.width - e.clientX;
      box.scrollTop += after.top + fy * after.height - e.clientY;
    });

    images.forEach(function (img) {
      img.classList.add('zoomable');
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', 'Enlarge image' + (img.alt ? ': ' + img.alt : ''));
      img.addEventListener('click', function () { open(img); });
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(img); }
      });
    });
  }

  /* ---------- 3. Contents ---------- */
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
