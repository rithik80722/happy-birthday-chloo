/* ===================== EFFECTS.JS ===================== */

// ── CUSTOM CURSOR ─────────────────────────────────────────
(function initCursor() {
  const cursor = document.getElementById('cursor-glow');
  if (!cursor) return;

  let mouseX = -100, mouseY = -100;
  let curX = -100, curY = -100;
  const SPEED = 0.18;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Hide on touch devices
  window.addEventListener('touchstart', () => {
    cursor.style.display = 'none';
  }, { once: true });

  function animateCursor() {
    curX += (mouseX - curX) * SPEED;
    curY += (mouseY - curY) * SPEED;
    cursor.style.left = curX + 'px';
    cursor.style.top  = curY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Grow on interactive elements
  document.querySelectorAll('a, button, .polaroid, .flip-card, .reason-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '48px';
      cursor.style.height = '48px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '24px';
      cursor.style.height = '24px';
    });
  });
})();

// ── CONFETTI ──────────────────────────────────────────────
function triggerConfetti() {
  const container = document.getElementById('confetti-container');
  if (!container) return;

  const colors = ['#ff4d94','#ffafd7','#dda0dd','#c084fc','#f9d376','#ff9eb5','#ffffff','#ffcce0'];
  const shapes = ['●','★','♥','✦','◆'];
  const count = window.innerWidth < 600 ? 60 : 120;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const size  = 8 + Math.random() * 14;
    const left  = Math.random() * 100;
    const dur   = 2.5 + Math.random() * 2;
    const delay = Math.random() * 0.8;

    el.textContent = shape;
    el.style.cssText = `
      position:absolute;
      left:${left}%;top:-20px;
      font-size:${size}px;color:${color};
      animation: confetti-fall ${dur}s ease-in ${delay}s forwards;
      pointer-events:none;
    `;
    container.appendChild(el);
    setTimeout(() => el.remove(), (dur + delay + 0.5) * 1000);
  }

  // Also burst fireworks
  if (window._fireworksBurst) {
    const W = window.innerWidth, H = window.innerHeight;
    setTimeout(() => window._fireworksBurst(W * 0.3, H * 0.3), 0);
    setTimeout(() => window._fireworksBurst(W * 0.7, H * 0.25), 300);
    setTimeout(() => window._fireworksBurst(W * 0.5, H * 0.4), 600);
  }
}

// ── SURPRISE POPUP ────────────────────────────────────────
function openSurprise() {
  const overlay = document.getElementById('popup-overlay');
  if (!overlay) return;
  overlay.classList.add('open');
  triggerConfetti();

  // Mini fireworks inside popup
  const container = document.getElementById('popup-fireworks');
  if (container) {
    const emojis = ['🎉','✨','🌹','💖','🎊','💫','🥂'];
    for (let i = 0; i < 12; i++) {
      const el = document.createElement('span');
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.cssText = `
        position:absolute;
        font-size:${20 + Math.random() * 24}px;
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        opacity:0;
        animation: fadeIn 0.5s ease ${Math.random() * 0.5}s forwards, floatY 3s ease-in-out infinite;
      `;
      container.appendChild(el);
    }
  }
}

function closeSurprise(e) {
  if (e && e.target !== document.getElementById('popup-overlay')) return;
  const overlay = document.getElementById('popup-overlay');
  if (overlay) overlay.classList.remove('open');
}

// Close popup on ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSurprise();
});

// Make functions globally available
window.triggerConfetti = triggerConfetti;
window.openSurprise    = openSurprise;
window.closeSurprise   = closeSurprise;
