// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== Mobile menu toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  }
});

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = document.getElementById('navbar').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== Hover effects are handled via CSS =====

// ===== Contact form handling =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  const serviceSelect = contactForm.querySelector('select[name="service"]');
  const serviceLabel = serviceSelect.selectedOptions[0] ? serviceSelect.selectedOptions[0].textContent : '';

  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const res = await fetch('https://formsubmit.co/ajax/seannbookmyer@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        _subject: 'New estimate request from the Bookmyer Excavating website',
        _template: 'table',
        _replyto: data.email || '',
        Name: data.name,
        Phone: data.phone,
        Email: data.email || '(not provided)',
        Service: serviceLabel || '(not selected)',
        Message: data.message || '(no message)',
      }),
    });
    if (!res.ok) throw new Error('Request failed');

    btn.textContent = 'Message Sent!';
    btn.style.backgroundColor = '#28a745';
    btn.style.borderColor = '#28a745';
    contactForm.reset();
  } catch (err) {
    btn.textContent = 'Error — please call (717) 804-7133';
    btn.style.backgroundColor = '#c0392b';
    btn.style.borderColor = '#c0392b';
  }

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.backgroundColor = '';
    btn.style.borderColor = '';
    btn.disabled = false;
  }, 4000);
});

// ===== Gallery Lightbox =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const galleryItems = document.querySelectorAll('.gallery-item img');
let currentIndex = 0;
const gallerySrcs = Array.from(galleryItems).map(img => img.src);

galleryItems.forEach((img, index) => {
  img.parentElement.addEventListener('click', () => {
    currentIndex = index;
    lightboxImg.src = gallerySrcs[currentIndex];
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox-prev').addEventListener('click', () => navigateLightbox(-1));
document.querySelector('.lightbox-next').addEventListener('click', () => navigateLightbox(1));

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigateLightbox(-1);
  if (e.key === 'ArrowRight') navigateLightbox(1);
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function navigateLightbox(dir) {
  currentIndex = (currentIndex + dir + gallerySrcs.length) % gallerySrcs.length;
  lightboxImg.src = gallerySrcs[currentIndex];
  lightboxImg.alt = galleryItems[currentIndex].alt;
}

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        link.style.color = '#D4A017';
      } else {
        link.style.color = '';
      }
    }
  });
});
