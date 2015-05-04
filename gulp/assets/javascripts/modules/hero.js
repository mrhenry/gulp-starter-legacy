// ScrollBinder exposes a global
require('../../vendor/scroll-binder/scroll-binder');

export default class Hero {
  constructor ($el) {
    this.$el = $el || $('.js-hero');
    this.scrollBinder = new ScrollBinder(this.$el, {
      over: (window.innerWidth - 1110),
      animations: {
        'this': {
          'max-width': { from: window.innerWidth, to: 1110, unit: 'px' },
          'height': { from: (window.innerHeight * .9), to: 670, unit: 'px' }
        }
      }
    });

    this.init().bind();
  }

  init () {
    return this;
  }

  bind () {
    return this;
  }
}