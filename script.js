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
  ['layers', 'ERP modules', 'Building and maintaining modules for a college ERP software, including Certificate, CMS and reporting features.', '#2457D6', '#2457D6'],
  ['globe', 'Institutional websites', 'Developed 30+ institutional websites using Next.js and Tailwind CSS.', '#2457D6', '#2457D6'],
  ['cart', 'E-commerce customization', 'Customizing OpenCart storefronts, with payment gateway integrations.', '#2457D6', '#2457D6'],
  ['server', 'Servers and databases', 'Linux server operations, MySQL optimization and database backups.', '#2457D6', '#2457D6']
];
document.getElementById('serviceGrid').innerHTML = services.map(([i, t, d, c, c2]) => `
  <article class="svc reveal" style="--c:${c};--c2:${c2}"><div class="chip">${svg(i)}</div>
  <h3 class="font-display text-xl font-semibold mb-2">${t}</h3><p class="text-slate-600 text-sm leading-relaxed">${d}</p></article>`).join('');

// Skills
const skills = {
  'Frontend': [['React.js (Vite)', dev('react')], ['Next.js', dev('nextjs')], ['JavaScript', dev('javascript')], ['HTML5', dev('html5')], ['CSS3', dev('css3')], ['Tailwind CSS', dev('tailwindcss')], ['Bootstrap 5', dev('bootstrap')]],
  'Backend and data': [['PHP MVC', dev('php')], ['YAK Framework'], ['MySQL', dev('mysql')], ['REST APIs'], ['Authentication'], ['Payment gateway integrations']],
  'Tools and servers': [['Git/GitHub', dev('git')], ['Postman', dev('postman')], ['phpMyAdmin'], ['VS Code', dev('vscode')], ['Linux server administration', dev('linux')], ['Database backups']],
  'ERP domain': [['Admissions'], ['Fee and accounts'], ['Certificate verification'], ['TC and other certificates'], ['Event management'], ['Transport management']],
  'CMS and SEO': [['Custom CMS'], ['OpenCart'], ['Technical SEO']]
};
const code = codeIcon;
document.getElementById('skillPanel').innerHTML = Object.entries(skills).map(([name, list]) => `
  <div class="skillcat reveal"><h3>${name}</h3><div class="grid grid-cols-2 gap-2.5">${list.map(([n, src]) => `<div class="skill">${src ? `<img src="${src}" alt="" loading="lazy">` : code}<span>${n}</span></div>`).join('')}</div></div>`).join('');

// Projects
const projects = [
  ['layers', 'College ERP Software', 'Deployed across 30+ colleges and schools. My contribution: Certificate and CMS modules, with additional work on student and employee reports.', ['React (Vite)', 'PHP MVC', 'YAK Framework', 'MySQL'], '#2457D6', '#2457D6'],
  ['globe', 'Institutional Websites', '30+ college and institutional websites with server-side rendering, technical SEO and responsive layouts.', ['Next.js', 'Tailwind CSS', 'Technical SEO'], '#2457D6', '#2457D6'],
  ['card', 'Accounts and Fee Management', 'Institutional fee ledger with payment gateways, daily cash books and pending-fee tracking.', ['Razorpay', 'CCAvenue', 'PayPal', 'MySQL'], '#2457D6', '#2457D6'],
  ['award', 'Certificate Verification Portal', 'Certificate generation with unique codes, QR-based validation and downloadable PDF certificates.', ['PHP MVC', 'React (Vite)', 'QR Codes', 'PDF'], '#2457D6', '#2457D6'],
  ['cal', 'Event Management System', 'Online event registration, venue scheduling, pass generation and automated attendee notifications.', ['React (Vite)', 'PHP MVC', 'MySQL'], '#2457D6', '#2457D6'],
  ['truck', 'Transport and Route Management', 'Bus route scheduling, vehicle assignments and real-time status alerts for parents.', ['React (Vite)', 'PHP MVC', 'Geolocation API'], '#2457D6', '#2457D6']
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
      .from('.profile', { y: 24, opacity: 0, duration: .8, ease: 'power2.out' }, .2);
  }
}

if (loader) {
  if (reduced) {
    loader.style.display = 'none';
    startHeroEntrance();
  } else {
    let count = 0;
    const startTime = performance.now();
    const duration = 1800;

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

// Card hover tilt
if (!reduced && finePointer) document.querySelectorAll('.card').forEach(c => {
  c.addEventListener('pointermove', e => {
    const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    c.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
  });
  c.addEventListener('pointerleave', () => { c.style.transform = ''; });
});

// Scroll progress bar + active nav link
const bar = document.getElementById('progress');
const links = [...document.querySelectorAll('.drawer-link')];
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

// If the loader is missing, still start the intro
if (!loader) startHeroEntrance();
