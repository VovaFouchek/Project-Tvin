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
