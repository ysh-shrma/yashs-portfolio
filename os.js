/* os.js — shared behaviour: theme toggle, nav shadow, scroll reveal.
   The no-flash theme init runs inline in each page's <head>; this only
   handles the click-to-toggle and persistence. */

// Theme toggle (event-delegated so it works regardless of button position)
document.addEventListener('click', function (e) {
  var btn = e.target.closest && e.target.closest('.theme-toggle');
  if (!btn) return;
  var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (_) {}
});

// Nav shadow on scroll
var nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 8);
  });
}

// Reveal on scroll
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
