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

document.addEventListener('click', (e) => {
  const closeBtn = e.target.closest('.mobile-close-btn');
  if (closeBtn) {
    const win = closeBtn.closest('.niri-window');
    if (document.querySelectorAll('.niri-window').length > 1) win.remove();
  }

  const fab = e.target.closest('.fab-overview');
  if (fab) {
    document.body.classList.toggle('overview-mode');
  }
});

// Fixi hook to ensure new windows are scrolled into view natively via scroll-snap
document.addEventListener('fx:end', () => {
  const track = document.getElementById('niri-track');
  if (track) track.scrollLeft = track.scrollWidth;
});

// Fixi hook to strip full page shell and only append .niri-window content
document.addEventListener('fx:after', (e) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(e.detail.cfg.text, 'text/html');
  const content = doc.querySelector('.niri-window');
  if (content) {
    const closeBtn = document.createElement('button');
    closeBtn.className = 'mobile-close-btn';
    closeBtn.innerHTML = '×';
    closeBtn.setAttribute('aria-label', 'Close window');
    content.prepend(closeBtn);

    e.detail.cfg.text = content.outerHTML;
  }
});

