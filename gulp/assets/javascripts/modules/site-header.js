export default class SiteHeader {
  constructor () {
    this.$el = $('.js-site-header');
    this.init().bind();
  }

  init () {

    return this;
  }

  bind () {
    this.$el.on('click', '.js-mobile-navigation-toggle', (e) => {
      e.preventDefault();
      this.$el.toggleClass('is-open');
    });

    return this;
  }
}
