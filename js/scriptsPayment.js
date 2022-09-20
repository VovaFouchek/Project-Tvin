// Custom Scripts for Payment page
function burgerMenu() {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu__list');
  const body = document.querySelector('body');
  const menuItems = document.querySelectorAll('.menu__item-link');

  burger.addEventListener('click', () => {
    if (!menu.classList.contains('active')) {
      menu.classList.add('active');
      burger.classList.add('active-burger');
      body.classList.add('locked');

      for (const link of menuItems) {
        link.addEventListener('click', () => {
          menu.classList.remove('active');
          burger.classList.remove('active-burger');
          body.classList.remove('locked');
        });
      }
    } else {
      menu.classList.remove('active');
      burger.classList.remove('active-burger');
      body.classList.remove('locked');
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 991.98) {
      menu.classList.remove('active');
      burger.classList.remove('active-burger');
      body.classList.remove('locked');
    }
  });
}
burgerMenu();

function fixedHeaderFunc() {
  let breakpoint = window.screen.width;
  const getHeigthHeader = () => (window.screen.width >= 1024 ? (breakpoint = 45) : (breakpoint = 34));

  getHeigthHeader();

  const fixedHeader = () => {
    const nav = document.querySelector('.header');
    if (window.scrollY >= breakpoint) {
      nav.classList.add('fixed');
    } else {
      nav.classList.remove('fixed');
    }
  };

  window.addEventListener('scroll', fixedHeader);
  window.addEventListener('resize', getHeigthHeader);
}
fixedHeaderFunc();

function accordion() {
  const items = document.querySelectorAll('.accordion__item-trigger');
  items.forEach(item => {
    item.addEventListener('click', () => {
      const parent = item.parentNode;
      if (parent.classList.contains('accordion__item-active')) {
        parent.classList.remove('accordion__item-active');
      } else {
        document
          .querySelectorAll('.accordion__item')
          .forEach(child => child.classList.remove('accordion__item-active'));
        parent.classList.add('accordion__item-active');
      }
    });
  });
}
accordion();

function tooglePopUp(hamburgerBtnSelector, popUpSelector, closePopUpBtnSelector) {
  const hamburgerBtn = document.querySelector(hamburgerBtnSelector);
  const popUp = document.querySelector(popUpSelector);
  const closePopUpBtn = document.querySelector(closePopUpBtnSelector);

  const onScrollCloseModal = () => {
    const scrollY = window.scrollY;
    const ispopUpContainClassActive = popUp.classList.contains('active');
    if (scrollY > 34 && ispopUpContainClassActive) {
      hamburgerBtn.classList.remove('active');
      popUp.classList.remove('active');
    }
  };

  const toggleMenu = () => {
    hamburgerBtn.classList.toggle('active');
    popUp.classList.toggle('active');
  };

  hamburgerBtn.addEventListener('click', event => {
    event.stopPropagation();
    event.preventDefault();
    window.addEventListener('scroll', onScrollCloseModal);

    const popUpIsActive = popUp.classList.contains('active');
    const toggles = document.querySelectorAll('.toggle');
    const popUps = document.querySelectorAll('.popUp');

    if (!popUpIsActive) {
      toggles.forEach(toggle => toggle.classList.remove('active'));
      popUps.forEach(popUp => popUp.classList.remove('active'));
    }

    toggleMenu();
  });

  closePopUpBtn.addEventListener('click', event => {
    event.stopPropagation();
    event.preventDefault();
    toggleMenu();
    window.removeEventListener('scroll', onScrollCloseModal);
  });

  document.addEventListener('click', event => {
    const target = event.target;
    const itsPopUp = target == popUp || popUp.contains(target);
    const itsHamburgerBtn = target == hamburgerBtn;
    const popUpIsActive = popUp.classList.contains('active');

    if (!itsPopUp && !itsHamburgerBtn && popUpIsActive && closePopUpBtn) {
      toggleMenu();
      window.removeEventListener('scroll', onScrollCloseModal);
    }
  });
}

if (window.screen.width > 600) {
  tooglePopUp('.city__location', '.geo', '.geo__close');
  tooglePopUp('.technical__support', '.support', '.support__close');
} else {
  tooglePopUp('.city__location-mobile', '.geo', '.geo__close');
  tooglePopUp('.technical__support-mobile', '.support', '.support__close');
}
