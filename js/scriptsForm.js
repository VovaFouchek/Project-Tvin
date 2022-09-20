// Custom Scripts for Form pages
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

const form = document.querySelector('form');
const inner = document.querySelector('.inner');
const loader = document.querySelector('.lds-roller');
const inputs = document.querySelectorAll('input');

// need to change
// const url = 'https://jsonplaceholder.typicode.com/post';

const statusLoading = () => {
  loader.classList.add('active');
  form.classList.add('disabled');
};

const statusFailure = () => {
  const messageFailure = 'Ой, халепа. Будь ласка, спробуйте ще раз';
  loader.classList.remove('active');
  form.classList.remove('disabled');
  const statusMessage = document.createElement('div');
  statusMessage.classList.add('status');
  form.appendChild(statusMessage);
  statusMessage.textContent = messageFailure;
};

const statusSuccess = () => {
  loader.classList.remove('active');
  const statusSuccessMessage = document.createElement('div');
  statusSuccessMessage.classList.add('.successPopUp');
  document.querySelector('.successPopUp').classList.add('success');
  inner.appendChild(statusSuccessMessage);
  document.querySelector('.form__wrap').classList.add('disabled');
};

const message = {
  loading: statusLoading,
  success: statusSuccess,
  failure: statusFailure,
};

const clearValues = () => {
  document.querySelector('#contact-method').value = '';
  inputs.forEach(item => {
    item.value = '';
  });
};

const handleSubmit = event => {
  event.preventDefault();
  message.loading();
  const userName = document.querySelector('#name').value;
  const userAddress = document.querySelector('#address').value;
  const userContact = document.querySelector('#contact').value;
  const userContactMethod = document.querySelector('#contact-method').value;

  const personalData = {
    name: userName,
    address: userAddress,
    contact: userContact,
    contact_method: userContactMethod,
  };

  addInfoToDatabase(personalData);
};

const addInfoToDatabase = async personalData => {
  const fetchData = {
    method: 'POST',
    body: JSON.stringify(personalData),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await fetch(url, fetchData).then(response => {
      if (response.ok) {
        message.success();
      } else {
        throw new Error(error);
      }
    });
    return response;
  } catch (error) {
    message.failure();
    setTimeout(() => document.querySelector('.status').remove(), 5000);
    throw new Error(error);
  } finally {
    clearValues();
  }
};

form.addEventListener('submit', handleSubmit);
