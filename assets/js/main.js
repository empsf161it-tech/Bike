/* ============================================================
   BIKE STORE — Main JavaScript
   Navigation, Theme, RTL, GSAP Animations, Form Validation
   ============================================================ */

;(function () {
  'use strict';

  /* ── DOM References ───────────────────────────────── */
  const html = document.documentElement;
  const body = document.body;
  const navbar = document.querySelector('.navbar');
  const hamburgerBtn = document.querySelector('.navbar__hamburger');
  const drawer = document.querySelector('.drawer');
  const drawerOverlay = document.querySelector('.drawer-overlay');
  const drawerCloseBtn = document.querySelector('.drawer__close');
  const themeToggles = document.querySelectorAll('[data-theme-toggle]');
  const rtlToggles = document.querySelectorAll('[data-rtl-toggle]');

  /* ── Navbar Scroll Behavior ───────────────────────── */
  function initNavbar() {
    if (!navbar) return;

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });

    // Active page detection
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar__link, .drawer__link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /* ── Mobile Drawer ────────────────────────────────── */
  function initDrawer() {
    if (!hamburgerBtn || !drawer || !drawerOverlay) return;

    function openDrawer() {
      drawer.classList.add('active');
      drawerOverlay.classList.add('active');
      body.style.overflow = 'hidden';
      hamburgerBtn.setAttribute('aria-expanded', 'true');
    }

    function closeDrawer() {
      drawer.classList.remove('active');
      drawerOverlay.classList.remove('active');
      body.style.overflow = '';
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }

    hamburgerBtn.addEventListener('click', openDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);
    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', closeDrawer);
    }

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('active')) {
        closeDrawer();
      }
    });

    // Close drawer when link is clicked
    drawer.querySelectorAll('.drawer__link').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  /* ── Theme Toggle (Dark / Light) ──────────────────── */
  function initTheme() {
    // Detect saved preference or system preference
    const savedTheme = localStorage.getItem('bike-store-theme');
    if (savedTheme) {
      html.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
    }

    updateThemeIcons();

    themeToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('bike-store-theme', newTheme);
        updateThemeIcons();
      });
    });

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('bike-store-theme')) {
        html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        updateThemeIcons();
      }
    });
  }

  function updateThemeIcons() {
    const isDark = html.getAttribute('data-theme') === 'dark';
    themeToggles.forEach(toggle => {
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.className = isDark ? 'ri-sun-line' : 'ri-moon-line';
      }
    });
  }

  /* ── RTL Toggle ───────────────────────────────────── */
  function initRTL() {
    const savedDir = localStorage.getItem('bike-store-dir');
    if (savedDir) {
      html.setAttribute('dir', savedDir);
    }

    rtlToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const currentDir = html.getAttribute('dir') || 'ltr';
        const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
        html.setAttribute('dir', newDir);
        localStorage.setItem('bike-store-dir', newDir);
      });
    });
  }

  /* ── GSAP Scroll Animations ───────────────────────── */
  function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Reveal animations using fromTo for reliable visibility
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.fromTo(el, 
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        }
      );
    });

    gsap.utils.toArray('.reveal--left').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: -30 },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out'
        }
      );
    });

    gsap.utils.toArray('.reveal--right').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: 30 },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out'
        }
      );
    });

    gsap.utils.toArray('.reveal--scale').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.95 },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out'
        }
      );
    });

    // Stagger cards - trigger early at top 95%
    gsap.utils.toArray('.stagger-grid').forEach(grid => {
      const items = grid.children;
      gsap.fromTo(items,
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: grid,
            start: 'top 95%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out'
        }
      );
    });
  }


  /* ── Hero Animations ──────────────────────────────── */
  function initHeroAnimation() {
    if (typeof gsap === 'undefined') return;

    const heroBadge = document.querySelector('.hero__badge');
    const heroTitle = document.querySelector('.hero__title');
    const heroSubtitle = document.querySelector('.hero__subtitle');
    const heroActions = document.querySelector('.hero__actions');
    const heroStats = document.querySelector('.hero__stats');

    if (!heroTitle) return;

    const tl = gsap.timeline({ delay: 0.3 });

    if (heroBadge) {
      tl.from(heroBadge, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out'
      });
    }

    tl.from(heroTitle, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out'
    }, heroBadge ? '-=0.3' : 0);

    if (heroSubtitle) {
      tl.from(heroSubtitle, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.4');
    }

    if (heroActions) {
      tl.from(heroActions.children, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power3.out'
      }, '-=0.3');
    }

    if (heroStats) {
      tl.from(heroStats.children, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out'
      }, '-=0.2');
    }
  }

  /* ── Typing Effect ────────────────────────────────── */
  function initTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');
    typingElements.forEach(el => {
      const text = el.getAttribute('data-typing');
      const speed = parseInt(el.getAttribute('data-typing-speed') || '60', 10);
      el.textContent = '';
      let i = 0;

      // Create cursor
      const cursor = document.createElement('span');
      cursor.className = 'typing-cursor';
      el.parentNode.insertBefore(cursor, el.nextSibling);

      function typeChar() {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
          setTimeout(typeChar, speed);
        } else {
          // Remove cursor after a delay
          setTimeout(() => {
            cursor.style.display = 'none';
          }, 2000);
        }
      }

      // Use Intersection Observer to start typing when visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(typeChar, 500);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(el);
    });
  }

  /* ── Counter Animation ────────────────────────────── */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          const suffix = el.getAttribute('data-count-suffix') || '';
          const duration = 2000;
          const step = Math.ceil(target / (duration / 16));
          let current = 0;

          function update() {
            current += step;
            if (current >= target) {
              current = target;
              el.textContent = current.toLocaleString() + suffix;
              return;
            }
            el.textContent = current.toLocaleString() + suffix;
            requestAnimationFrame(update);
          }

          update();
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  /* ── Testimonials Carousel ────────────────────────── */
  function initCarousel() {
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.testimonials-track');
    const cards = carousel.querySelectorAll('.testimonial-card');
    const prevBtn = carousel.parentElement.querySelector('.carousel-btn--prev');
    const nextBtn = carousel.parentElement.querySelector('.carousel-btn--next');
    const dotsContainer = carousel.parentElement.querySelector('.carousel-dots');

    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    const totalSlides = cards.length;

    // Create dots
    if (dotsContainer) {
      cards.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Update dots
      if (dotsContainer) {
        dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === currentIndex);
        });
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex > 0 ? currentIndex - 1 : totalSlides - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex < totalSlides - 1 ? currentIndex + 1 : 0);
      });
    }

    // Auto-advance
    let autoPlay = setInterval(() => {
      goToSlide(currentIndex < totalSlides - 1 ? currentIndex + 1 : 0);
    }, 5000);

    carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
    carousel.addEventListener('mouseleave', () => {
      autoPlay = setInterval(() => {
        goToSlide(currentIndex < totalSlides - 1 ? currentIndex + 1 : 0);
      }, 5000);
    });

    // RTL support for carousel direction
    const dirObserver = new MutationObserver(() => {
      const dir = html.getAttribute('dir');
      if (dir === 'rtl') {
        track.style.transform = `translateX(${currentIndex * 100}%)`;
      } else {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
      }
    });
    dirObserver.observe(html, { attributes: true, attributeFilter: ['dir'] });
  }

  /* ── FAQ Accordion ────────────────────────────────── */
  function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion__item');
    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion__header');
      const bodyEl = item.querySelector('.accordion__body');
      const content = item.querySelector('.accordion__content');

      if (!header || !bodyEl) return;

      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all
        accordionItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherBody = otherItem.querySelector('.accordion__body');
          if (otherBody) otherBody.style.maxHeight = '0';
        });

        // Toggle current
        if (!isActive) {
          item.classList.add('active');
          bodyEl.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  }

  /* ── Form Validation ──────────────────────────────── */
  function initFormValidation() {
    const forms = document.querySelectorAll('[data-validate]');

    forms.forEach(form => {
      const inputs = form.querySelectorAll('.form-input[required], .form-input[data-validate-type]');
      const submitBtn = form.querySelector('[type="submit"], .btn--primary');
      const successMsg = form.querySelector('.form-success-msg');

      // Real-time validation
      inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
          if (input.classList.contains('error')) {
            validateField(input);
          }
        });
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        inputs.forEach(input => {
          if (!validateField(input)) {
            isValid = false;
          }
        });

        // Check terms checkbox
        const termsCheckbox = form.querySelector('[data-validate-terms]');
        if (termsCheckbox && !termsCheckbox.checked) {
          isValid = false;
          const errorEl = termsCheckbox.closest('.form-check')?.querySelector('.form-error') ||
                         termsCheckbox.parentElement.querySelector('.form-error');
          if (errorEl) {
            errorEl.textContent = 'You must accept the Terms & Conditions';
            errorEl.classList.add('visible');
          }
        }

        if (isValid) {
          // Show success
          if (successMsg) {
            successMsg.classList.add('visible');
            form.reset();
            inputs.forEach(input => {
              input.classList.remove('success', 'error');
            });

            setTimeout(() => {
              successMsg.classList.remove('visible');
            }, 5000);
          }
        }
      });
    });
  }

  function validateField(input) {
    const type = input.getAttribute('data-validate-type') || input.type;
    const value = input.value.trim();
    const errorEl = input.parentElement.querySelector('.form-error');
    let isValid = true;
    let errorMsg = '';

    // Required check
    if (input.hasAttribute('required') && value === '') {
      isValid = false;
      errorMsg = 'This field is required';
    }

    // Email validation
    if (isValid && type === 'email' && value !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMsg = 'Please enter a valid email address';
      }
    }

    // Password validation
    if (isValid && type === 'password' && value !== '') {
      if (value.length < 8) {
        isValid = false;
        errorMsg = 'Password must be at least 8 characters';
      }
    }

    // Confirm password
    if (isValid && input.getAttribute('data-validate-type') === 'confirm-password') {
      const passwordInput = input.closest('form').querySelector('input[type="password"]:not([data-validate-type="confirm-password"])');
      if (passwordInput && value !== passwordInput.value) {
        isValid = false;
        errorMsg = 'Passwords do not match';
      }
    }

    // Name validation
    if (isValid && input.getAttribute('data-validate-type') === 'name' && value !== '') {
      if (value.length < 2) {
        isValid = false;
        errorMsg = 'Name must be at least 2 characters';
      }
    }

    // Update UI
    input.classList.toggle('error', !isValid);
    input.classList.toggle('success', isValid && value !== '');

    if (errorEl) {
      errorEl.textContent = errorMsg;
      errorEl.classList.toggle('visible', !isValid);
    }

    return isValid;
  }

  /* ── Countdown Timer ──────────────────────────────── */
  function initCountdown() {
    const countdownEl = document.querySelector('.countdown');
    if (!countdownEl) return;

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30); // 30 days from now

    const daysEl = countdownEl.querySelector('[data-countdown-days]');
    const hoursEl = countdownEl.querySelector('[data-countdown-hours]');
    const minutesEl = countdownEl.querySelector('[data-countdown-minutes]');
    const secondsEl = countdownEl.querySelector('[data-countdown-seconds]');

    function updateCountdown() {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minutesEl) minutesEl.textContent = '00';
        if (secondsEl) secondsEl.textContent = '00';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ── Parallax Effect ──────────────────────────────── */
  function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax') || '0.5');
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });
    }, { passive: true });
  }

  /* ── Smooth Scroll for Anchor Links ───────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const navHeight = navbar ? navbar.offsetHeight : 0;
          const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /* ── Lazy Loading Images ──────────────────────────── */
  function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) return; // Native support

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => observer.observe(img));
  }

  /* ── Newsletter Form ──────────────────────────────── */
  function initNewsletter() {
    const newsletterForms = document.querySelectorAll('.footer__newsletter, .coming-soon__form');
    newsletterForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (input && input.value.trim() !== '') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailRegex.test(input.value.trim())) {
            input.value = '';
            input.placeholder = 'Subscribed successfully!';
            input.classList.add('success');
            setTimeout(() => {
              input.placeholder = 'Enter your email';
              input.classList.remove('success');
            }, 3000);
          }
        }
      });
    });
  }

  /* ── Back to Top Button ───────────────────────────── */
  function initBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '<i class="ri-arrow-up-line"></i>';
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ── Initialize Everything ────────────────────────── */
  function init() {
    initNavbar();
    initDrawer();
    initTheme();
    initRTL();
    initSmoothScroll();
    initLazyLoading();
    initParallax();
    initCarousel();
    initAccordion();
    initFormValidation();
    initCountdown();
    initCounters();
    initTypingEffect();
    initNewsletter();
    initBackToTop();

    // GSAP animations (wait for GSAP to load)
    if (typeof gsap !== 'undefined') {
      initHeroAnimation();
      initScrollAnimations();
    } else {
      // Fallback: make reveal elements visible
      document.querySelectorAll('.reveal, .reveal--left, .reveal--right, .reveal--scale').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
