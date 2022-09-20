function tooglePopUp(hamburgerBtnSelector, popUpSelector, closePopUpBtnSelector) {
  const hamburgerBtn = document.querySelector(hamburgerBtnSelector);
  const popUp = document.querySelector(popUpSelector);
  const closePopUpBtn = document.querySelector(closePopUpBtnSelector);
  const techSupportBtn = document.querySelector('.technical__support-mobile');

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

    if (!itsPopUp && !itsHamburgerBtn && popUpIsActive && closePopUpBtn && !techSupportBtn) {
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

const linkTechSupportMobile = document.querySelector('#tech-support');

linkTechSupportMobile.addEventListener('click', event => {
  event.preventDefault();
  const techSupportBtn = document.querySelector('.technical__support-mobile');
  techSupportBtn.classList.toggle('active');
  document.querySelector('.support').classList.toggle('active');
});
