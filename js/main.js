document.addEventListener('DOMContentLoaded', () => {
  // Prevent Image Downloading & Copying
  document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });

  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });

  /* ==========================================================================
     HEADER SCROLL EFFECT
     ========================================================================== */
  const header = document.querySelector('.site-header');
  const scrollBtn = document.querySelector('.scroll-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      scrollBtn?.classList.add('visible');
    } else {
      scrollBtn?.classList.remove('visible');
    }
  });

  /* ==========================================================================
     MOBILE MENU TOGGLE
     ========================================================================== */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const body = document.body;

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      body.classList.toggle('mobile-menu-active');
      const icon = mobileToggle.querySelector('i');
      if (body.classList.contains('mobile-menu-active')) {
        icon.classList.replace('fa-bars', 'fa-times');
      } else {
        icon.classList.replace('fa-times', 'fa-bars');
      }
    });
  }

  // Close mobile menu on link click
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      body.classList.remove('mobile-menu-active');
      const icon = mobileToggle?.querySelector('i');
      if (icon) icon.classList.replace('fa-times', 'fa-bars');
    });
  });

  /* ==========================================================================
     SCROLL REVEAL (Intersection Observer)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');
  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  /* ==========================================================================
     NUMBER COUNTER ANIMATION
     ========================================================================== */
  const counters = document.querySelectorAll('.trust-number[data-target]');
  const counterOptions = { threshold: 0.5 };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        const duration = 2000; // ms
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            entry.target.innerText = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            // Include symbols if they exist in original text like + or %
            const suffix = entry.target.getAttribute('data-suffix') || '';
            entry.target.innerText = target + suffix;
          }
        };

        updateCounter();
        observer.unobserve(entry.target);
      }
    });
  }, counterOptions);

  counters.forEach(counter => counterObserver.observe(counter));

  /* ==========================================================================
     SCROLL TO TOP
     ========================================================================== */
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // WhatsApp Form Logic
  const waForms = document.querySelectorAll('.whatsapp-form');
  waForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = this.querySelector('[name="name"]') ? this.querySelector('[name="name"]').value : '';
      const phone = this.querySelector('[name="phone"]') ? this.querySelector('[name="phone"]').value : '';
      const service = this.querySelector('[name="service"]') ? this.querySelector('[name="service"]').value : 'General Inquiry';
      const message = this.querySelector('[name="message"]') ? this.querySelector('[name="message"]').value : '';
      
      const text = `Hello Gabbarwali Marble Stone,\n\nI have an inquiry:\n*Name:* ${name}\n*Phone:* ${phone}\n*Interested In:* ${service}\n*Message:* ${message}`;
      const encodedText = encodeURIComponent(text);
      const whatsappUrl = `https://wa.me/919998914607?text=${encodedText}`;
      
      window.open(whatsappUrl, '_blank');
    });
  });

  // LIGHTBOX LOGIC
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <img class="lightbox-img" src="" alt="Lightbox Image">
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxClose = lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('.masonry-item img, .gallery-item img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', (e) => {
      lightboxImg.src = e.target.src.replace('/q_auto,f_auto,w_500/', '/q_auto,f_auto/'); // fetch full res if needed
      lightbox.classList.add('active');
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });
  
  lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
      lightbox.classList.remove('active');
    }
  });

});
