// =========================================================
// SYSEV — shared site behavior
// =========================================================

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const expanded = mobileNav.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // Render all lungta flag strings on the page
  document.querySelectorAll('.lungta .flags').forEach(renderLungtaFlags);

  // FAQ accordions
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item.open').forEach(o => { if (o !== item) o.classList.remove('open'); });
      item.classList.toggle('open', !isOpen);
    });
  });
});

// Renders a small string of triangular "prayer flags" as SVG —
// the signature motif, reused as battery/route markers.
function renderLungtaFlags(container) {
  const count = parseInt(container.dataset.count || '6', 10);
  const colors = ['#C8102E', '#F5A623', '#1B2A4A', '#E85D75', '#FAF6EF'];
  let svg = '';
  const w = 22, h = 30;
  for (let i = 0; i < count; i++) {
    const c = colors[i % colors.length];
    svg += `<svg width="${w}" height="${h}" viewBox="0 0 22 30" style="margin-left:${i===0?0:-4}px">
      <path d="M2 2 H20 L11 26 Z" fill="${c}" stroke="rgba(26,22,16,.15)" stroke-width="1"/>
      <line x1="2" y1="2" x2="20" y2="2" stroke="rgba(26,22,16,.25)" stroke-width="2"/>
    </svg>`;
  }
  container.innerHTML = svg;
}

// Simple range estimator used on the Scooters page
function initRangeCalc() {
  const form = document.getElementById('rangeCalc');
  if (!form) return;
  const output = document.getElementById('rangeCalcResult');
  form.addEventListener('input', () => {
    const daily = parseFloat(form.daily.value) || 0;
    const model = form.model.value;
    const ranges = { swift: 90, swift_plus: 120, urban: 70 };
    const fullRange = ranges[model] || 90;
    const chargesPerWeek = daily > 0 ? (daily * 7) / fullRange : 0;
    output.innerHTML = daily > 0
      ? `On a <strong>${model.replace('_',' ').toUpperCase()}</strong> with ${daily} km/day, you'd charge roughly <strong>${chargesPerWeek.toFixed(1)}×/week</strong> — about <strong>₹${Math.round(daily/fullRange*45)}</strong> in electricity per day at home rates.`
      : 'Enter your daily commute distance to see estimated charging frequency and cost.';
  });
}
document.addEventListener('DOMContentLoaded', initRangeCalc);
