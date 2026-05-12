/* ── Navbar on scroll ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Mobile menu ── */
const toggle   = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

/* ── Typed text in hero ── */
const phrases = ['"AI & IoT Engineer"', '"Embedded Systems Builder"', '"Data Pipeline Dev"', '"Robotics Enthusiast"'];
let pi = 0, ci = 0, del = false;
const el = document.getElementById('typed');
if (el) {
  function tick() {
    const p = phrases[pi];
    el.textContent = del ? p.slice(0, --ci) : p.slice(0, ++ci);
    if (!del && ci === p.length)  { del = true; setTimeout(tick, 2200); return; }
    if (del && ci === 0)           { del = false; pi = (pi + 1) % phrases.length; }
    setTimeout(tick, del ? 45 : 75);
  }
  setTimeout(tick, 800);
}

/* ── Scroll reveal ── */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('in'), i * 70);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-up').forEach(el => io.observe(el));

/* ── Animated counters ── */
const co = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = +e.target.dataset.count;
      const dur    = 1200;
      const start  = performance.now();
      const run = (now) => {
        const t = Math.min((now - start) / dur, 1);
        const v = 1 - Math.pow(1 - t, 3);
        e.target.textContent = Math.round(v * target);
        if (t < 1) requestAnimationFrame(run);
      };
      requestAnimationFrame(run);
      co.unobserve(e.target);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('[data-count]').forEach(el => co.observe(el));

/* ── Subtle 3-D tilt on cards ── */
document.querySelectorAll('.exp-card, .proj-card, .skill-group').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width  / 2) / r.width;
    const y = (e.clientY - r.top  - r.height / 2) / r.height;
    card.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    card.style.transition = 'transform 0.08s linear';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
    card.style.transform  = '';
  });
});

/* ── Live dashboard clock ── */
function dashClock() {
  const el = document.getElementById('dashTime');
  if (!el) return;
  el.textContent = new Date().toLocaleTimeString();
  setInterval(() => el.textContent = new Date().toLocaleTimeString(), 1000);
}
dashClock();

/* ── Active nav link ── */
const secs    = document.querySelectorAll('section[id]');
const navAs   = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  secs.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
  navAs.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${cur}` ? 'var(--gold)' : '';
  });
}, { passive: true });

/* ── Hero elements animate on load ── */
document.querySelectorAll('.hero .reveal-up').forEach((el, i) => {
  el.style.animation = `fadeInUp 0.7s cubic-bezier(0,0,0.2,1) ${0.1 + i * 0.12}s both`;
});
