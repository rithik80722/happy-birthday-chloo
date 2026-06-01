/* ===================== MUSIC.JS ===================== */

function toggleMusic() {
  const audio     = document.getElementById('bg-audio');
  const btn       = document.getElementById('play-btn');
  const disc      = document.getElementById('music-disc');
  const visualizer = document.getElementById('music-visualizer');

  if (!audio) return;

  if (audio.paused) {
    // Check if src is set
    if (!audio.src || audio.src === window.location.href) {
      btn.textContent = '⚠ No audio file set';
      setTimeout(() => { btn.textContent = '▶ Play'; }, 2500);
      return;
    }

    audio.play()
      .then(() => {
        btn.textContent = '⏸ Pause';
        disc.classList.add('spinning');
        visualizer.classList.add('active');
      })
      .catch(err => {
        btn.textContent = '⚠ Playback blocked';
        console.warn('Audio playback failed:', err);
        setTimeout(() => { btn.textContent = '▶ Play'; }, 2500);
      });
  } else {
    audio.pause();
    btn.textContent = '▶ Play';
    disc.classList.remove('spinning');
    visualizer.classList.remove('active');
  }
}

window.toggleMusic = toggleMusic;
