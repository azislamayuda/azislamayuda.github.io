(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (selectEl) {
      if (all && Array.isArray(selectEl)) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else if (!all) {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Scrolls to window top with smooth behavior
   */
  const scrollto = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function() {
    select('#navbar')?.classList.toggle('navbar-mobile');
    this.classList.toggle('ri-menu-line');
    this.classList.toggle('ri-close-line');
  });

  /**
   * Scroll with offset on links with a class name .nav-link
   */
  on('click', '#navbar .nav-link', function(e) {
    const section = select(this.hash);
    if (section) {
      e.preventDefault();

      const navbar = select('#navbar');
      const header = select('#header');
      const sections = select('section', true);
      const navlinks = select('#navbar .nav-link', true);

      navlinks?.forEach((item) => {
        item.classList.remove('active');
      });

      this.classList.add('active');

      if (navbar?.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile');
        const navbarToggle = select('.mobile-nav-toggle');
        navbarToggle?.classList.toggle('ri-menu-line');
        navbarToggle?.classList.toggle('ri-close-line');
      }

      if (this.hash === '#header') {
        header?.classList.remove('header-top');
        sections?.forEach((item) => {
          item.classList.remove('section-show');
        });
        return;
      }

      if (header && !header.classList.contains('header-top')) {
        header.classList.add('header-top');
        setTimeout(() => {
          sections?.forEach((item) => {
            item.classList.remove('section-show');
          });
          section.classList.add('section-show');
        }, 350);
      } else {
        sections?.forEach((item) => {
          item.classList.remove('section-show');
        });
        section?.classList.add('section-show');
      }

      scrollto();
    }
  }, true);

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      const initial_nav = select(window.location.hash);

      if (initial_nav) {
        const header = select('#header');
        const navlinks = select('#navbar .nav-link', true);

        header?.classList.add('header-top');

        navlinks?.forEach((item) => {
          if (item.getAttribute('href') === window.location.hash) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });

        setTimeout(() => {
          initial_nav.classList.add('section-show');
        }, 350);

        scrollto();
      }
    }
  });

  /**
   * Skills animation using Waypoints
   */
  const skilsContent = select('.skills-content');
  if (skilsContent && typeof Waypoint !== 'undefined') {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: () => {
        const progress = select('.progress .progress-bar', true);
        progress?.forEach((el) => {
          el.style.width = `${el.getAttribute('aria-valuenow')}%`;
        });
      }
    });
  }

  /**
   * zQuotes slider using Swiper
   */
  if (select('.zquotes-slider') && typeof Swiper !== 'undefined') {
    new Swiper('.zquotes-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }
    });
  }

  /**
   * Portfolio Isotope layout and filter
   */
  window.addEventListener('load', () => {
    const portfolioContainer = select('.portfolio-container');
    if (portfolioContainer && typeof Isotope !== 'undefined') {
      const portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      const portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters?.forEach((el) => {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  if (select('.portfolio-lightbox') && typeof GLightbox !== 'undefined') {
    GLightbox({
      selector: '.portfolio-lightbox'
    });
  }

  /**
   * Initiate portfolio details lightbox
   */
  if (select('.portfolio-details-lightbox') && typeof GLightbox !== 'undefined') {
    GLightbox({
      selector: '.portfolio-details-lightbox',
      width: '90%',
      height: '90vh'
    });
  }

  /**
   * Portfolio details slider
   */
  if (select('.portfolio-details-slider') && typeof Swiper !== 'undefined') {
    new Swiper('.portfolio-details-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
  }

  /**
   * Initiate Pure Counter
   */
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  /**
   * Back to top button visibility and click handler
   */
  window.addEventListener('scroll', () => {
    const toTop = select('.zisToTop');
    if (!toTop) return;
    window.scrollY > 300 ? toTop.classList.add('show') : toTop.classList.remove('show');
  });

  on('click', '.zisToTop', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

})();