window.addEventListener('keydown', (e) => {
  const lastWindow = document.querySelector('.niri-window:last-child');
  const helpModal = document.getElementById('help-modal');

  if (e.shiftKey && e.key === 'Q') {
    if (document.querySelectorAll('.niri-window').length > 1) lastWindow.remove();
  } else if (e.shiftKey && e.key === 'F') {
    lastWindow?.classList.toggle('w-full');
  } else if (e.key.toLowerCase() === 'd') {
    document.body.classList.toggle('overview-mode');
  } else if (e.key === '/') {
    helpModal.open ? helpModal.close() : helpModal.showModal();
    e.preventDefault();
  }
});

// Fixi hook to ensure new windows are scrolled into view natively via scroll-snap
document.addEventListener('fixi:end', () => {
  const track = document.getElementById('niri-track');
  if (track) track.scrollLeft = track.scrollWidth;
});
