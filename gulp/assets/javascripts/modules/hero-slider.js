import skate from '../../vendor/skatejs/src/skate';
require('../../vendor/skidding--dragdealer/src/dragdealer');

skate('js-hero-slider', {
  created: (el) => {
    new HeroSlider( $(el) );
  },
  type: skate.type.CLASSNAME,
});

/**
 * Constructor
 *
 * @param {jQuery} $element
 * @param {Object} options
 */
function HeroSlider($element, options) {
  if (!$element.length) {
    return false;
  }

  this.$element   = $element;
  this.$scrollbar = this.$element.find('.hero-slider__scrollbar');
  this.$handle    = this.$element.find('.hero-slider__handle');
  this.$slider    = this.$element.find('.hero-slider');
  this.$container = this.$element.find('.hero-slider__container');
  this.dragdealer = null;

  this.isCurrentlyMobile = this.isMobile();

  this.scrollWidth = 0;

  this.init().bindResizeHandler();
}

/**
 * More extensive initialization
 *
 * @return {HeroSlider}
 */
HeroSlider.prototype.init = function () {
  var _this = this;

  this.calculateScrollWidth();

  if (this.isCurrentlyMobile) {
    this.initMobile();
  } else {
    this.initDesktop();
  }

  return this;
};

HeroSlider.prototype.initDesktop = function () {
  var _this = this;

  this.$container.css('overflow-x', 'hidden');
  this.scrollWidth -= parseInt(this.$container.outerWidth(), 10);

  this.$dragger = $('<div />').addClass('hero-slider__dragger')
                              .width(this.scrollWidth)
                              .css({
                                'position': 'absolute',
                                'top': 0,
                                'left': (_this.scrollWidth - _this.$container.outerWidth()) * -1,
                                'bottom': 0,
                                'z-index': 2,
                                'background-color': 'rgba(0, 0, 0, 0)',
                                'opacity': 0.01,
                              })
                              .prependTo(this.$element);

  $('<span />').addClass('handle')
               .width(this.$container.outerWidth())
               .css({
                 'position': 'absolute',
                 'top': 0,
                 'left': 0,
                 'bottom': 0,
                 'background-color': 'rgba(255, 255, 255, .01)'
               })
               .prependTo(this.$dragger);

  this.dragdealer = new Dragdealer(this.$scrollbar.get(0), {
    requestAnimationFrame: true,
    animationCallback: function (x, y) {
      var tooltips = document.querySelectorAll('.tooltip');

      _this.$container.scrollLeft(_this.scrollWidth * x);

      if (!!tooltips.length) {
        _this.repositionTooltips(tooltips);
      }
    }
  });

  var fullDragger = new Dragdealer(this.$dragger.get(0), {
    requestAnimationFrame: true,
    x: 1,
    animationCallback: function (x, y) {
        _this.$dragger.css('left', (_this.scrollWidth - _this.$container.outerWidth()) * x * -1);
        _this.dragdealer.setValue((1 - x), y, false);
    }
  });

  return this;
};

HeroSlider.prototype.initMobile = function () {
  var _this = this;

  this.$container.css('overflow-x', '');
  this.$slider.width(this.scrollWidth);

  this.$container.on('scroll', function () {
      var tooltips = document.querySelectorAll('.tooltip');

      if (!!tooltips.length) {
        _this.repositionTooltips(tooltips);
      }
  });
};

HeroSlider.prototype.calculateScrollWidth = function () {
  var _this = this,
      imageSelector = [
        '.hero-slider__item > img',
        '.hero-slider__item > .image-with-poi > img'
      ].join(', ');

  // Some buffer for rounding bugs
  this.scrollWidth = 2;

  // determine scroll width & prevent default mousedown behaviour
  this.$slider.find(imageSelector).each(function () {
    _this.scrollWidth += parseInt(Math.ceil($(this).outerWidth()), 10);
  });

  this.$slider.css('max-width', this.scrollWidth.toString() + 'px');
};

HeroSlider.prototype.repositionTooltips = function (tooltips) {
  for (var i = 0; i < tooltips.length; i++) {
    var tooltip = tooltips[i].instance;

    if (!tooltip) {
      continue;
    }

    tooltip.move_tooltip({
      currentTarget: tooltips[i].trigger
    });
  };
};

/**
 * Bind all handlers
 *
 * @return {HeroSlider}
 */
HeroSlider.prototype.bindResizeHandler = function () {
  var _this = this,
      resizeFlag = true;

  $(window).on('resize.HERO_SLIDER', function (e) {
    if (resizeFlag) {
      if (_this.isMobile() !== _this.isCurrentlyMobile) {
        _this.isCurrentlyMobile = _this.isMobile();
        _this.unbind().destroy().init();
      }

      _this.calculateScrollWidth();

      resizeFlag = false;

      setTimeout(function () {
        resizeFlag = true;
      }, 80);
    }
  });

  return this;
};

/**
 * Clean up after ourselves
 *
 * @return {HeroSlider}
 */
HeroSlider.prototype.destroy = function () {
  this.dragdealer = null;
  this.scrollWidth = 0;

  return this;
};

/**
 * Unbind all handlers
 *
 * @return {HeroSlider}
 */
HeroSlider.prototype.unbind = function () {
  // Remove all handlers
  return this;
};

HeroSlider.prototype.isMobile = function () {
  return !!(window.innerWidth < 1025);
};
