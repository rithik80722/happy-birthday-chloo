/* ===================== MAIN.JS ===================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── SMOOTH SCROLL FOR ANCHOR LINKS ──────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ── ADD STAGGER DELAYS TO GRID ITEMS ────────────────────
  document.querySelectorAll('.polaroid').forEach((el, i) => {
    el.style.setProperty('--delay', `${i * 0.1}s`);
  });

  document.querySelectorAll('.flip-card').forEach((el, i) => {
    el.style.setProperty('--delay', `${i * 0.12}s`);
  });

  document.querySelectorAll('.reason-card').forEach((el, i) => {
    el.style.setProperty('--delay', `${i * 0.1}s`);
  });

  // ── PAGE LOAD FADE-IN ────────────────────────────────────
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });

  // ── SECTION BACKGROUND PARALLAX ─────────────────────────
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        section.style.backgroundPositionY = `${progress * 30}px`;
      }
    });
  }, { passive: true });

  // ── NEON GLOW EFFECT ON HOVER ───────────────────────────
  document.querySelectorAll('.countdown-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.04)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ── LOG CUSTOMIZATION GUIDE ──────────────────────────────
  console.log(`
╔══════════════════════════════════════════════╗
║  🌹 Birthday Surprise Website — How to Edit  ║
╠══════════════════════════════════════════════╣
║                                              ║
║  📸 PHOTOS: Add images to /images/ folder   ║
║     photo1.jpg – photo6.jpg (polaroids)     ║
║     slide1.jpg – slide3.jpg (carousel)      ║
║     flip1.jpg  – flip4.jpg  (flip cards)   ║
║     tl1.jpg    – tl6.jpg    (timeline)     ║
║                                              ║
║  🎂 BIRTHDAY DATE: js/countdown.js line 4   ║
║     const BIRTHDAY_DATE = new Date(...)     ║
║                                              ║
║  💌 LOVE LETTER: js/animations.js ~line 35  ║
║     const letter = \`...\`                    ║
║                                              ║
║  🎵 MUSIC: index.html — uncomment audio    ║
║     and set src="your-song.mp3"             ║
║                                              ║
║  💕 NAME: index.html → search "My Love"    ║
║                                              ║
║  🎨 COLORS: css/variables.css              ║
║                                              ║
╚══════════════════════════════════════════════╝
  `);

});
