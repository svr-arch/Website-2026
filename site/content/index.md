---
title: "PESU ECC"
layout: page
---

<div class="niri-root-window">
  <img src="/static/images/anna.png" alt="ACM PESU ECC" class="root-logo">
  <h1 class="root-title">ACM PESU-ECC</h1>
  <p class="root-tagline">Niri-inspired horizontal tiling interface.</p>
  
  <div class="root-nav">
    <a href="/about.html" class="m-link" fx-action="/about.html" fx-target="#niri-track" fx-swap="beforeend">About</a>
    <a href="/members.html" class="m-link" fx-action="/members.html" fx-target="#niri-track" fx-swap="beforeend">Members</a>
    <a href="/contact.html" class="m-link" fx-action="/contact.html" fx-target="#niri-track" fx-swap="beforeend">Contact</a>
  </div>
</div>

<style>
.niri-root-window {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
}

.root-logo {
  width: 120px;
  height: 120px;
  margin-bottom: 2rem;
}

.root-title {
  font-size: clamp(2rem, 8vw, 4rem);
  margin-bottom: 1rem;
}

.root-tagline {
  font-size: 1.2rem;
  color: #8bb8d6;
  margin-bottom: 3rem;
}

.root-nav {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
