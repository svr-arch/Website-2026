---
title: ""
layout: page
---

<div class="niri-root-window glass-panel">
  <img src="/static/images/anna.png" alt="ACM PESU ECC" class="root-logo">
  <h1 class="root-title">ACM PESU-ECC</h1>
  <p class="root-tagline">Niri-inspired horizontal tiling interface.</p>

  <nav class="root-nav glass-pill">
    <a href="/about.html" class="m-link" fx-action="/about.html" fx-main-page fx-target="#niri-track-v" fx-swap="beforeend">About</a>
    <div class="nav-separator"></div>
    <a href="/members/index.html" class="m-link" fx-action="/members/index.html" fx-main-page fx-target="#niri-track-v" fx-swap="beforeend">Members</a>
    <div class="nav-separator"></div>
    <a href="/blogs/index.html" class="m-link" fx-action="/blogs/index.html" fx-main-page fx-target="#niri-track-v" fx-swap="beforeend">Blogs</a>
    <div class="nav-separator"></div>
    <a href="/events/index.html" class="m-link" fx-action="/events/index.html" fx-main-page fx-target="#niri-track-v" fx-swap="beforeend">Events</a>
    <div class="nav-separator"></div>
    <a href="/contact.html" class="m-link" fx-action="/contact.html" fx-main-page fx-target="#niri-track-v" fx-swap="beforeend">Contact</a>
  </nav>
</div>

<style>
/* Base root window styling */
#root-window {
  background-color: #000c23;
  background-image: radial-gradient(rgba(0, 170, 254, 0.1) 1px, transparent 1px);
  background-size: 24px 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Glowing Dot trail effect */
#root-window::before {
  content: "";
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none;
  background-image: radial-gradient(rgba(0, 170, 254, 0.8) 1.5px, transparent 1.5px);
  background-size: 24px 24px;
  -webkit-mask-image: radial-gradient(circle 150px at var(--cursor-x, -150px) var(--cursor-y, -150px), rgba(0, 0, 0, 1), transparent);
  mask-image: radial-gradient(circle 150px at var(--cursor-x, -150px) var(--cursor-y, -150px), rgba(0, 0, 0, 1), transparent);
  z-index: 0;
  transition: opacity 0.3s;
}

.niri-root-window.glass-panel {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 3rem;
  text-align: center;
  background: rgba(0, 12, 35, 0.6);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(0, 170, 254, 0.3);
  border-radius: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  width: min(90%, 600px);
}

.root-logo {
  width: 120px;
  height: 120px;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 0 12px rgba(0, 170, 254, 0.4));
}

.root-title {
  font-size: clamp(2.5rem, 8vw, 4rem);
  margin-bottom: 0.5rem;
  color: #ffffff;
  text-shadow: 0 0 20px rgba(0, 170, 254, 0.3);
}

.root-tagline {
  font-size: 1.2rem;
  color: #8bb8d6;
  margin-bottom: 2rem;
}

.root-nav.glass-pill {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  justify-content: center;
  background: rgba(0, 12, 35, 0.4);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(0, 170, 254, 0.2);
  border-radius: 50px;
  padding: 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  overflow: hidden;
  isolation: isolate;
}

.nav-separator {
  width: 1px;
  background: rgba(0, 170, 254, 0.3);
  align-self: stretch;
  margin: 0;
}

.root-nav .m-link {
  color: #a3c4ec;
  text-decoration: none;
  font-weight: 600;
  padding: 1.25rem 2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  background: transparent;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.root-nav .m-link:first-of-type {
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
}

.root-nav .m-link:last-of-type {
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
}

.root-nav .m-link:hover, .root-nav .m-link:focus {
  color: #ffffff;
  background: rgba(0, 170, 254, 0.25);
  outline: none;
}

/* Add noise to the glass pill on hover/focus to match iOS */
.root-nav .m-link::after {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E');
  opacity: 0;
  mix-blend-mode: overlay;
  transition: opacity 0.3s;
  pointer-events: none;
}

.root-nav .m-link:hover::after, .root-nav .m-link:focus::after {
  opacity: 0.5;
}

@media (max-width: 768px) {
  .root-nav.glass-pill {
    flex-direction: column;
    border-radius: 24px;
    width: min(90%, 300px);
  }
  .nav-separator {
    width: 100%;
    height: 1px;
    margin: 0;
  }
  .root-nav .m-link {
    width: 100%;
    text-align: center;
    border-radius: 0;
  }
  .root-nav .m-link:first-of-type {
    border-radius: 24px 24px 0 0;
  }
  .root-nav .m-link:last-of-type {
    border-radius: 0 0 24px 24px;
  }
}
</style>

<script>
  // Self-executing script to bind mousemove for this specific view
  (function() {
    const rootWindow = document.getElementById('root-window');
    if (rootWindow && !rootWindow.dataset.cursorBound) {
      let currentX = -200, currentY = -200;
      let targetX = -200, targetY = -200;
      
      function animate() {
        currentX += (targetX - currentX) * 0.15;
        currentY += (targetY - currentY) * 0.15;
        rootWindow.style.setProperty('--cursor-x', `${currentX}px`);
        rootWindow.style.setProperty('--cursor-y', `${currentY}px`);
        if (rootWindow.isConnected) {
          requestAnimationFrame(animate);
        }
      }
      requestAnimationFrame(animate);

      rootWindow.addEventListener('mousemove', (e) => {
        const rect = rootWindow.getBoundingClientRect();
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
      });
      rootWindow.dataset.cursorBound = 'true';
    }
  })();
</script>