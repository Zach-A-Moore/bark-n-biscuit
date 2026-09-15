/* Bark 'n' Biscuit - Interactive Application JS */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initBakeryFilter();
  initGroomingCalculator();
  initFAQAccordion();
  initContactModal();
  initBeforeAfterGallery();
  initSmoothScroll();
});

/* 1. Mobile Menu */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('close-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('translate-x-full');
    });
  }

  if (closeBtn && mobileMenu) {
    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.add('translate-x-full');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.add('translate-x-full');
    });
  });
}

/* 2. Bakery Product Filtering & Modal */
function initBakeryFilter() {
  const filterBtns = document.querySelectorAll('#bakery .tab-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('tab-active'));
      btn.classList.add('tab-active');

      const category = btn.getAttribute('data-category');

      productCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* 3. Grooming Interactive Price Calculator */
function initGroomingCalculator() {
  const sizeSelect = document.getElementById('calc-size');
  const coatSelect = document.getElementById('calc-coat');
  const serviceType = document.getElementById('calc-service');
  const addOnCheckboxes = document.querySelectorAll('.addon-checkbox');
  
  const baseCostEl = document.getElementById('calc-base-cost');
  const addonsCostEl = document.getElementById('calc-addons-cost');
  const totalCostEl = document.getElementById('calc-total-cost');
  const sizeLabelEl = document.getElementById('calc-size-label');
  const selectedAddonsListEl = document.getElementById('calc-selected-addons');

  if (!sizeSelect || !totalCostEl) return;

  // Base price matrix
  // [service][size][coat]
  const prices = {
    full: {
      small: { short: 55, medium: 60, long: 65, doodle: 75 },
      medium: { short: 70, medium: 75, long: 85, doodle: 95 },
      large: { short: 90, medium: 100, long: 110, doodle: 125 },
      xlarge: { short: 115, medium: 130, long: 140, doodle: 160 }
    },
    bath: {
      small: { short: 35, medium: 40, long: 45, doodle: 50 },
      medium: { short: 45, medium: 50, long: 55, doodle: 65 },
      large: { short: 60, medium: 70, long: 75, doodle: 85 },
      xlarge: { short: 80, medium: 90, long: 95, doodle: 110 }
    },
    express: {
      small: { short: 25, medium: 25, long: 30, doodle: 30 },
      medium: { short: 30, medium: 30, long: 35, doodle: 35 },
      large: { short: 40, medium: 40, long: 45, doodle: 45 },
      xlarge: { short: 50, medium: 50, long: 55, doodle: 55 }
    }
  };

  const sizeNames = {
    small: 'Small Dog (< 20 lbs)',
    medium: 'Medium Dog (20 - 50 lbs)',
    large: 'Large Dog (50 - 80 lbs)',
    xlarge: 'Extra Large (80+ lbs)'
  };

  function updateCalculator() {
    const size = sizeSelect.value;
    const coat = coatSelect.value;
    const service = serviceType.value;

    let base = prices[service][size][coat] || 50;
    let addonsTotal = 0;
    let chosenAddons = [];

    addOnCheckboxes.forEach(cb => {
      if (cb.checked) {
        const val = parseFloat(cb.value) || 0;
        addonsTotal += val;
        chosenAddons.push({ name: cb.getAttribute('data-name'), price: val });
      }
    });

    const grandTotal = base + addonsTotal;

    baseCostEl.textContent = `$${base}`;
    addonsCostEl.textContent = `$${addonsTotal}`;
    totalCostEl.textContent = `$${grandTotal}`;
    sizeLabelEl.textContent = sizeNames[size];

    if (chosenAddons.length === 0) {
      selectedAddonsListEl.innerHTML = `<span class="text-stone-400 italic text-xs">No add-ons selected</span>`;
    } else {
      selectedAddonsListEl.innerHTML = chosenAddons
        .map(item => `<span class="inline-flex items-center gap-1 bg-warm-bg text-charcoal border border-stone-border px-2 py-0.5 rounded-xs text-[11px] font-mono">✓ ${item.name} (+$${item.price})</span>`)
        .join(' ');
    }
  }

  sizeSelect.addEventListener('change', updateCalculator);
  coatSelect.addEventListener('change', updateCalculator);
  serviceType.addEventListener('change', updateCalculator);
  addOnCheckboxes.forEach(cb => cb.addEventListener('change', updateCalculator));

  // Initial calculation
  updateCalculator();
}

/* 4. FAQ Accordion */
function initFAQAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items
        accordionItems.forEach(i => i.classList.remove('active'));

        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* 5. Contact & Booking Inquiry Modal */
function initContactModal() {
  const openBtns = document.querySelectorAll('.open-contact-modal');
  const closeBtn = document.getElementById('close-modal-btn');
  const modal = document.getElementById('contact-modal');
  const form = document.getElementById('inquiry-form');
  const formSuccess = document.getElementById('form-success-msg');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const preselectService = btn.getAttribute('data-service');
      if (preselectService) {
        const serviceSelect = document.getElementById('inquiry-service');
        if (serviceSelect) serviceSelect.value = preselectService;
      }
      if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simulate form submission
      form.style.display = 'none';
      if (formSuccess) {
        formSuccess.classList.remove('hidden');
      }
      setTimeout(() => {
        if (modal) {
          modal.classList.add('hidden');
          document.body.style.overflow = 'auto';
          // Reset form after closing
          setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            if (formSuccess) formSuccess.classList.add('hidden');
          }, 400);
        }
      }, 3500);
    });
  }
}

/* 6. Before / After Interactive Gallery */
function initBeforeAfterGallery() {
  const filterBtns = document.querySelectorAll('#transformations .tab-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('tab-active'));
      btn.classList.add('tab-active');

      const tag = btn.getAttribute('data-tag');

      galleryItems.forEach(item => {
        const itemTag = item.getAttribute('data-tag');
        if (tag === 'all' || itemTag === tag) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* 7. Smooth Scroll for Nav Links */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* Helper to copy phone or email to clipboard */
function copyToClipboard(text, element) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = element.innerHTML;
    element.innerHTML = '✓ Copied!';
    element.classList.add('bg-emerald-600', 'text-white');
    setTimeout(() => {
      element.innerHTML = originalText;
      element.classList.remove('bg-emerald-600', 'text-white');
    }, 2000);
  });
}
