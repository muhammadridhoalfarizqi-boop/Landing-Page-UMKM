(function () {
  "use strict";

  function waUrl(message) {
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  }

  function applyWaLinks() {
    document.querySelectorAll("[data-wa-message]").forEach(function (el) {
      el.href = waUrl(el.dataset.waMessage);
      el.target = "_blank";
      el.rel = "noopener";
    });
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function setStars(container, rating) {
    container.textContent = "";
    var full = Math.round(rating);
    for (var i = 1; i <= 5; i++) {
      var s = document.createElement("span");
      s.className = i <= full ? "star-fill" : "star-empty";
      s.setAttribute("aria-hidden", "true");
      s.textContent = "★";
      container.appendChild(s);
    }
  }

  function formatPrice(num) {
    return "Rp " + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function renderProducts() {
    var grid = document.getElementById("product-grid");
    if (!grid) return;

    grid.textContent = "";
    products.forEach(function (p, i) {
      var card = el("article", "product-card bg-white shadow-md cursor-pointer");
      card.dataset.id = String(p.id);
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", p.nama + ", " + formatPrice(p.harga) + ", rating " + p.rating + " dari " + p.jumlahReview + " ulasan");
      var img = document.createElement("img");
      img.src = p.gambar;
      img.alt = p.nama;
      img.className = "w-full h-52 object-cover";
      if (i === 0) img.setAttribute("fetchpriority", "high");
      else img.setAttribute("loading", "lazy");
      card.appendChild(img);
      var body = el("div", "p-4");
      body.appendChild(el("h3", "font-bold text-stone-900 text-base leading-snug", p.nama));
      var rateRow = el("div", "flex items-center gap-1 mt-1");
      var stars = el("span", null);
      setStars(stars, p.rating);
      rateRow.appendChild(stars);
      rateRow.appendChild(el("span", "text-xs text-stone-500 ml-1", "(" + p.jumlahReview + ")"));
      body.appendChild(rateRow);
      body.appendChild(el("p", "mt-2 text-lg font-extrabold text-amber-800", formatPrice(p.harga)));
      var btn = el("button", "btn-detail mt-3", "Lihat Detail");
      btn.type = "button";
      body.appendChild(btn);
      card.appendChild(body);
      card.addEventListener("click", function () {
        openProductModal(p.id, card);
      });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openProductModal(p.id, card);
        }
      });
      grid.appendChild(card);
    });
  }

  function renderRatingSummary() {
    var total = 0, sum = 0, count = 0;
    products.forEach(function (p) {
      sum += p.rating;
      total += p.jumlahReview;
      count++;
    });
    var avg = sum / count;
    var host = document.getElementById("rating-summary");
    if (!host) return;

    host.textContent = "";
    var wrap = el("div", "flex flex-col sm:flex-row items-center gap-4 sm:gap-6");
    var left = el("div", "flex items-center gap-2");
    left.appendChild(el("span", "text-5xl font-extrabold text-amber-800", avg.toFixed(1)));
    var col = el("div", "flex flex-col");
    var starBox = el("div", "text-lg");
    setStars(starBox, Math.round(avg));
    col.appendChild(starBox);
    col.appendChild(el("span", "text-sm text-stone-500", "dari 5"));
    left.appendChild(col);
    wrap.appendChild(left);
    var right = el("div", "text-center sm:text-left");
    right.appendChild(el("p", "text-2xl font-bold text-stone-900", total + "+ review"));
    right.appendChild(el("p", "text-sm text-stone-500", "pelanggan puas"));
    wrap.appendChild(right);
    host.appendChild(wrap);
  }

  function renderTestimonials() {
    var grid = document.getElementById("testimonials-grid");
    if (!grid) return;

    grid.textContent = "";
    testimonials.forEach(function (t) {
      var card = el("div", "bg-white rounded-xl shadow-md p-6");
      var head = el("div", "flex items-center gap-3");
      var avatar = document.createElement("img");
      avatar.src = t.avatar;
      avatar.alt = "Foto " + t.nama;
      avatar.className = "w-12 h-12 rounded-full object-cover";
      avatar.setAttribute("loading", "lazy");
      head.appendChild(avatar);
      var who = el("div", null);
      who.appendChild(el("p", "font-semibold text-stone-900 text-sm", t.nama));
      var tb = el("div", "text-xs");
      setStars(tb, t.rating);
      who.appendChild(tb);
      head.appendChild(who);
      card.appendChild(head);
      card.appendChild(el("p", "mt-4 text-sm text-stone-600 leading-relaxed", '"' + t.komentar + '"'));
      grid.appendChild(card);
    });
  }

  var modalEl = document.getElementById("product-modal");
  var modalCard = document.getElementById("modal-card");
  var modalOverlay = document.getElementById("modal-overlay");
  var modalClose = document.getElementById("modal-close");
  var lastFocusedEl = null;
  var savedScrollY = 0;

  function getModalFocusables() {
    if (!modalCard) return [];
    return Array.from(modalCard.querySelectorAll("button, a[href], [tabindex]")).filter(function (el) {
      return !el.disabled && el.offsetParent !== null;
    });
  }

  function openProductModal(id, triggerEl) {
    var p = null;
    for (var i = 0; i < products.length; i++) {
      if (products[i].id === id) { p = products[i]; break; }
    }
    if (!p || !modalEl) return;

    savedScrollY = window.scrollY;
    lastFocusedEl = triggerEl || document.activeElement;

    document.getElementById("modal-image").src = p.gambar;
    document.getElementById("modal-image").alt = p.nama;
    document.getElementById("modal-title").textContent = p.nama;
    var modalRating = document.getElementById("modal-rating");
    modalRating.textContent = "";
    var ms = document.createElement("span");
    setStars(ms, p.rating);
    modalRating.appendChild(ms);
    var mc = document.createElement("span");
    mc.className = "text-xs text-stone-500 ml-2";
    mc.textContent = "(" + p.jumlahReview + " review)";
    modalRating.appendChild(mc);
    document.getElementById("modal-price").textContent = formatPrice(p.harga);
    document.getElementById("modal-desc").textContent = p.deskripsi;

    var waBtn = document.getElementById("modal-wa");
    waBtn.href = waUrl("Halo, saya tertarik dengan produk " + p.nama);
    waBtn.target = "_blank";
    waBtn.rel = "noopener";

    modalEl.style.display = "flex";
    modalEl.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    modalClose.focus();
  }

  function closeProductModal() {
    if (!modalEl) return;
    modalEl.style.display = "none";
    modalEl.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocusedEl && lastFocusedEl.focus) {
      lastFocusedEl.focus();
    }
  }

  if (modalEl) {
    modalClose.addEventListener("click", closeProductModal);
    modalOverlay.addEventListener("click", closeProductModal);
    modalCard.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    document.addEventListener("keydown", function (e) {
      if (modalEl.style.display !== "flex") return;
      if (e.key === "Escape") {
        closeProductModal();
        return;
      }
      if (e.key === "Tab") {
        var focusables = getModalFocusables();
        if (focusables.length === 0) return;
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyWaLinks();
    renderRatingSummary();
    renderProducts();
    renderTestimonials();

    var yearEl = document.getElementById("footer-year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  });
})();
