import utils from './utils';

class Scrollspy {

  constructor($el, $links) {
    this.$el      = $el;
    this.$links   = $links;
    this.$targets = this.getTargets();

    this.bind().init();
  }

  bind() {
    this.$el.on('scroll.scrollspy', utils.throttle(60, (e) => {
      this.onScroll(e);
    }));

   this.$links.on('click', (e) => { this.onClickLink(e) });

    return this;
  }

  getTargets() {
    let $targets = $();

    this.$links.each( function() {
      let id      = $(this).attr('href'),
          $target = $(id);

      if ( $target.length ) {
        $targets = $targets.add( $target );
      }
    });

    return $targets;
  }

  init() {
    this.onScroll();

    return this;
  }

  onClickLink(e) {
    let href      = $(e.currentTarget).attr('href'),
        targetTop = $(href).offset().top;

    $('html, body').animate({
      scrollTop: targetTop
    }, 1000);

    e.preventDefault();
  }

  onScroll(e) {
    let inViewport = [],
        checkArea  = $(window).height() / 2,
        activeId;

    this.$targets.each( function() {
      let bounds = this.getBoundingClientRect();

      if ( bounds.top < checkArea && bounds.bottom > 100 ) {
        inViewport.push( this );
      }
    });

    if ( inViewport.length ) {
      activeId = inViewport[0].id;

      this.$links.closest('li').removeClass('is-active');
      this.$links.filter('[href="#' + activeId +'"]').closest('li').addClass('is-active');
    }
  }

}

export default Scrollspy;

