const readMoreLess = function () {
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
