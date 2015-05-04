import MasonryGrid from './masonry-grid';

export default class Filter {
  constructor ($el) {
    this.$el = $el || $('.js-filter');

    if (this.$el.length > 0) {
      this.$target = $('.js-filter-target');
      this.start = window.location.pathname;
      this.current = window.location.pathname;

      this.parameters = {
        'size_min': parseInt(this.$el.find('.js-filter-size').attr('data-min'), 10),
        'size_max': parseInt(this.$el.find('.js-filter-size').attr('data-max'), 10),
        'range_min': parseInt(this.$el.find('.js-filter-range').attr('data-min'), 10),
        'range_max': parseInt(this.$el.find('.js-filter-range').attr('data-max'), 10)
      };

      this.init().bind();
    }
  }

  init () {
    this.setActiveSubfilter(this.start);
    this.parseParameters(window.location.search);

    if (!!this.start.match(/^\/work\/.+/i)) {
      this.openFilter();
    } else {
      if (!!window.history && !!window.history.replaceState) {
        window.history.replaceState({ href: this.appendParameters(this.start) }, document.title, this.appendParameters(this.start));
      }
    }

    // @fixme - timeout because filter gets initialized first
    // could be solved by using skate for everything
    setTimeout(() => {
      let range = { min: this.parameters['range_min'], max: this.parameters['range_max']},
          size = { min: this.parameters['size_min'], max: this.parameters['size_max']};

      this.$el.find('.js-filter-range').data('instance').setValue(range);
      this.$el.find('.js-filter-size').data('instance').setValue(size);
    }, 10);

    return this;
  }

  bind () {
    this.$el.on('click', '.js-filter-toggle', (e) => {
      e.preventDefault();
      this.openFilter();
    });

    this.$el.on('click', '.js-filter-subfilter-toggle', (e) => {
      let $target = $(e.target);

      e.preventDefault();

      this.$el.find('.js-filter-subfilter-toggle.is-open').not($target).removeClass('is-open');
      $target.toggleClass('is-open');
    });

    this.$el.on('click', '.js-filter-subfilter', (e) => {
      if (!!window.history && !!window.history.pushState) {
        let $target = $(e.target);

        e.preventDefault();

        this.change(this.appendParameters($target.attr('href')), true);
        this.setActiveSubfilter($target);
      }
    });

    this.$el.on('change', '.js-filter-range', (e) => {
      let $target = $(e.target),
          value = $target.data('instance').getValue(true);

      this.parameters['range_min'] = value.min;
      this.parameters['range_max'] = value.max;

      this.change(this.appendParameters(this.current), true, true);
    });

    this.$el.on('change', '.js-filter-size', (e) => {
      let $target = $(e.target),
          value = $target.data('instance').getValue(true);

      this.parameters['size_min'] = value.min;
      this.parameters['size_max'] = value.max;

      this.change(this.appendParameters(this.current), true, true);
    });

    $(window).on('popstate', (e) => {
      var state = e.originalEvent.state;

      if (!state) {
        state = { href: this.start }
      }

      this.change(state.href, false);
      this.setActiveSubfilter(state.href);
    });

    return this;
  }

  change (href, saveState = true, force = false) {
    if (!force && href === this.current) {
      return false;
    }

    this.current = href;

    if (saveState && !!window.history && !!window.history.pushState) {
      window.history.pushState({ href: this.current }, document.title, this.current);
    }

    this.$target.closest('.wrapper').css('height', `${this.$target.outerHeight()}px`);
    this.$target.addClass('is-loading');

    setTimeout(() => {
      this.$target.load(`${href} .js-filter-target`, () => {
        this.$target.find('.js-filter-target').children().unwrap();

        $('.js-masonry-grid').each(function () {
          new MasonryGrid($(this));
        });

        this.$target.removeClass('is-loading');

        setTimeout(() => {
          this.$target.closest('.wrapper').css('height', '');
        }, 110);
      });
    }, 660);
  }

  openFilter () {
    this.$el.find('.js-filter-wrapper').toggleClass('is-hidden');
  }

  setActiveSubfilter ($target) {
    if (typeof $target === 'string') {
      $target = $(`.js-filter-subfilter[href="${$target}"]`);
    }

    $('.js-filter-subfilter-toggle.is-active').removeClass('is-active');

    $target.closest('.js-filter-subfilters')
           .prev('.js-filter-subfilter-toggle')
           .removeClass('is-open')
           .addClass('is-active');
  }

  parseParameters (querystring) {
    let params = {};

    querystring = querystring.replace('?', '');
    querystring = querystring.split('&');

    querystring.forEach(part => {
      let [key, value] = part.split('=');

      value = parseInt(value, 10);

      if (!!value && typeof this.parameters[key] !== 'undefined') {
        this.parameters[key] = value;
      }
    });
  }

  appendParameters (url) {
    let parameters = {},
        querystring = '';

    for (let key in this.parameters) {
      let value = parseInt(this.parameters[key], 10);

      if (!!value && value > 0) {
        parameters[key] = value;
      }
    }

    if (!$.isEmptyObject(parameters)) {
      // Strip parameters
      url = url.replace(/\?.*$/gi, '');

      querystring = $.param(parameters);

      url = `${url}?${querystring}`
    }

    return url;
  }
}