/* =========================================================
   Kaviyarasan T — Portfolio
   script.js
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. LOADING SCREEN
  --------------------------------------------------------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loader) loader.classList.add('hidden');
    }, 600);
  });

  /* ---------------------------------------------------------
     2. FOOTER YEAR
  --------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     3. THEME TOGGLE (dark / light) + localStorage persistence
  --------------------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('kavidev-theme');

  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      localStorage.setItem('kavidev-theme', next);
    });
  }

  /* ---------------------------------------------------------
     4. NAVBAR: scrolled state
  --------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const onScrollNav = () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  /* ---------------------------------------------------------
     5. MOBILE HAMBURGER MENU
  --------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  const closeMenu = () => {
    if (!hamburger || !navLinks) return;
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  };

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('no-scroll', isOpen);
    });
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------------------------------------------------------
     6. SCROLLSPY: highlight active nav link
  --------------------------------------------------------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link[data-nav]');

  const setActiveLink = () => {
    let currentId = '';
    const scrollPos = window.scrollY + window.innerHeight * 0.35;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinkEls.forEach(link => {
      const isMatch = link.getAttribute('href') === `#${currentId}`;
      link.classList.toggle('active', isMatch);
    });
  };
  setActiveLink();
  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ---------------------------------------------------------
     7. TYPED ROLE ANIMATION
  --------------------------------------------------------- */
  const typedRoleEl = document.getElementById('typedRole');
  const roles = [
    'Full Stack Developer',
    'Java Developer',
    'React Developer',
    'Problem Solver'
  ];

  if (typedRoleEl) {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
      const currentRole = roles[roleIndex];

      if (!deleting) {
        charIndex++;
        typedRoleEl.textContent = currentRole.slice(0, charIndex);
        if (charIndex === currentRole.length) {
          deleting = true;
          setTimeout(type, 1600);
          return;
        }
        setTimeout(type, 70);
      } else {
        charIndex--;
        typedRoleEl.textContent = currentRole.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(type, 300);
          return;
        }
        setTimeout(type, 35);
      }
    };

    type();
  }

  /* ---------------------------------------------------------
     8. SCROLL REVEAL ANIMATIONS
  --------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------------------------------------------------------
     9. SKILL BAR FILL ANIMATION
  --------------------------------------------------------- */
  const skillItems = document.querySelectorAll('.skill-item');

  if ('IntersectionObserver' in window) {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const item = entry.target;
          const level = item.getAttribute('data-level') || '0';
          const fill = item.querySelector('.skill-fill');
          if (fill) {
            requestAnimationFrame(() => {
              fill.style.width = `${level}%`;
            });
          }
          observer.unobserve(item);
        }
      });
    }, { threshold: 0.3 });

    skillItems.forEach(item => skillObserver.observe(item));
  } else {
    skillItems.forEach(item => {
      const level = item.getAttribute('data-level') || '0';
      const fill = item.querySelector('.skill-fill');
      if (fill) fill.style.width = `${level}%`;
    });
  }

  /* ---------------------------------------------------------
     10. PROJECT FILTERING
  --------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-cat');
        const show = filter === 'all' || filter === cat;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---------------------------------------------------------
     11. RIPPLE EFFECT ON BUTTONS
  --------------------------------------------------------- */
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);

      ripple.className = 'ripple-effect';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

      this.style.position = this.style.position || 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);

      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  /* ---------------------------------------------------------
     12. CUSTOM CURSOR (desktop only)
  --------------------------------------------------------- */
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  if (cursorDot && cursorRing && !isTouchDevice) {
    let ringX = 0, ringY = 0, dotX = 0, dotY = 0;
    let targetX = 0, targetY = 0;

    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      cursorDot.style.transform = `translate(${targetX}px, ${targetY}px)`;
    });

    const animateRing = () => {
      ringX += (targetX - ringX) * 0.15;
      ringY += (targetY - ringY) * 0.15;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(animateRing);
    };
    requestAnimationFrame(animateRing);

    const interactiveEls = document.querySelectorAll('a, button, input, textarea, .project-card, .mini-card');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
    });
  } else {
    if (cursorDot) cursorDot.style.display = 'none';
    if (cursorRing) cursorRing.style.display = 'none';
  }

  /* ---------------------------------------------------------
     13. BACKGROUND PARTICLES CANVAS
  --------------------------------------------------------- */
  const canvas = document.getElementById('particles');

  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let width, height;
    const PARTICLE_COUNT = 60;
    const MAX_DIST = 140;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5
      }));
    };

    const getAccentColor = () => {
      const styles = getComputedStyle(document.documentElement);
      return (styles.getPropertyValue('--accent') || '#22d3b0').trim();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const accent = getAccentColor();

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.5;
        ctx.fill();
      });

      ctx.globalAlpha = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DIST) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = accent;
            ctx.globalAlpha = (1 - dist / MAX_DIST) * 0.15;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      requestAnimationFrame(draw);
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    resize();
    createParticles();
    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    if (!prefersReducedMotion) {
      requestAnimationFrame(draw);
    }
  }

  /* ---------------------------------------------------------
     14. SCROLL-TO-TOP BUTTON
  --------------------------------------------------------- */
  const scrollTopBtn = document.getElementById('scrollTop');

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------------------------------------------------
     15. RESUME DOWNLOAD BUTTON
  --------------------------------------------------------- */
  const resumeBtn = document.getElementById('resumeBtn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
      // Replace '#' with an actual resume file path/URL when available.
      if (resumeBtn.getAttribute('href') === '#') {
        e.preventDefault();
        console.warn('Add your resume file path to the "href" and "download" attributes on #resumeBtn.');
      }
    });
  }

  /* ---------------------------------------------------------
     16. CONTACT FORM VALIDATION
  --------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    const fields = {
      name: {
        input: document.getElementById('name'),
        error: document.getElementById('nameError'),
        validate: (val) => val.trim().length >= 2 || 'Please enter your name (min 2 characters).'
      },
      email: {
        input: document.getElementById('email'),
        error: document.getElementById('emailError'),
        validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) || 'Please enter a valid email address.'
      },
      subject: {
        input: document.getElementById('subject'),
        error: document.getElementById('subjectError'),
        validate: (val) => val.trim().length >= 3 || 'Please enter a subject (min 3 characters).'
      },
      message: {
        input: document.getElementById('message'),
        error: document.getElementById('messageError'),
        validate: (val) => val.trim().length >= 10 || 'Message should be at least 10 characters long.'
      }
    };

    const formStatus = document.getElementById('formStatus');

    const validateField = (field) => {
      const { input, error, validate } = field;
      if (!input) return true;
      const result = validate(input.value);

      if (result === true) {
        input.classList.remove('invalid');
        if (error) error.textContent = '';
        return true;
      } else {
        input.classList.add('invalid');
        if (error) error.textContent = result;
        return false;
      }
    };

    Object.values(fields).forEach(field => {
      if (!field.input) return;
      field.input.addEventListener('blur', () => validateField(field));
      field.input.addEventListener('input', () => {
        if (field.input.classList.contains('invalid')) validateField(field);
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const results = Object.values(fields).map(validateField);
      const isValid = results.every(Boolean);

      if (!isValid) {
        if (formStatus) {
          formStatus.textContent = 'Please fix the highlighted fields above.';
          formStatus.style.color = '#ff6b6b';
        }
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      if (formStatus) {
        formStatus.textContent = 'Sending message...';
        formStatus.style.color = '';
      }

      // Simulated submission — replace with a real endpoint (fetch/EmailJS/Formspree, etc.)
      setTimeout(() => {
        if (formStatus) {
          formStatus.textContent = "Thanks! Your message has been sent — I'll get back to you soon.";
          formStatus.style.color = '#22d3b0';
        }
        contactForm.reset();
        Object.values(fields).forEach(field => {
          if (field.input) field.input.classList.remove('invalid');
          if (field.error) field.error.textContent = '';
        });
        if (submitBtn) submitBtn.disabled = false;
      }, 900);
    });
  }

});