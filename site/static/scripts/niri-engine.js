// 2D Niri Hypermedia Logic

// Target switching: Main pages spawn new ribbons, sub-pages append to current ribbon
document.addEventListener('fx:config', (e) => {
  const trigger = e.detail.cfg.trigger;
  if (!trigger) return;
  const elt = trigger.target.closest('[fx-action]');
  if (!elt) return;

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
    if (elt && elt.hasAttribute('fx-main-page')) {
      const ribbon = document.createElement('div');
      ribbon.className = 'niri-horizontal-track';
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
  const target = e.detail.cfg.target;
  if (target) {
    if (target.id === 'niri-track-v') {
      target.scrollTop = target.scrollHeight;
    } else {
      target.scrollLeft = target.scrollWidth;
    }
  }
});

// Initial injection
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => injectCloseBtn(document.body));
} else {
  injectCloseBtn(document.body);
}
