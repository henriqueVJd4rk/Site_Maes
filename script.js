/* ─── CUSTOM CURSOR ─── */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
 
document.addEventListener('mousemove', e => {
  cursor.style.left     = e.clientX + 'px';
  cursor.style.top      = e.clientY + 'px';
  cursorRing.style.left = e.clientX + 'px';
  cursorRing.style.top  = e.clientY + 'px';
});
 
// Scale cursor ring on hover of interactive elements
document.querySelectorAll('a, button, .photo-card, .lightbox-close').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorRing.style.width  = '60px';
    cursorRing.style.height = '60px';
    cursorRing.style.borderColor = 'var(--rose)';
  });
  el.addEventListener('mouseleave', () => {
    cursorRing.style.width  = '36px';
    cursorRing.style.height = '36px';
    cursorRing.style.borderColor = 'var(--rose-soft)';
  });
});
 
/* ─── FLOATING PETALS ─── */
const petalsContainer = document.getElementById('petals');
const petalSizes      = [[8,14],[10,17],[12,20],[7,12]];
for (let i = 0; i < 28; i++) {
  const p    = document.createElement('div');
  const [w,h]= petalSizes[i % petalSizes.length];
  p.className = 'petal';
  Object.assign(p.style, {
    left:              Math.random() * 100 + 'vw',
    width:             (w + Math.random() * 5) + 'px',
    height:            (h + Math.random() * 5) + 'px',
    animationDuration: (10 + Math.random() * 14) + 's',
    animationDelay:    -(Math.random() * 24) + 's',
    borderRadius:      (Math.random() > 0.5) ? '50% 0 50% 0' : '0 50% 0 50%',
  });
  petalsContainer.appendChild(p);
}
 
/* ─── LIGHTBOX ─── */
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
 
function openLight(card) {
  const src = card.querySelector('img').src;
  lightboxImg.src = src;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLight(e) {
  if (!e || e.target !== lightboxImg) {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLight();
});
 
/* ─── SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll('.photo-card, .dedication-inner, .section-label');
const observer  = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.classList.add('visible');
      observer.unobserve(en.target);
    }
  });
}, { threshold: 0.08 });
 
revealEls.forEach((el, i) => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(48px)';
  el.style.transition = `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 0.07}s,
                          transform 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 0.07}s`;
  observer.observe(el);
});
 
// "visible" class triggers the transition
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);
});
 
/* ─── PARALLAX HERO TEXT ─── */
const heroTitle = document.querySelector('.hero-title');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (heroTitle) {
    heroTitle.style.transform = `translateY(${y * 0.25}px)`;
    heroTitle.style.opacity   = Math.max(0, 1 - y / 500);
  }
}, { passive: true });