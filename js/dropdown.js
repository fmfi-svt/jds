/*
 *  <div class="dropdown">
 *    <button class="dropdown__trigger" aria-expanded="false" aria-controls="some-id">
 *    <div class="dropdown__menu" id="some-id">…</div>
 *  </div>
 */

document.addEventListener("DOMContentLoaded", function () {
  function closeAll() {
    document.querySelectorAll(".dropdown__menu--open").forEach(function (menu) {
      menu.classList.remove("dropdown__menu--open");
    });
    document
      .querySelectorAll('.dropdown__trigger[aria-expanded="true"]')
      .forEach(function (trigger) {
        trigger.setAttribute("aria-expanded", "false");
      });
  }

  document.querySelectorAll(".dropdown__trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      var menuId = trigger.getAttribute("aria-controls");
      var menu = document.getElementById(menuId);
      if (!menu) return;

      var isOpen = menu.classList.contains("dropdown__menu--open");

      // Close other dropdowns first
      closeAll();

      if (!isOpen) {
        menu.classList.add("dropdown__menu--open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Close on outside click
  document.addEventListener("click", closeAll);

  // Close on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeAll();
  });
});
