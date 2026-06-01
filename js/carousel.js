/* ===================== CAROUSEL.JS ===================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── PHOTO SLIDESHOW CAROUSEL ────────────────────────────
  const track = document.getElementById('carousel-track');
  if (track) {
    const slides = track.querySelectorAll('.carousel-slide');
    const dotsContainer = document.getElementById('carousel-dots');
    let current = 0;
    let autoTimer;

    // Create dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    function goTo(index) {
      slides[current].classList.remove('active');
      dotsContainer.children[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dotsContainer.children[current].classList.add('active');
      resetAuto();
    }

    function resetAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(() => goTo(current + 1), 4500);
    }

    document.getElementById('carousel-prev')?.addEventListener('click', () => goTo(current - 1));
    document.getElementById('carousel-next')?.addEventListener('click', () => goTo(current + 1));

    // Swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) goTo(current + (dx < 0 ? 1 : -1));
    });

    resetAuto();
  }

  // ── QUOTES CAROUSEL ─────────────────────────────────────
  const quotesCarousel = document.getElementById('quotes-carousel');
  if (quotesCarousel) {
    const items = quotesCarousel.querySelectorAll('.quote-item');
    let qCurrent = 0;
    let qTimer;

    function qGoTo(index) {
      items[qCurrent].classList.remove('active');
      qCurrent = (index + items.length) % items.length;
      items[qCurrent].classList.add('active');
      resetQAuto();
    }

    function resetQAuto() {
      clearInterval(qTimer);
      qTimer = setInterval(() => qGoTo(qCurrent + 1), 5000);
    }

    document.getElementById('q-prev')?.addEventListener('click', () => qGoTo(qCurrent - 1));
    document.getElementById('q-next')?.addEventListener('click', () => qGoTo(qCurrent + 1));

    resetQAuto();
  }

});
