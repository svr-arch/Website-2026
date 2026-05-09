// 2D Niri Hypermedia Logic with paxi.js State Preservation

// Target switching: Main pages spawn new ribbons, sub-pages append to current ribbon
document.addEventListener('fx:config', (e) => {
  const trigger = e.detail.cfg.trigger;
  if (!trigger) return;
  const elt = trigger.target.closest('[fx-action]');
  if (!elt) return;

  const url = e.detail.cfg.action;
  const existing = document.querySelector(`.niri-window[data-url="${url}"]`);
  if (existing) {
    e.preventDefault(); // Abort fixi request
    document.body.classList.remove('overview-mode');
    existing.focus();
    setTimeout(() => {
      existing.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }, 50);
    return;
  }

  if (elt.hasAttribute('fx-main-page')) {
    e.detail.cfg.target = document.getElementById('niri-track-v');
    e.detail.cfg.swap = 'beforeend';
  } else {
    const track = elt.closest('.niri-horizontal-track');
    if (track) {
      e.detail.cfg.target = track;
      e.detail.cfg.swap = 'beforeend';
    }
  }
});

function injectCloseBtn(container) {
  const wins = container.querySelectorAll('.niri-window');
  wins.forEach(win => {
    if (win.id === 'root-window') return;
    if (!win.querySelector('.mobile-close-btn')) {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'mobile-close-btn';
      closeBtn.innerHTML = '×';
      closeBtn.setAttribute('aria-label', 'Close window');
      win.prepend(closeBtn);
    }
  });
}

// Shell stripping and Mobile injection
document.addEventListener('fx:after', (e) => {
  const trigger = e.detail.cfg.trigger;
  const elt = trigger?.target.closest('[fx-action]');
  const parser = new DOMParser();
  const doc = parser.parseFromString(e.detail.cfg.text, 'text/html');
  const content = doc.querySelector('.niri-window');

  if (content) {
    content.setAttribute('data-url', e.detail.cfg.action);
    // Generate unique ID for paxi to track this window
    if (!content.id || content.id === 'root-window') {
      content.id = 'win-' + Math.random().toString(36).substr(2, 9);
    }
    content.setAttribute('tabindex', '-1');
    e.detail.cfg.newWinId = content.id;
    
    if (elt && elt.hasAttribute('fx-main-page')) {
      // Wrap main pages in a new horizontal track
      const ribbon = document.createElement('div');
      ribbon.className = 'niri-horizontal-track';
      ribbon.id = 'track-' + Math.random().toString(36).substr(2, 9);
      ribbon.appendChild(content);
      injectCloseBtn(ribbon);
      e.detail.cfg.text = ribbon.outerHTML;
    } else {
      const temp = document.createElement('div');
      temp.appendChild(content);
      injectCloseBtn(temp);
      e.detail.cfg.text = temp.innerHTML;
    }
  }
});

// Native scroll snapping focus
document.addEventListener('fx:end', (e) => {
  const newWinId = e.detail.cfg.newWinId;
  if (newWinId) {
    const win = document.getElementById(newWinId);
    if (win) {
      win.focus();
      setTimeout(() => {
        win.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      }, 50);
    }
  } else {
    const target = e.detail.cfg.target;
    if (target) {
      if (target.id === 'niri-track-v') {
        target.scrollTop = target.scrollHeight;
      } else {
        target.scrollLeft = target.scrollWidth;
      }
    }
  }
});

// Initial injection
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => injectCloseBtn(document.body));
} else {
  injectCloseBtn(document.body);
}
