// ============================================
// TERUI NEW ENERGY — Main JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Scroll Header ----
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    });
    // trigger on load
    header.classList.toggle('scrolled', window.scrollY > 60);
  }

  // ---- Mobile Nav Toggle ----
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // ---- Fade-up on scroll ----
  const faders = document.querySelectorAll('.fade-up');
  if (faders.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    faders.forEach(el => observer.observe(el));
  }

  // ---- Product Filter ----
  const catBtns = document.querySelectorAll('.cat-btn');
  const productCards = document.querySelectorAll('.product-card[data-category]');
  if (catBtns.length && productCards.length) {
    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.category;
        productCards.forEach(card => {
          if (cat === 'all' || card.dataset.category === cat) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ---- Contact Form (mailto fallback) ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(contactForm);
      const name = fd.get('name') || '';
      const company = fd.get('company') || '';
      const email = fd.get('email') || '';
      const product = fd.get('product') || '';
      const message = fd.get('message') || '';
      const subject = encodeURIComponent(`Inquiry from ${name} - ${company}`);
      const body = encodeURIComponent(`Name: ${name}\nCompany: ${company}\nEmail: ${email}\nProduct Interest: ${product}\n\nMessage:\n${message}`);
      window.location.href = `mailto:allen@teruifuse.com?subject=${subject}&body=${body}`;
      alert('Thank you for your inquiry! Your email client will open to send the message. If it doesn\'t, please email us directly at allen@teruifuse.com');
    });
  }

  // ---- Smooth anchor scrolling ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (navLinks) navLinks.classList.remove('open');
      }
    });
  });

});
