export default class MasonryGrid {
  constructor ($el, options) {
    this.$el = $el || $('.js-masonry-grid');
    this.options = $.extend({}, {
      columnWidth: '.js-masonry-grid-item-sizer',
      gutter: '.js-masonry-grid-gutter-sizer',
      itemSelector: '.js-masonry-grid-item',
      dataSource: '.js-masonry-grid-data-source',
      loadingClass: 'is-loading'
    }, options);
    this.masonry = null;
    this.page = 1;
    this.init().bind();
  }

  init () {
    this.$el.addClass(this.options.loadingClass);

    this.masonry = new Masonry(this.$el.get(0), {
      columnWidth: this.options.columnWidth,
      gutter: this.options.gutter,
      itemSelector: this.options.itemSelector,
      hiddenStyle: { opacity: 0 },
      stamp: this.options.uniqueSelector
    });

    return this;
  }

  bind () {
    var $window = $(window),
        $container = this.$el,
        offset = 400,
        flag = true,
        timeout = null;

    this.$el.removeClass(this.options.loadingClass);

    $window.on('scroll.GRID', () => {
      // @todo - implement infinite scroll
      return false;

      if (!flag) {
        return false;
      }

      flag = false;

      if ($window.scrollTop() + $window.height() > $container.height() - offset) {
        clearTimeout(timeout);
        flag = false;
        this.page++;

        $.get(window.location.pathname + '?page=' + this.page, (res) => {
          var $new = $(res).find(this.options.itemSelector);

          // No more new items so quit forever
          if ($new.length === 0) {
            flag = false;
            return false;
          }

          $new.css('visibility', 'hidden');
          this.$el.append($new);

          $new.imagesLoaded().always(() => {
            $new.css('visibility', '');
            this.masonry.appended($.makeArray($new));
            this.masonry.layout();
          });

          timeout = setTimeout(() => {
            flag = true;
          }, 256);
        });
      } else {
        timeout = setTimeout(() => {
          flag = true;
        }, 256);
      }
    });

    return this;
  }
}


// Grid.prototype.bind = function () {
//   var _this = this,
//       $window = $(window),
//       $container = $('.mod-site-canvas'),
//       offset = 400,
//       flag = true,
//       timeout = null;

//   this.$element.removeClass(this.options.loadingClass);

//   if (typeof this.$element.attr('data-endless') === 'undefined') {
//     return this;
//   }

//   $window.on('scroll.GRID', function () {
//     if (!flag) {
//       return false;
//     }

//     flag = false;

//     if ($window.scrollTop() + $window.height() > $container.height() - offset) {
//       clearTimeout(timeout);
//       flag = false;
//       _this.page++;

//       $.get(window.location.pathname + '?page=' + _this.page, function (res) {
//         var $new = $(res).find(_this.options.itemSelector).not(_this.options.uniqueSelector);

//         // No more new items so quit forever
//         if ($new.length === 0) {
//           flag = false;
//           return false;
//         }

//         $new.css('visibility', 'hidden');
//         _this.$element.append($new);

//         $new.imagesLoaded().always(function () {
//           $new.css('visibility', '');
//           _this.masonry.appended($.makeArray($new));
//           _this.masonry.layout();
//         });

//         timeout = setTimeout(function () {
//           flag = true;
//         }, 256);
//       });
//     } else {
//       timeout = setTimeout(function () {
//         flag = true;
//       }, 256);
//     }
//   });

//   return this;
// };


// Grid.prototype.unbind = function() {
//   $(window).off('load.GRID');
//   this.$element.off('click.GRID');

//   return this;
// };
