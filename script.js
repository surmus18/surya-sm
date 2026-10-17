const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
document.getElementById('year').textContent = new Date().getFullYear();

// Floating Off-Canvas Navigation Drawer
const menuBtn = document.getElementById('menuBtn');
const menuCloseBtn = document.getElementById('menuCloseBtn');
const menuDrawer = document.getElementById('menuDrawer');
const menuBackdrop = document.getElementById('menuBackdrop');

function openDrawer() {
  if (!menuDrawer) return;
  menuDrawer.classList.add('is-open');
  menuDrawer.setAttribute('aria-hidden', 'false');
  if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  if (!menuDrawer) return;
  menuDrawer.classList.remove('is-open');
  menuDrawer.setAttribute('aria-hidden', 'true');
  if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (menuBtn) menuBtn.addEventListener('click', openDrawer);
if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeDrawer);
if (menuBackdrop) menuBackdrop.addEventListener('click', closeDrawer);
document.querySelectorAll('.drawer-link').forEach(a => {
  a.addEventListener('click', () => closeDrawer());
});
window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menuDrawer && menuDrawer.classList.contains('is-open')) {
    closeDrawer();
  }
});

// If a logo fails to load: hide floating/marquee tiles, show a code icon for skills
const codeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg>';
document.addEventListener('error', e => {
  const t = e.target; if (!t || t.tagName !== 'IMG') return;
  if (t.closest('.skill')) t.outerHTML = codeIcon;
  else { const i = t.closest('.icon, .track span'); if (i) i.style.display = 'none'; }
}, true);

const D = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/';
const dev = n => `${D}${n}/${n}-original.svg`;
const icons = { layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 12 10 5 10-5"/><path d="m2 17 10 5 10-5"/>', globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>', cart: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>', server: '<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 6h.01M6 18h.01"/>', card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>', award: '<circle cx="12" cy="8" r="6"/><path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5"/>', cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>', truck: '<path d="M1 3h15v13H1zM16 8h4l3 3v5h-7"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>' };
const svg = k => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[k]}</svg>`;

// Tech marquee
const logos = ['react', 'nextjs', 'javascript', 'html5', 'css3', 'tailwindcss', 'bootstrap', 'php', 'mysql', 'git', 'github', 'linux', 'postman'];
const row = logos.map(n => `<span><img src="${dev(n)}" alt="" loading="lazy"></span>`).join('');
document.getElementById('track').innerHTML = row + row;

// What I do
const services = [
  ['layers', 'ERP modules', 'Building and maintaining modules for Kalvisali ERP, including Certificate, CMS and reporting features.', '#7C3AED', '#A855F7'],
  ['globe', 'Institutional websites', 'Developed 30+ institutional websites using Next.js and Tailwind CSS.', '#EC4899', '#F43F5E'],
  ['cart', 'E-commerce customization', 'Customizing OpenCart and WooCommerce storefronts, with payment gateway integrations.', '#F97316', '#F59E0B'],
  ['server', 'Servers and databases', 'Linux server operations, MySQL optimization, database backups and SSL management.', '#14B8A6', '#0EA5E9']
];
document.getElementById('serviceGrid').innerHTML = services.map(([i, t, d, c, c2]) => `
  <article class="svc reveal" style="--c:${c};--c2:${c2}"><div class="chip">${svg(i)}</div>
  <h3 class="font-display text-xl font-semibold mb-2">${t}</h3><p class="text-slate-600 text-sm leading-relaxed">${d}</p></article>`).join('');

// Skills
const skills = {
  'Frontend': [['React.js (Vite)', dev('react')], ['Next.js', dev('nextjs')], ['JavaScript', dev('javascript')], ['HTML5', dev('html5')], ['CSS3', dev('css3')], ['Tailwind CSS', dev('tailwindcss')], ['Bootstrap 5', dev('bootstrap')]],
  'Backend and data': [['PHP MVC', dev('php')], ['YAK Framework'], ['MySQL', dev('mysql')], ['REST APIs'], ['Authentication'], ['Payment gateway integrations']],
  'Other': [['Git/GitHub', dev('git')], ['Postman', dev('postman')], ['Linux server administration', dev('linux')], ['Database backups'], ['SSL management'], ['Technical SEO']]
};
const palette = ['#7C3AED', '#EC4899', '#F97316', '#14B8A6', '#0EA5E9', '#F59E0B'];
const code = codeIcon;
const tabs = document.getElementById('tabs'), panel = document.getElementById('skillPanel');
function showSkills(name) {
  tabs.querySelectorAll('.tab').forEach(t => t.setAttribute('aria-selected', t.dataset.name === name));
  panel.innerHTML = skills[name].map(([n, src], i) => `<div class="skill" style="--c:${palette[i % 6]}">${src ? `<img src="${src}" alt="" loading="lazy">` : code}<span>${n}</span></div>`).join('');
  if (!reduced && window.gsap) gsap.from(panel.children, { y: 14, opacity: 0, scale: .96, stagger: .05, duration: .45, ease: 'power2.out' });
}
Object.keys(skills).forEach(name => {
  const b = document.createElement('button');
  b.className = 'tab'; b.textContent = name; b.dataset.name = name; b.setAttribute('role', 'tab');
  b.addEventListener('click', () => showSkills(name));
  tabs.appendChild(b);
});
showSkills('Frontend');

// Projects
const projects = [
  ['layers', 'Kalvisali ERP', 'My contribution: Certificate and CMS modules, with additional work on student and employee reports.', ['React (Vite)', 'PHP MVC', 'YAK Framework', 'MySQL'], '#7C3AED', '#A855F7'],
  ['globe', 'Institutional Websites', 'Developed 30+ institutional websites using Next.js and Tailwind CSS.', ['Next.js', 'Tailwind CSS'], '#EC4899', '#F43F5E'],
  ['card', 'Accounts and Fee Management', 'Institutional fee ledgers, payment integrations and reports.', [], '#F97316', '#F59E0B'],
  ['award', 'Certificate Verification Portal', 'Certificate generation, QR validation and downloadable certificates.', [], '#14B8A6', '#22C55E'],
  ['cal', 'Event Management System', 'Event registration, scheduling and attendee workflows.', [], '#0EA5E9', '#6366F1'],
  ['truck', 'Transport and Route Management', 'Vehicle assignments, route scheduling and transport management.', [], '#F59E0B', '#EF4444']
];
document.getElementById('projectGrid').innerHTML = projects.map(([i, t, d, tags, c, c2]) => `
  <article class="card reveal" style="--c:${c};--c2:${c2}"><div>
    <div class="chip">${svg(i)}</div>
    <h3 class="font-display text-xl font-semibold mb-2">${t}</h3>
    <p class="text-slate-600 text-sm leading-relaxed">${d}</p>
    ${tags.length ? `<ul class="flex flex-wrap gap-2 mt-4">${tags.map(x => `<li class="text-xs px-2.5 py-1 rounded-full border" style="color:${c};border-color:${c}55;background:${c}12">${x}</li>`).join('')}</ul>` : ''}
  </div></article>`).join('');

// White Liquid Droplets Loader + Hero Entrance
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loaderBar');
const loaderCounter = document.getElementById('loaderCounter');

function startHeroEntrance() {
  if (window.gsap && window.ScrollTrigger && !reduced) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero-in', { y: 28, opacity: 0, duration: .8, stagger: .12 })
      .from('#stage', { y: 90, scale: .92, opacity: 0, duration: 1.2, ease: 'expo.out' }, .15)
      .from('.icon', { scale: 0, opacity: 0, duration: .6, stagger: .1, ease: 'back.out(2)' }, .85);
  }
}

if (loader) {
  if (reduced) {
    loader.style.display = 'none';
    startHeroEntrance();
  } else {
    let count = 0;
    const startTime = performance.now();
    const duration = 5000; // Exactly 5 seconds smooth load time

    function updateLoader(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Smooth natural cubic easing across 5 seconds
      const eased = progress < 0.7 
        ? (progress / 0.7) * 0.78 
        : 0.78 + Math.pow((progress - 0.7) / 0.3, 1.2) * 0.22;
      count = Math.min(100, Math.round(eased * 100));

      if (loaderBar) loaderBar.style.width = `${count}%`;
      if (loaderCounter) loaderCounter.textContent = `${count}%`;

      if (progress < 1) {
        requestAnimationFrame(updateLoader);
      } else {
        if (loaderCounter) loaderCounter.textContent = '100%';
        if (loaderBar) loaderBar.style.width = '100%';
        setTimeout(finishLoader, 150);
      }
    }
    requestAnimationFrame(updateLoader);

    function finishLoader() {
      if (window.gsap) {
        gsap.to('.loader-white-content', { scale: 0.94, opacity: 0, duration: 0.35, ease: 'power2.in' });
        gsap.to(loader, {
          opacity: 0,
          duration: 0.45,
          delay: 0.1,
          ease: 'power2.inOut',
          onComplete: () => {
            loader.classList.add('is-hidden');
            loader.remove();
            startHeroEntrance();
          }
        });
      } else {
        loader.classList.add('is-hidden');
        setTimeout(() => { loader.remove(); startHeroEntrance(); }, 500);
      }
    }
  }
}

// Scroll reveals
if (window.gsap && window.ScrollTrigger && !reduced) {
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll('.stat b').forEach(b => {
    const n = parseInt(b.textContent, 10), suf = b.textContent.replace(/\d+/, ''), o = { v: 0 };
    ScrollTrigger.create({ trigger: b, start: 'top 92%', once: true, onEnter: () => gsap.to(o, { v: n, duration: 1.4, ease: 'power2.out', onUpdate: () => { b.textContent = Math.round(o.v) + suf; } }) });
  });
  document.querySelectorAll('.reveal').forEach(el =>
    gsap.from(el, { y: 36, opacity: 0, duration: .8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }));
}

// Interactive 3D mouse tracking (Scene, Face tilt & Eye tracking) + Blinking
const stage = document.getElementById('stage'), scene = document.getElementById('scene');
const avatarLayer = document.getElementById('avatarLayer');
const pupilL = document.getElementById('pupilL'), pupilR = document.getElementById('pupilR');

// Natural Blinking & Winking
let blinkTimer = null;
function triggerBlink(isWink = false) {
  if (!avatarLayer) return;
  const cls = isWink ? 'is-winking' : 'is-blinking';
  avatarLayer.classList.add(cls);
  setTimeout(() => avatarLayer.classList.remove(cls), 120);
}
function scheduleNextBlink() {
  const delay = 3200 + Math.random() * 3200;
  blinkTimer = setTimeout(() => {
    triggerBlink();
    scheduleNextBlink();
  }, delay);
}
if (!reduced) scheduleNextBlink();

// Click / tap avatar to wink
if (avatarLayer) {
  avatarLayer.style.cursor = 'pointer';
  avatarLayer.addEventListener('click', () => triggerBlink(true));
}

// 3D Parallax & Eye pupil tracking
if (!reduced) {
  let targetSceneRx = 0, targetSceneRy = 0;
  let currentSceneRx = 0, currentSceneRy = 0;

  let targetFaceRx = 0, targetFaceRy = 0, targetFaceTx = 0, targetFaceTy = 0;
  let currentFaceRx = 0, currentFaceRy = 0, currentFaceTx = 0, currentFaceTy = 0;

  let targetPupilX = 0, targetPupilY = 0;
  let currentPupilX = 0, currentPupilY = 0;

  function updatePointer(clientX, clientY) {
    if (!stage || !scene) return;
    const r = stage.getBoundingClientRect();
    const scx = r.left + r.width * 0.5;
    const scy = r.top + r.height * 0.5;

    // Normalized screen delta relative to stage
    const nx = Math.max(-1.4, Math.min(1.4, (clientX - scx) / (window.innerWidth * 0.45)));
    const ny = Math.max(-1.4, Math.min(1.4, (clientY - scy) / (window.innerHeight * 0.45)));

    // Scene 3D tilt
    targetSceneRy = nx * 18;
    targetSceneRx = -ny * 14;

    // Face independent 3D tilt & shift
    targetFaceRy = nx * 9;
    targetFaceRx = -ny * 7;
    targetFaceTx = nx * 6;
    targetFaceTy = ny * 4;

    // Eye pupil tracking: vector from eye centers to mouse
    const eyeX = r.left + r.width * 0.5;
    const eyeY = r.top + r.height * 0.32;
    const dx = clientX - eyeX;
    const dy = clientY - eyeY;
    const angle = Math.atan2(dy, dx);
    const dist = Math.min(1, Math.hypot(dx, dy) / 140);

    const maxPupilX = 18.0; // Responsive, clearly visible SVG coordinate units
    const maxPupilY = 11.0;
    targetPupilX = Math.cos(angle) * dist * maxPupilX;
    targetPupilY = Math.sin(angle) * dist * maxPupilY;
  }

  // Smooth pointer tracking across hero, stage & window
  window.addEventListener('pointermove', e => {
    if (window.scrollY < window.innerHeight * 0.95) {
      updatePointer(e.clientX, e.clientY);
    }
  }, { passive: true });

  if (stage) {
    stage.addEventListener('pointermove', e => {
      updatePointer(e.clientX, e.clientY);
    }, { passive: true });
  }

  window.addEventListener('pointerleave', () => {
    targetSceneRx = 0; targetSceneRy = 0;
    targetFaceRx = 0; targetFaceRy = 0; targetFaceTx = 0; targetFaceTy = 0;
    targetPupilX = 0; targetPupilY = 0;
  });

  // Smooth 60 FPS animation loop (Lerp damping)
  function animate() {
    const ease = 0.085;
    currentSceneRx += (targetSceneRx - currentSceneRx) * ease;
    currentSceneRy += (targetSceneRy - currentSceneRy) * ease;

    currentFaceRx += (targetFaceRx - currentFaceRx) * ease;
    currentFaceRy += (targetFaceRy - currentFaceRy) * ease;
    currentFaceTx += (targetFaceTx - currentFaceTx) * ease;
    currentFaceTy += (targetFaceTy - currentFaceTy) * ease;

    currentPupilX += (targetPupilX - currentPupilX) * 0.14;
    currentPupilY += (targetPupilY - currentPupilY) * 0.14;

    if (scene) {
      scene.style.setProperty('--rx', `${currentSceneRx.toFixed(2)}deg`);
      scene.style.setProperty('--ry', `${currentSceneRy.toFixed(2)}deg`);
    }
    if (avatarLayer) {
      avatarLayer.style.setProperty('--face-rx', `${currentFaceRx.toFixed(2)}deg`);
      avatarLayer.style.setProperty('--face-ry', `${currentFaceRy.toFixed(2)}deg`);
      avatarLayer.style.setProperty('--face-tx', `${currentFaceTx.toFixed(2)}px`);
      avatarLayer.style.setProperty('--face-ty', `${currentFaceTy.toFixed(2)}px`);
    }
    if (pupilL && pupilR) {
      const px = currentPupilX.toFixed(2);
      const py = currentPupilY.toFixed(2);
      const svgXform = `translate(${px} ${py})`;
      pupilL.setAttribute('transform', svgXform);
      pupilR.setAttribute('transform', svgXform);
      pupilL.style.transform = `translate(${px}px, ${py}px)`;
      pupilR.style.transform = `translate(${px}px, ${py}px)`;
    }

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  // Card 3D tilt
  document.querySelectorAll('.card').forEach(c => {
    c.addEventListener('pointermove', e => {
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      c.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });
    c.addEventListener('pointerleave', () => { c.style.transform = ''; });
  });
}

// Scroll progress bar + active nav link
const bar = document.getElementById('progress');
const links = [...document.querySelectorAll('#menu a')];
const secs = links.map(a => document.querySelector(a.getAttribute('href')));
let ticking = false;
function onScroll() {
  const h = document.documentElement;
  bar.style.transform = `scaleX(${Math.min(1, scrollY / (h.scrollHeight - innerHeight || 1))})`;
  let cur = -1; secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top < innerHeight * .4) cur = i; });
  links.forEach((a, i) => a.classList.toggle('active', i === cur));
  ticking = false;
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();
