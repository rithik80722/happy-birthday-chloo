/* ===================== PARTICLES.JS ===================== */

// ── STARS BACKGROUND ──────────────────────────────────────
function initStars() {
  const container = document.getElementById('stars-bg');
  if (!container) return;
  const count = window.innerWidth < 600 ? 60 : 120;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 2.5 + 0.5;
    star.style.cssText = `
      position:absolute;
      width:${size}px;height:${size}px;
      border-radius:50%;
      background:rgba(255,220,240,${Math.random() * 0.8 + 0.2});
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      animation: star-twinkle ${2 + Math.random() * 4}s ease-in-out ${Math.random() * 4}s infinite;
    `;
    container.appendChild(star);
  }
}

// ── FLOATING HEARTS ──────────────────────────────────────
function initFloatingHearts() {
  const container = document.getElementById('floating-hearts-bg');
  if (!container) return;
  const hearts = ['❤️','💕','💖','💗','💝','🌸','✨','💫'];
  const count = window.innerWidth < 600 ? 10 : 20;

  for (let i = 0; i < count; i++) {
    createFloatingHeart(container, hearts, true);
  }

  setInterval(() => createFloatingHeart(container, hearts, false), 1200);
}

function createFloatingHeart(container, hearts, immediate) {
  const el = document.createElement('span');
  const size = Math.random() * 22 + 10;
  const left = Math.random() * 100;
  const dur = 8 + Math.random() * 10;
  const delay = immediate ? -(Math.random() * dur) : 0;

  el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  el.style.cssText = `
    position:absolute;
    font-size:${size}px;
    left:${left}%;
    bottom:-5%;
    opacity:0.5;
    --spin:${Math.random() * 60 - 30}deg;
    animation: heart-float ${dur}s ease-out ${delay}s forwards;
    pointer-events:none;
  `;
  container.appendChild(el);
  setTimeout(() => el.remove(), (dur + Math.abs(delay)) * 1000 + 500);
}

// ── ROSE PETALS ───────────────────────────────────────────
function initRosePetals() {
  const container = document.getElementById('rose-petals');
  if (!container) return;
  const colors = ['#ff9eb5','#ffafd7','#ff80b5','#dda0dd','#e6a8d7','#ffcce0'];
  const count = window.innerWidth < 600 ? 12 : 24;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div');
    const size = Math.random() * 14 + 8;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const dur = 6 + Math.random() * 8;
    const delay = Math.random() * 8;
    const drift = (Math.random() * 120 - 60) + 'px';

    petal.className = 'petal';
    petal.style.cssText = `
      left:${left}%;
      width:${size}px;height:${size}px;
      background:${color};
      --dur:${dur}s;
      --delay:${delay}s;
      --drift:${drift};
      opacity:0.6;
      box-shadow: 0 0 6px ${color}44;
    `;
    container.appendChild(petal);
  }
}

// ── FIREWORKS ─────────────────────────────────────────────
(function initFireworks() {
  const canvas = document.getElementById('fireworks-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], active = true;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor(x, y, color) {
      this.x = x; this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 1;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - Math.random() * 2;
      this.alpha = 1;
      this.decay = 0.012 + Math.random() * 0.015;
      this.radius = Math.random() * 3 + 1;
      this.color = color;
      this.gravity = 0.08;
    }
    update() {
      this.vx *= 0.98;
      this.vy *= 0.98;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const colors = ['#ff4d94','#ff80b5','#dda0dd','#c084fc','#f9d376','#ffafd7','#ffffff','#ff9eb5'];

  function burst(x, y) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const count = 60 + Math.floor(Math.random() * 40);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(x, y, color));
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles = particles.filter(p => p.alpha > 0);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();

  // Launch bursts on page load
  let burstCount = 0;
  const maxBursts = 8;
  function launchBurst() {
    if (burstCount >= maxBursts) return;
    const x = 0.2 * W + Math.random() * 0.6 * W;
    const y = 0.1 * H + Math.random() * 0.5 * H;
    burst(x, y);
    burstCount++;
    if (burstCount < maxBursts) {
      setTimeout(launchBurst, 350 + Math.random() * 400);
    }
  }
  setTimeout(launchBurst, 600);

  // Expose for confetti button
  window._fireworksBurst = burst;
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initStars();
  initFloatingHearts();
  initRosePetals();
});
