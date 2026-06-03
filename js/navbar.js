/*
 *  <button class="navbar__toggle" aria-expanded="false" aria-controls="some-id">
 *  <div class="navbar__nav" id="some-id">…</div>
 */

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.navbar__toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var navId = btn.getAttribute('aria-controls');
      var nav   = document.getElementById(navId);
      if (!nav) return;

      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('navbar__nav--open');
    });
  });
});
