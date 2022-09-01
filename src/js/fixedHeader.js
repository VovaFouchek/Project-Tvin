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
