/**
 * 株式会社 山恵 — Corporate site interactions
 */

(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".site-header__menu-toggle");
  const nav = document.querySelector("#global-nav");
  const navLinks = document.querySelectorAll(".site-header__nav-list a, .site-header__cta");
  const backToTop = document.querySelector(".back-to-top");

  /* Mobile navigation */
  if (menuToggle && header && nav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = header.classList.toggle("is-menu-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "メニューを閉じる" : "メニューを開く"
      );
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("is-menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "メニューを開く");
        document.body.style.overflow = "";
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768 && header.classList.contains("is-menu-open")) {
        header.classList.remove("is-menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "メニューを開く");
        document.body.style.overflow = "";
      }
    });
  }

  /* Scroll: header shrink + glass effect */
  window.addEventListener('scroll', function () {
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  });

  /* Back to top (legacy) */
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* Scroll fade-in */
  var fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    var fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(function (el) { fadeObserver.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Footer back-to-top button */
  var backToTopFooter = document.querySelector(".back-to-top-footer");
  if (backToTopFooter) {
    backToTopFooter.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
 //hero-image-fade
  document.addEventListener("DOMContentLoaded", () => {
    const heroImage = document.querySelector(".product-diagram__hero");

    if (!heroImage) return;

    const images = [
      "./images/top_01.png",
      "./images/top_02.png",
      "./images/top_03.png"
    ];

    const displayTime = 3000;
    let currentIndex = 0;

    // 先に画像を読み込んでおく
    images.forEach((src) => {
      const preloadImage = new Image();
      preloadImage.src = src;
    });

    function startSlideshow() {
      setTimeout(() => {
        heroImage.classList.add("is-fading");
      }, displayTime);
    }

    heroImage.addEventListener("transitionend", async (event) => {
      if (event.propertyName !== "opacity") return;

      // フェードイン完了時には処理しない
      if (!heroImage.classList.contains("is-fading")) return;

      currentIndex = (currentIndex + 1) % images.length;

      const nextImage = new Image();
      nextImage.src = images[currentIndex];

      try {
        // 次の画像を完全に読み込む
        await nextImage.decode();
      } catch (error) {
        console.warn("画像の読み込みに失敗しました。", error);
      }

      // 透明な状態で画像を変更
      heroImage.src = images[currentIndex];

      // ブラウザの描画を待ってからフェードイン
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          heroImage.classList.remove("is-fading");
          startSlideshow();
        });
      });
    });

    startSlideshow();
  });

})();
