(function () {
  if (window.__lgdmMenu) return;
  window.__lgdmMenu = 1;

  function box() {
    return document.getElementById("mobile-menu-toggle");
  }
  function toggleBtn() {
    return document.querySelector('button[aria-controls="mobile-menu"]');
  }
  function panel() {
    return document.getElementById("mobile-menu");
  }
  function setInert(on) {
    var nodes = [document.querySelector("header"), document.getElementById("contenu"), document.querySelector("footer")];
    for (var i = 0; i < nodes.length; i++) {
      if (!nodes[i]) continue;
      if (on) nodes[i].setAttribute("inert", "");
      else nodes[i].removeAttribute("inert");
    }
  }
  function sync(open) {
    var b = toggleBtn();
    if (b) {
      b.setAttribute("aria-expanded", open ? "true" : "false");
      var openLabel = b.getAttribute("data-label-open");
      var closeLabel = b.getAttribute("data-label-close");
      if (openLabel && closeLabel) b.setAttribute("aria-label", open ? closeLabel : openLabel);
    }
    setInert(open);
  }
  function setOpen(open, opts) {
    opts = opts || {};
    var input = box();
    if (!input) return;
    input.checked = !!open;
    sync(!!open);
    if (open && opts.focusDialog) {
      setTimeout(function () {
        if (!box() || !box().checked) return;
        var closeBtn = panel() && panel().querySelector("[data-close-menu]");
        if (closeBtn) closeBtn.focus({ preventScroll: true });
      }, 0);
    } else if (!open && opts.restoreFocus) {
      var b = toggleBtn();
      if (b) b.focus();
    }
  }

  // Click only. Opening on pointerup paints the close button under the same
  // tap, and the click that follows then dismisses the sheet — a tap appears
  // to do nothing.
  document.addEventListener(
    "click",
    function (e) {
      var t = e.target;
      if (!t || !t.closest) return;
      var toggle = t.closest('button[aria-controls="mobile-menu"]');
      if (toggle) {
        e.preventDefault();
        var input = box();
        if (!input) return;
        var open = !input.checked;
        setOpen(open, { focusDialog: open && e.detail === 0 });
        return;
      }
      if (t.closest("[data-close-menu]") || t.closest("#mobile-menu a")) setOpen(false);
    },
    true,
  );

  document.addEventListener("keydown", function (e) {
    var input = box();
    if (!input || !input.checked) return;
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false, { restoreFocus: true });
      return;
    }
    if (e.key !== "Tab") return;
    var menu = panel();
    if (!menu) return;
    var items = menu.querySelectorAll("a[href], button:not([disabled])");
    if (!items.length) return;
    var first = items[0];
    var lastItem = items[items.length - 1];
    var active = document.activeElement;
    if (e.shiftKey && (active === first || !menu.contains(active))) {
      e.preventDefault();
      lastItem.focus();
    } else if (!e.shiftKey && active === lastItem) {
      e.preventDefault();
      first.focus();
    }
  });

  window.addEventListener("resize", function () {
    if (window.matchMedia("(min-width: 64rem)").matches) setOpen(false);
  });
})();
