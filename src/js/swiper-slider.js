const swiper = new Swiper('.image-slider', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // Count preview slides
  slidesPerView: 2.5,

  // Padding between the slider
  spaceBetween: 40,

  // Active slide will be centered without adding gaps at the beginning and end of slider
  centeredSlides: true,

  // Auto Heigth
  autoHeigth: true,

  // Disabling functionality if there are fewer slides than needed
  watchOverflow: true,

  // Accept mouse events like touch events (click and drag to change slides)
  simulateTouch: true,

  // "Grab" cursor, when hover on Swiper
  grabCursor: true,

  // Speed
  speed: 1000,

  // Autoplay
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },

  // Breakpoints
  breakpoints: {
    2100: {
      slidesPerView: 3.5,
    },
    1920: {
      slidesPerView: 2.5,
    },
    600: {
      slidesPerView: 2.5,
      speed: 1300,
    },
    320: {
      slidesPerView: 1,
      centeredSlides: false,
    },

    // Stop autoplay, when mouse on slider
    on: {
      init() {
        this.el.addEventListener('mouseenter', () => {
          this.autoplay.stop();
        });

        this.el.addEventListener('mouseleave', () => {
          this.autoplay.start();
        });
      },
    },

    // Accessibility
    a11y: {
      enabled: true,
      prevSlideMessage: 'Попередній слайд',
      nextSlideMessage: 'Наступний слайд',
      notificationClass: 'swiper-notification',
    },
  },
});
