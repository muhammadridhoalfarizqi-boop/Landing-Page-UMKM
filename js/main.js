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

  function starHtml(rating) {
    var full = Math.round(rating);
    var s = "";
    for (var i = 1; i <= 5; i++) {
      s += '<span class="' + (i <= full ? "star-fill" : "star-empty") + '" aria-hidden="true">★</span>';
    }
    return s;
  }

  function formatPrice(num) {
    return "Rp " + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function renderProducts() {
    var grid = document.getElementById("product-grid");
    if (!grid) return;

    var html = "";
    products.forEach(function (p, i) {
      var cardLabel = p.nama + ', ' + formatPrice(p.harga) + ', rating ' + p.rating + ' dari ' + p.jumlahReview + ' ulasan';
      var imgAttrs = i === 0 ? 'fetchpriority="high"' : 'loading="lazy"';
      html +=
        '<article class="product-card bg-white shadow-md cursor-pointer" data-id="' + p.id + '" tabindex="0" role="button" aria-label="' + cardLabel + '">' +
          '<img src="' + p.gambar + '" alt="' + p.nama + '" class="w-full h-52 object-cover" ' + imgAttrs + ' />' +
          '<div class="p-4">' +
            '<h3 class="font-bold text-stone-900 text-base leading-snug">' + p.nama + '</h3>' +
            '<div class="flex items-center gap-1 mt-1">' + starHtml(p.rating) + '<span class="text-xs text-stone-500 ml-1">(' + p.jumlahReview + ")</span></div>" +
            '<p class="mt-2 text-lg font-extrabold text-amber-800">' + formatPrice(p.harga) + "</p>" +
            '<button type="button" class="btn-detail mt-3">Lihat Detail</button>' +
          "</div>" +
        "</article>";
    });

    grid.innerHTML = html;

    grid.querySelectorAll(".product-card").forEach(function (card) {
      card.addEventListener("click", function () {
        openProductModal(parseInt(card.dataset.id, 10), card);
      });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openProductModal(parseInt(card.dataset.id, 10), card);
        }
      });
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
    var el = document.getElementById("rating-summary");
    if (!el) return;

    el.innerHTML =
      '<div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">' +
        '<div class="flex items-center gap-2">' +
          '<span class="text-5xl font-extrabold text-amber-800">' + avg.toFixed(1) + "</span>" +
          '<div class="flex flex-col">' +
            '<div class="text-lg">' + starHtml(Math.round(avg)) + "</div>" +
            '<span class="text-sm text-stone-500">dari 5</span>' +
          "</div>" +
        "</div>" +
        '<div class="text-center sm:text-left">' +
          '<p class="text-2xl font-bold text-stone-900">' + total + "+ review</p>" +
          '<p class="text-sm text-stone-500">pelanggan puas</p>' +
        "</div>" +
      "</div>";
  }

  function renderTestimonials() {
    var grid = document.getElementById("testimonials-grid");
    if (!grid) return;

    var html = "";
    testimonials.forEach(function (t) {
      html +=
        '<div class="bg-white rounded-xl shadow-md p-6">' +
          '<div class="flex items-center gap-3">' +
            '<img src="' + t.avatar + '" alt="Foto ' + t.nama + '" class="w-12 h-12 rounded-full object-cover" loading="lazy" />' +
            "<div>" +
              '<p class="font-semibold text-stone-900 text-sm">' + t.nama + "</p>" +
              '<div class="text-xs">' + starHtml(t.rating) + "</div>" +
            "</div>" +
          "</div>" +
          '<p class="mt-4 text-sm text-stone-600 leading-relaxed">"' + t.komentar + '"</p>' +
        "</div>";
    });

    grid.innerHTML = html;
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
    document.getElementById("modal-rating").innerHTML = starHtml(p.rating) + '<span class="text-xs text-stone-500 ml-2">(' + p.jumlahReview + " review)</span>";
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
