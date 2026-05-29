document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     GALLERY FILTER
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          // Reset inline styles for transition
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          
          setTimeout(() => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
              item.style.display = 'block'; // Or whatever your grid uses
              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
              }, 50);
            } else {
              item.style.display = 'none';
            }
          }, 300); // Wait for fade out
        });
      });
    });
  }

  /* ==========================================================================
     LIGHTBOX
     ========================================================================== */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    
    let currentVisibleItems = [];
    let currentIndex = 0;

    // Open Lightbox
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        // Find all currently visible items (based on filter)
        currentVisibleItems = Array.from(galleryItems).filter(el => el.style.display !== 'none');
        currentIndex = currentVisibleItems.indexOf(item);
        
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      });
    });

    // Update Content
    function updateLightboxContent() {
      if (currentVisibleItems.length === 0) return;
      const currentItem = currentVisibleItems[currentIndex];
      const img = currentItem.querySelector('img');
      
      lightboxImg.src = img.src;
      // Get title/location from the overlay if it exists, otherwise use alt
      const titleEl = currentItem.querySelector('.ps-title');
      const locEl = currentItem.querySelector('.ps-location');
      
      if (titleEl && locEl) {
        lightboxCaption.innerHTML = `<strong>${titleEl.innerText}</strong> - ${locEl.innerText}`;
      } else {
        lightboxCaption.innerText = img.alt || '';
      }
    }

    // Navigation
    function nextImg() {
      currentIndex = (currentIndex + 1) % currentVisibleItems.length;
      updateLightboxContent();
    }

    function prevImg() {
      currentIndex = (currentIndex - 1 + currentVisibleItems.length) % currentVisibleItems.length;
      updateLightboxContent();
    }

    // Event Listeners for controls
    nextBtn?.addEventListener('click', nextImg);
    prevBtn?.addEventListener('click', prevImg);
    closeBtn?.addEventListener('click', closeLightbox);
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImg();
      if (e.key === 'ArrowLeft') prevImg();
    });

    // Touch swipe support
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    lightbox.addEventListener('touchend', e => {
      let touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 50) nextImg();
      if (touchEndX > touchStartX + 50) prevImg();
    }, {passive: true});
  }
});
