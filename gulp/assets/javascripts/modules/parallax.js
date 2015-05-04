import skate from '../../vendor/skatejs/src/skate';
import utils from './utils';

/**
 * Skate component
 */
skate('js-parallax', {
  created: (el) => {
    var $el = $(el),
        instance = $el.data('parallax');

    if ( typeof instance === 'undefined' ) {
      $el.data('parallax', new Parallax($el) );
    }
  },
  type: skate.type.CLASSNAME,
});

/**
 * @class
 *
 * Parallax
 */
class Parallax {

  constructor($el) {
    this.$el = $el;
    this.$layers = $el.find("[data-parallax-strength]");

    console.log(this.$layers);
    this.bind();
  }

  bind() {
    $(window).on('mousemove', utils.throttle(60, (e) => {
      this.onMouseMove(e);
    }));

    return this;
  }

  onMouseMove(e) {
    let left = $(window).width() / 2 - e.pageX;
    let top  = $(window).height() / 2 - e.pageY;

    this.$layers.each( function() {
      var $this    = $(this),
          strength = $this.data('parallax-strength');

      $this.css({
        'transform': 'translateX(' + left / strength + 'px) translateY(' + top / strength + 'px)'
      });
    });
  }
}
