import SiteHeader from './modules/site-header';
import MasonryGrid from './modules/masonry-grid';
import Hero from './modules/hero';
import Filter from './modules/filter';
import InputRange from './modules/input-range';
import './modules/hello-world';
import './modules/async-images';
import './modules/hero-slider';
import SearchOverlay from './modules/search-overlay';
import './modules/parallax';
import Scrollspy from './modules/scrollspy'

$(window).on('load', () => {
  new SiteHeader();
  new Hero();
  new Filter();
  new SearchOverlay();
  new Scrollspy( $(window), $('.mod-subnavigation a') );

  $('.js-masonry-grid').each(function () {
    new MasonryGrid($(this));
  });

  $('.js-input-range').each(function () {
    new InputRange($(this));
  });

  $('.related__item').on('mouseenter', function () {
    if ($(this).hasClass('has-focus')) {
      return false;
    }

    $('.related__item.has-focus').removeClass('has-focus');
    $(this).addClass('has-focus');
  })
});
