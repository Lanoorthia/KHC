// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // Floating chat widget
  const fcMain = document.querySelector('.fc-main');
  const fcOptions = document.querySelector('.fc-options');
  if (fcMain && fcOptions) {
    fcMain.addEventListener('click', () => fcOptions.classList.toggle('open'));
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // Hero slider dots (decorative auto-cycle)
  const dots = document.querySelectorAll('.hero-dots span');
  if (dots.length) {
    let i = 0;
    setInterval(() => {
      dots.forEach(d => d.classList.remove('active'));
      i = (i + 1) % dots.length;
      dots[i].classList.add('active');
    }, 3000);
  }

  // Contact form (front-end demo submit)
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'ส่งข้อความแล้ว ✓';
      btn.style.background = '#4CAF50';
      contactForm.reset();
      setTimeout(() => { btn.textContent = original; btn.style.background = ''; }, 2500);
    });
  }
});
