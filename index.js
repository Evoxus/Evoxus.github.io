'use strict';

function smoothScroll() {
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function (e) {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          let target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
              e.preventDefault();

              // Close mobile menu immediately
              $('#menu-toggle').prop('checked', false);

              // Start scrolling right away
              $('html, body').animate({
                  scrollTop: target.offset().top
              }, 400, "easeInOutExpo");
          }
      }
  });
}

function scrollToTop() {
  $(document).scroll(function () {
    let scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
    } else {
        $('.scroll-to-top').fadeOut();
    }
  });
}

/* ===== Hero Particle Effect ===== */
function initHeroParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const hero = canvas.closest('.hero');

  let width, height;
  let mouse = { x: -9999, y: -9999 };
  let particles = [];
  const PARTICLE_COUNT = 80;
  const CONNECTION_DIST = 140;
  const MOUSE_RADIUS = 200;

  // Palette colors (rgb)
  const colors = [
    [16, 185, 129],   // --primary
    [6, 182, 212],    // --secondary
    [52, 211, 153],   // --primary-light
    [34, 211, 238],   // --accent
  ];

  function resize() {
    const rect = hero.getBoundingClientRect();
    width = canvas.width = rect.width;
    height = canvas.height = rect.height;
  }

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.05;
      this.vy = (Math.random() - 0.5) * 0.05;
      this.radius = Math.random() * 2 + 1;
      this.baseRadius = this.radius;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.4 + 0.15;
      this.baseAlpha = this.alpha;
      // Unique wander offsets for organic ambient motion
      this.wanderOffsetX = Math.random() * 1000;
      this.wanderOffsetY = Math.random() * 1000;
      this.wanderSpeed = 0.00004 + Math.random() * 0.00006;
      this.wanderStrength = 0.0005 + Math.random() * 0.0005;
    }
    update() {
      // Ambient wander — gentle sine-based drift so particles are never static
      const t = performance.now();
      this.vx += Math.sin(t * this.wanderSpeed + this.wanderOffsetX) * this.wanderStrength;
      this.vy += Math.cos(t * this.wanderSpeed + this.wanderOffsetY) * this.wanderStrength;

      // Damping — light enough to preserve ambient drift
      this.vx *= 0.998;
      this.vy *= 0.998;

      // Soft speed cap on ambient drift only
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed > 0.15) {
        this.vx *= 0.15 / speed;
        this.vy *= 0.15 / speed;
      }

      // Mouse interaction — applied AFTER the speed cap so repel isn't clamped
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      let mouseVx = 0, mouseVy = 0;
      if (dist < MOUSE_RADIUS) {
        const force = (1 - dist / MOUSE_RADIUS) * 2.5;
        mouseVx = (dx / dist) * force * 0.8;
        mouseVy = (dy / dist) * force * 0.8;
        this.radius = this.baseRadius + force * 3;
        this.alpha = Math.min(this.baseAlpha + force * 0.5, 0.9);
      } else {
        this.radius += (this.baseRadius - this.radius) * 0.05;
        this.alpha += (this.baseAlpha - this.alpha) * 0.05;
      }

      // Apply movement: ambient drift + mouse push
      this.x += this.vx + mouseVx;
      this.y += this.vy + mouseVy;

      // Wrap edges
      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.y = height + 20;
      if (this.y > height + 20) this.y = -20;
    }
    draw() {
      const [r, g, b] = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${this.alpha})`;
      ctx.fill();
    }
  }

  function init() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const opacity = (1 - dist / CONNECTION_DIST) * 0.15;
          const [r, g, b] = particles[i].color;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${r},${g},${b},${opacity})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // Draw fluid blobs near mouse for the semi-fluid feel
    if (mouse.x > 0 && mouse.y > 0) {
      const nearby = particles.filter(p => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        return Math.sqrt(dx * dx + dy * dy) < MOUSE_RADIUS;
      });
      if (nearby.length >= 3) {
        ctx.beginPath();
        ctx.moveTo(nearby[0].x, nearby[0].y);
        for (let i = 1; i < nearby.length; i++) {
          const xc = (nearby[i].x + nearby[Math.min(i + 1, nearby.length - 1)].x) / 2;
          const yc = (nearby[i].y + nearby[Math.min(i + 1, nearby.length - 1)].y) / 2;
          ctx.quadraticCurveTo(nearby[i].x, nearby[i].y, xc, yc);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(16, 185, 129, 0.03)';
        ctx.fill();
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }

  // Events
  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  hero.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  window.addEventListener('resize', () => {
    resize();
    init();
  });

  resize();
  init();
  animate();
}

$(function() {
  smoothScroll();
  scrollToTop();
  initHeroParticles();
  document.getElementById('copyright-year').textContent = new Date().getFullYear();
});
