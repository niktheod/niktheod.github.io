/* Runs on every page: links to other websites open in a new tab.
   Links within this site (menu, posts, footnote numbers) and email links
   keep opening in the same tab. */
document.querySelectorAll('a[href^="http"]').forEach(function (a) {
  if (a.hostname !== location.hostname) {
    a.target = '_blank';
    a.rel = 'noopener';
  }
});
