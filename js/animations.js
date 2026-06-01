/* ===================== ANIMATIONS.JS ===================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── SCROLL REVEAL ────────────────────────────────────────
  const scrollEls = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.style.getPropertyValue('--delay') || '0s';
        el.style.transitionDelay = delay;
        el.classList.add('visible');
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  scrollEls.forEach(el => observer.observe(el));

  // ── PARALLAX HERO ────────────────────────────────────────
  const hero = document.getElementById('hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight * 1.5) {
        const content = hero.querySelector('.hero-content');
        if (content) content.style.transform = `translateY(${scrollY * 0.25}px)`;
        const overlay = hero.querySelector('.hero-overlay');
        if (overlay) overlay.style.opacity = 1 - scrollY / (window.innerHeight * 0.8);
      }
    }, { passive: true });
  }

  // ── TYPING EFFECT ────────────────────────────────────────
  const typingEl = document.getElementById('typing-text');
  if (typingEl) {
    // 📝 CUSTOMIZE YOUR LOVE LETTER HERE:
    const letter = `Intha azhagana naal la, ulagam ellam un Birthday celebrate panra nerathula, nee en life la vandhadhu enakku evlo periya blessing nu naan daily feel panren. Indha universe la irundha ella possibilities la irundhum nee enakku kidaichadhu romba special ah irukku.

Nee en lover mattum illa… nee dhaan en happiness, en peace, en sirippu, en safe place. Un kooda spend panra ovvoru naalum naan deserve pannadha oru beautiful gift madhiri irukku.

Un birthday naala naan un birth ah mattum celebrate panna maaten. Nee kudutha ovvoru smile ah, naa lonely ah feel panama aakiruku, namma share pandra chinna chinna memories ah naa en heart la forever vachiruppen.

Nee ippadiye irukkuradhukku thank you. Unnala indha world innum azhaga irukku. Unnala naanum better person ah maariten.

Happy Birthday my love ❤️
 🌹`;

    let charIdx = 0;
    let started = false;

    const letterObs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        started = true;
        typeChar();
        letterObs.disconnect();
      }
    }, { threshold: 0.3 });

    letterObs.observe(typingEl);

    function typeChar() {
      if (charIdx < letter.length) {
        typingEl.textContent += letter[charIdx];
        charIdx++;
        const delay = letter[charIdx - 1] === '\n' ? 300 :
                      '.!?'.includes(letter[charIdx - 1]) ? 180 : 28;
        setTimeout(typeChar, delay);
      }
    }
  }

  // ── FOOTER HEARTS ────────────────────────────────────────
  const footerHearts = document.getElementById('footer-hearts');
  if (footerHearts) {
    const emojis = ['💖','💕','🌹','✨','💝','💗','🌸','💫'];
    for (let i = 0; i < 16; i++) {
      const h = document.createElement('span');
      h.className = 'footer-heart-particle';
      const dur  = 6 + Math.random() * 8;
      const delay = Math.random() * -dur;
      h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      h.style.cssText = `
        left: ${Math.random() * 100}%;
        bottom: -5%;
        font-size: ${14 + Math.random() * 20}px;
        --fdur: ${dur}s;
        --fdelay: ${delay}s;
        --spin: ${Math.random() * 60 - 30}deg;
      `;
      footerHearts.appendChild(h);
    }
  }

});
