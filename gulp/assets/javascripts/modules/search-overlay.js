export default class SearchOverlay {
  constructor ($el) {
    this.$el = $el || $('.js-search-overlay');
    this.init().bind();
  }

  init () {
    return this;
  }

  bind () {
    $('.js-search-overlay-toggle').on('click', (e) => {
      e.preventDefault();
      $(document.body).toggleClass('is-showing-search-overlay');
    });

    return this;
  }
}