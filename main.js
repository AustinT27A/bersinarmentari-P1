import './main.css'

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.querySelector('.navbar');
  const ctaButton = document.querySelector('.cta-button');

  // Carousel navigation - radio buttons only
  const radioButtons = document.querySelectorAll('input[name="position"]');
  const carousel = document.getElementById('carousel');

  // Update carousel position when radio buttons are clicked
  radioButtons.forEach((radio, index) => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        const position = index + 1;
        carousel.style.setProperty('--position', position);
        console.log('Carousel position updated to:', position);
      }
    });
  });

  // Simple hamburger menu
  console.log('Setting up hamburger menu...');
  console.log('Hamburger element:', hamburger);
  console.log('Nav menu element:', navMenu);

  function toggleMobileMenu() {
    console.log('Toggle menu called');
    if (hamburger && navMenu) {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      console.log('Menu toggled');
    }
  }

  // Add click event to hamburger
  if (hamburger) {
    hamburger.onclick = function() {
      console.log('Hamburger clicked!');
      toggleMobileMenu();
    };
  }

  // Close menu when clicking nav links
  navLinks.forEach(link => {
    link.onclick = function() {
      if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    };
  });


  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  ctaButton.addEventListener('click', () => {
    const gallerySection = document.querySelector('#gallery');
    const offsetTop = gallerySection.offsetTop - 70;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll('.gallery-item, .motif-card, .stat-item, .contact-item');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const region = item.getAttribute('data-region');
      const motifName = item.querySelector('h3').textContent;
      alert(`Anda memilih ${motifName} dari ${region}!\n\nBatik ini memiliki keunikan dan karakteristik tersendiri yang mencerminkan budaya daerah ${region}.`);
    });
  });

  const contactForm = document.querySelector('.contact-form');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;

    if (name && email && message) {
      alert(`Terima kasih ${name}!\n\nPesan Anda telah kami terima. Kami akan segera menghubungi Anda melalui email: ${email}`);
      contactForm.reset();
    }
  });

  const statNumbers = document.querySelectorAll('.stat-number');
  const animateCount = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + (target === 2009 ? '' : '+');
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + (target === 2009 ? '' : '+');
      }
    }, 20);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumber = entry.target;
        const targetText = statNumber.textContent;
        const target = parseInt(targetText.replace('+', ''));
        statNumber.textContent = '0';
        animateCount(statNumber, target);
        statsObserver.unobserve(statNumber);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => {
    statsObserver.observe(stat);
  });

  const createParallaxEffect = () => {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;

      if (heroContent && scrolled < hero.offsetHeight) {
        heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight);
      }
    });
  };

  createParallaxEffect();

  const motifCards = document.querySelectorAll('.motif-card');
  motifCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });


  console.log('%c🎨 Batik Nusantara Website', 'font-size: 20px; font-weight: bold; color: #8B4513;');
  console.log('%cMelestarikan Warisan Budaya Indonesia', 'font-size: 14px; color: #666;');
});
