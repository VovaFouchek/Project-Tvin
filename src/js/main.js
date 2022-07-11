// Custom scripts

// Mobile menu burger
function burgerMenu() {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
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

// Fixed nav
let breakpoint = window.screen.width;
const getHeigthHeader = () => (window.screen.width >= 1024 ? (breakpoint = 45) : (breakpoint = 34));

getHeigthHeader();

const fixedNav = () => {
  const nav = document.querySelector('nav');
  const body = document.querySelector('body');
  if (window.scrollY >= breakpoint) {
    nav.classList.add('fixed__nav');
  } else {
    nav.classList.remove('fixed__nav');
  }
};

window.addEventListener('scroll', fixedNav);
window.addEventListener('resize', getHeigthHeader);
