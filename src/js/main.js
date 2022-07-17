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

// Readmore
let readMoreLess = function () {
  if (!Element.prototype.closest) {
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
    Element.prototype.closest = function (s) {
      let el = this;
      let ancestor = this;
      if (!document.documentElement.contains(el)) return null;
      do {
        if (ancestor.matches(s)) return ancestor;
        ancestor = ancestor.parentElement;
      } while (ancestor !== null);
      return null;
    };
  }
  // Settings
  let settings = {
    speed: 300,
    activeClass: 'is-active',
    selector: '[data-more]',
    selectorFooter: '[data-more-footer]',
    selectorTrigger: '[data-more-trigger]',
    selectorContent: '[data-more-content]',
  };

  //
  // Methods
  //

  // Show
  let show = function (trigger, target, parent) {
    // Get the natural height of the element
    let getHeight = function () {
      let height = target.scrollHeight + 'px'; // Get it's height
      return height;
    };

    let height = getHeight(); // Get the natural height
    parent.classList.add(settings.activeClass); // Add active class to the parent element
    target.style.height = height; // Update the max-height

    // Update the text
    let textLess = trigger.dataset.moreTextLess;
    trigger.textContent = textLess;

    // Once the transition is complete, remove the inline max-height so the content can scale responsively
    window.setTimeout(function () {
      target.style.height = '';
    }, settings.speed);
  };

  // Hide
  let hide = function (trigger, target, parent) {
    let heightDefined = target.dataset.moreHeight;

    // Give the element a height to change from
    target.style.height = target.scrollHeight + 'px';
    parent.classList.remove(settings.activeClass); // Remove active class to the parent element

    // Update the text
    let textMore = trigger.dataset.moreTextMore;
    trigger.textContent = textMore;

    // Set the height back to defined height
    window.setTimeout(function () {
      target.style.height = heightDefined + 'px';
    }, 1);
  };

  // Toggle
  let toggleContent = function (event, trigger) {
    // Variables
    let parent = event.target.closest(settings.selector),
      target = parent.querySelector(settings.selectorContent);

    // If the element is visible, hide it
    if (parent.classList.contains(settings.activeClass)) {
      hide(trigger, target, parent);
      return;
    }

    // Otherwise, show it
    show(trigger, target, parent);
  };

  // Destroy. When the content is shorter, reset height to auto and remove footer button
  let destroy = function (elem) {
    for (let i = 0; i < elem.length; i++) {
      let el = contentElements[i],
        height = el.scrollHeight,
        heightDefined = el.dataset.moreHeight,
        parent = el.closest(settings.selector),
        footer = parent.querySelector(settings.selectorFooter);

      if (height > 0 && height == heightDefined) {
        el.style.height = 'auto';
        footer.style.display = 'none';
      }
    }
  };

  // Click Handler
  let clickHandler = function (event) {
    // Only run if clicked element matches our selector
    let trigger = event.target.closest(settings.selectorTrigger);
    if (trigger) {
      // Prevent default link behavior
      event.preventDefault();

      // Toggle Content
      toggleContent(event, trigger);
    }
  };

  //
  // Inits & Event Listeners
  //

  // Toggle content on click
  document.addEventListener('click', clickHandler, false);

  // Destroy when the real content is shorter than defined height
  let contentElements = document.querySelectorAll(settings.selectorContent);
  destroy(contentElements);
};

readMoreLess();

// Toogle menu
// const hamburger = document.querySelector('.city__location');
// const hamburgerMobile = document.querySelector('.city__location-mobile');
// const menu = document.querySelector('.geo');
// const closeBtn = document.querySelector('.geo__close');
// !
// hamburgerMobile.addEventListener('click', e => {
//   e.preventDefault();
//   hamburgerMobile.classList.toggle('active');
//   menu.classList.toggle('active');
// });
// !
// function tooglePopUp() {
//   const toggleMenu = () => {
//     hamburger.classList.toggle('active');
//     menu.classList.toggle('active');
//   };

//   hamburger.addEventListener('click', e => {
//     e.stopPropagation();
//     toggleMenu();
//   });

//   closeBtn.addEventListener('click', e => {
//     e.stopPropagation();
//     toggleMenu();
//   });

//   document.addEventListener('click', e => {
//     let target = e.target;
//     let itsMenu = target == menu || menu.contains(target);
//     let itsHamburger = target == hamburger;
//     let menuIsActive = menu.classList.contains('active');

//     if (!itsMenu && !itsHamburger && menuIsActive && closeBtn) {
//       toggleMenu();
//     }
//   });
// }

// tooglePopUp();

// window.addEventListener('scroll', () => {
//   const scrollY = window.scrollY;
//   const isMenuContainClassActive = menu.classList.contains('active');
//   if (scrollY > 34 && isMenuContainClassActive) {
//     hamburger.classList.remove('active');
//     menu.classList.remove('active');
//   }
// });

// Tabs in Tariff section

function tabs(headerSelector, tabSelector, contentSelector, activeClass, display = 'flex') {
  const header = document.querySelector(headerSelector),
    tab = document.querySelectorAll(tabSelector),
    content = document.querySelectorAll(contentSelector);
  function hideTabContent() {
    content.forEach(item => {
      item.style.display = 'none';
    });
    tab.forEach(item => {
      item.classList.remove(activeClass);
    });
  }
  function showTabContent(i = 0) {
    content[i].style.display = display;
    tab[i].classList.add(activeClass);
  }
  hideTabContent();
  showTabContent();
  header.addEventListener('click', e => {
    const target = e.target;
    if (
      target.classList.contains(tabSelector.replace(/\./, '')) ||
      target.parentNode.classList.contains(tabSelector.replace(/\./, ''))
    ) {
      tab.forEach((item, i) => {
        if (target == item || target.parentNode == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

// ПЕРВЫЙ аргумент - класс всего нашего хедера табов.
// ВТОРОЙ аргумент - класс конкретного элемента, при клике на который будет переключатся таб.
// ТРЕТИЙ аргумент - класс того блока, который будет переключаться.
// ЧЕТВЕРТЫЙ аргумент - класс активности, который будет добавлятся для таба, который сейчас активен.
tabs('.tabs__header', '.tabs__header-item', '.tabs__content', 'active');

// Toogle menu

function tooglePopUp(hamburgerBtnSelector, popUpSelector, closePopUpBtnSelector) {
  const hamburgerBtn = document.querySelector(hamburgerBtnSelector);
  const popUp = document.querySelector(popUpSelector);
  const closePopUpBtn = document.querySelector(closePopUpBtnSelector);

  const toggleMenu = () => {
    hamburgerBtn.classList.toggle('active');
    popUp.classList.toggle('active');
  };

  hamburgerBtn.addEventListener('click', e => {
    // e.stopPropagation();
    e.preventDefault();
    toggleMenu();
  });

  closePopUpBtn.addEventListener('click', e => {
    e.stopPropagation();
    toggleMenu();
  });

  document.addEventListener('click', e => {
    const target = e.target;
    const itsPopUp = target == popUp || popUp.contains(target);
    const itsHamburgerBtn = target == hamburgerBtn;
    const popUpIsActive = popUp.classList.contains('active');

    if (!itsPopUp && !itsHamburgerBtn && popUpIsActive && closePopUpBtn) {
      toggleMenu();
    }
  });
  // window.addEventListener('scroll', )
}

if (window.screen.width > 600) {
  tooglePopUp('.city__location', '.geo', '.geo__close');
  // window.addEventListener('scroll', () => {
  //   const scrollY = window.scrollY;
  //   const ispopUpContainClassActive = popUp.classList.contains('active');
  //   if (scrollY > 34 && ispopUpContainClassActive) {
  //     hamburgerBtn.classList.remove('active');
  //     popUp.classList.remove('active');
  //   }
  // });
} else {
  tooglePopUp('.city__location-mobile', '.geo', '.geo__close');
}
