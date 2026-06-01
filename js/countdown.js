/* ===================== COUNTDOWN.JS ===================== */

// ── CONFIGURATION ──────────────────────────────────────────
// 🎂 Change the target date here:
const BIRTHDAY_DATE = new Date('2025-06-01T00:00:00');

function updateCountdown() {
  const now = new Date();
  let target = new Date(BIRTHDAY_DATE);

  // If birthday has passed this year, show next year's
  if (now > target) {
    target.setFullYear(target.getFullYear() + 1);
  }

  const diff = target - now;

  if (diff <= 0) {
    // It's the birthday! 🎉
    document.getElementById('cd-days').textContent    = '00';
    document.getElementById('cd-hours').textContent   = '00';
    document.getElementById('cd-minutes').textContent = '00';
    document.getElementById('cd-seconds').textContent = '00';
    document.querySelector('.countdown-note').textContent = '🎉 Today is the day! Happy Birthday! 🎂';
    triggerConfetti && triggerConfetti();
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days    = Math.floor(totalSeconds / (3600 * 24));
  const hours   = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  setCountdownValue('cd-days',    pad(days));
  setCountdownValue('cd-hours',   pad(hours));
  setCountdownValue('cd-minutes', pad(minutes));
  setCountdownValue('cd-seconds', pad(seconds));
}

function pad(n) {
  return String(n).padStart(2, '0');
}

let prevValues = {};
function setCountdownValue(id, val) {
  const el = document.getElementById(id);
  if (!el) return;
  if (prevValues[id] !== val) {
    el.textContent = val;
    el.classList.remove('flip');
    void el.offsetWidth; // reflow
    el.classList.add('flip');
    prevValues[id] = val;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateCountdown();
  setInterval(updateCountdown, 1000);
});
