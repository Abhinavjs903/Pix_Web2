// === script.js ===
// ✅ Ensure GSAP + ScrollTrigger are loaded before using
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Smooth reveal for each panel
  document.querySelectorAll('.panel').forEach(panel => {
    const inner = panel.querySelector('.panel-inner');
    if (inner) {
      gsap.fromTo(inner,
        { y: 30, autoAlpha: 0 },
        {
          y: 0, autoAlpha: 1, duration: 0.9, ease: 'power2.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });
    }

    // Subtle background parallax
    const bg = panel.querySelector('.section-bg');
    if (bg) {
      gsap.fromTo(bg, { y: -40 }, {
        y: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: panel,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8
        }
      });
    }
  });
}

// === Navigation behavior ===
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    const target = document.getElementById(item.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeMobileNav();
  });
});

// === Highlight nav item on scroll ===
const sections = document.querySelectorAll('.panel');
window.addEventListener('scroll', () => {
  const mid = window.innerHeight / 2;
  sections.forEach(sec => {
    const r = sec.getBoundingClientRect();
    if (r.top <= mid && r.bottom >= mid) {
      navItems.forEach(n => n.classList.remove('active'));
      const nav = document.querySelector(`.nav-item[data-target="${sec.id}"]`);
      if (nav) nav.classList.add('active');
      const themeBadge = document.getElementById('themeBadge');
      if (themeBadge)
        themeBadge.textContent = sec.dataset.theme
          ? sec.dataset.theme.toUpperCase()
          : 'PIXELARK';
    }
  });
});

// === Mobile hamburger ===
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('navList');

function openMobileNav() {
  if (navList) {
    navList.classList.add('mobile-open');
    hamburger?.setAttribute('aria-expanded', 'true');
  }
}
function closeMobileNav() {
  if (navList) {
    navList.classList.remove('mobile-open');
    hamburger?.setAttribute('aria-expanded', 'false');
  }
}
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navList.classList.contains('mobile-open')
      ? closeMobileNav()
      : openMobileNav();
  });
}

// === Desktop custom cursor ===
const cursor = document.getElementById('cursor');
if (window.innerWidth > 900 && cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  const interactives = document.querySelectorAll('button, a, .nav-item');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
} else if (cursor) {
  cursor.style.display = 'none';
}

// === Add tiny orb particles ===
function addThemeParticles(panel) {
  const theme = panel.dataset.theme;
  for (let i = 0; i < 6; i++) {
    const orb = document.createElement('div');
    orb.className = 'mini-orb';
    Object.assign(orb.style, {
      position: 'absolute',
      borderRadius: '50%',
      filter: 'blur(30px)',
      opacity: '0.09',
      pointerEvents: 'none',
      width: (60 + Math.random() * 140) + 'px',
      height: (60 + Math.random() * 140) + 'px',
      left: (10 + Math.random() * 80) + '%',
      top: (5 + Math.random() * 80) + '%'
    });

    // theme colors
    const colors = {
      neo: 'radial-gradient(circle,#00d1ff,#0000)',
      aurora: 'radial-gradient(circle,#a78bfa,#06b6d4)',
      frost: 'radial-gradient(circle,#60a5fa,#e0f2fe)',
      inferno: 'radial-gradient(circle,#ff6b35,#ffd166)',
      pastel: 'radial-gradient(circle,#ffbcbc,#b6f0d3)',
      electric: 'radial-gradient(circle,#ff6bd1,#60f0ff)',
      cosmic: 'radial-gradient(circle,#a855f7,#7dd3fc)',
      default: 'radial-gradient(circle,#ffffff,#0000)'
    };

    orb.style.background = colors[theme] || colors.default;
    panel.appendChild(orb);
    if (typeof gsap !== "undefined")
      gsap.to(orb, {
        y: -20 + Math.random() * 40,
        x: -10 + Math.random() * 20,
        duration: 6 + Math.random() * 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
  }
}
document.querySelectorAll('.panel').forEach(p => addThemeParticles(p));

// === Stars animation for Home ===
const homeStarsContainer = document.getElementById('homeStars');
if (homeStarsContainer) {
  const numberOfStars = 200;
  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2 + 1;
    Object.assign(star.style, {
      width: size + 'px',
      height: size + 'px',
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      animationDelay: Math.random() * 3 + 's',
      animationDuration: (Math.random() * 3 + 2) + 's'
    });
    homeStarsContainer.appendChild(star);
  }
}

// === Animate viby cards on scroll (GSAP) ===
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  gsap.utils.toArray(".viby-card").forEach(card => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    });
  });
}

// === Fade-in for Project Cards ===
const projectCards = document.querySelectorAll('.project-card');
const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  projectCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < triggerBottom) card.classList.add('show');
  });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();
/* ===== projects horizontal interactivity (consolidated) ===== */
(function () {
  // accept either class name used in markup
  const track = document.querySelector('.projects-track') || document.querySelector('.carousel-track');
  if (!track) return;

  const prev = document.querySelector('.track-nav.prev');
  const next = document.querySelector('.track-nav.next');
  const scrollAmount = 360;

  function updateNavDisabled() {
    if (!prev || !next) return;
    prev.disabled = track.scrollLeft <= 10;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 10;
  }

  prev?.addEventListener('click', () => track.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
  next?.addEventListener('click', () => track.scrollBy({ left: scrollAmount, behavior: 'smooth' }));

  // drag to scroll (desktop)
  let isDown = false, startX = 0, scrollLeftStart = 0;
  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.classList.add('dragging');
    startX = e.pageX - track.offsetLeft;
    scrollLeftStart = track.scrollLeft;
  });
  document.addEventListener('mouseup', () => { isDown = false; track.classList.remove('dragging'); });
  track.addEventListener('mouseleave', () => { isDown = false; track.classList.remove('dragging'); });
  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.2;
    track.scrollLeft = scrollLeftStart - walk;
    updateNavDisabled();
  });

  // touch events (mobile) - passive where appropriate
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - track.offsetLeft;
    scrollLeftStart = track.scrollLeft;
  }, { passive: true });
  track.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - track.offsetLeft;
    const walk = (x - startX) * 1.2;
    track.scrollLeft = scrollLeftStart - walk;
  }, { passive: true });

  // keyboard arrows when focused
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    if (e.key === 'ArrowLeft') track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  // Intersection Observer — allow both naming patterns and mark visible using 'show' (matches existing CSS)
  const cards = track.querySelectorAll('.proj-card, .project-card');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        // add the class the CSS expects for reveal
        en.target.classList.add('show', 'is-visible');
      }
    });
  }, { threshold: 0.3, root: track });

  cards.forEach(c => obs.observe(c));

  // efficient scroll handling
  let raf = null;
  track.addEventListener('scroll', () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(updateNavDisabled);
  });

  window.addEventListener('resize', updateNavDisabled);
  updateNavDisabled();
})();

/* ===== projects: infinite moving cards (transform-based, slower) ===== */
(function () {
  const track = document.querySelector('.carousel-track') || document.querySelector('.projects-track');
  if (!track) return;

  // avoid double-init
  if (track.dataset.inited === '1') return;
  track.dataset.inited = '1';

  // create mover and transfer current children into it
  const mover = document.createElement('div');
  mover.className = 'carousel-mover';
  const children = Array.from(track.children);
  children.forEach(ch => mover.appendChild(ch));
  track.appendChild(mover);

  // duplicate children for seamless loop
  const originalCount = mover.children.length;
  for (let i = 0; i < originalCount; i++) {
    mover.appendChild(mover.children[i].cloneNode(true));
  }

  // compute loop width as half of total mover width (original set width)
  let setWidth = 0;
  function updateSetWidth() {
    // use scrollWidth because children widths + gaps are included
    setWidth = mover.scrollWidth / 2 || 0;
  }
  // measure after layout
  requestAnimationFrame(updateSetWidth);
  window.addEventListener('resize', () => {
    // debounce resize measurement
    clearTimeout(window._moverMeasureTimer);
    window._moverMeasureTimer = setTimeout(updateSetWidth, 120);
  });

  // animation state
  let pos = 0; // current translateX (px)
  let paused = false;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartPos = 0;

  // slower speed: px per ms (0.06 = ~60px/s)
  const speed = 0.06;

  function animate(time) {
    if (!mover._lastTime) mover._lastTime = time;
    const dt = time - mover._lastTime;
    mover._lastTime = time;

    if (!paused && !isDragging && setWidth > 0) {
      pos -= speed * dt;
      // loop when moved past one set width
      if (Math.abs(pos) >= setWidth) {
        pos += setWidth;
      }
      mover.style.transform = `translate3d(${pos}px,0,0)`;
    }

    mover._raf = requestAnimationFrame(animate);
  }
  mover._raf = requestAnimationFrame(animate);

  // pause/resume on hover/focus
  track.addEventListener('mouseenter', () => { paused = true; });
  track.addEventListener('mouseleave', () => { paused = false; });
  track.addEventListener('focusin', () => { paused = true; });
  track.addEventListener('focusout', () => { paused = false; });

  // pointer drag support on mover
  mover.style.touchAction = 'none';
  mover.addEventListener('pointerdown', (e) => {
    isDragging = true;
    paused = true;
    mover.setPointerCapture?.(e.pointerId);
    dragStartX = e.clientX;
    dragStartPos = pos;
  });
  mover.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartX;
    pos = dragStartPos + dx;
    // normalize pos to prevent runaway values
    if (setWidth && Math.abs(pos) >= setWidth) pos = ((pos % setWidth) + setWidth) % setWidth * (pos < 0 ? -1 : 1);
    mover.style.transform = `translate3d(${pos}px,0,0)`;
  });
  mover.addEventListener('pointerup', (e) => {
    isDragging = false;
    paused = false;
    try { mover.releasePointerCapture?.(e.pointerId); } catch (err) {}
  });
  mover.addEventListener('pointercancel', () => { isDragging = false; paused = false; });

  // reveal cards with IntersectionObserver (existing CSS uses .show)
  const cards = mover.querySelectorAll('.proj-card, .project-card');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) en.target.classList.add('show', 'is-visible');
    });
  }, { threshold: 0.25, root: track });
  cards.forEach(c => obs.observe(c));
})();
