import skate from '../../vendor/skatejs/src/skate';
var Sloth = require('../../vendor/sloth/dist/sloth');


skate('data-src', {
  created: onCreated,
  type: skate.type.ATTRIBUTE,
});


/**
 * Called before the element is displayed.
 *
 * @param  {DOM element} element
 */
function onCreated(element) {
  var $element = $(element);

  if ( $element.data('src-type') === 'static' ) {
    Sloth.Base.load(element, {
      versions: {}
    });

  } else {
    Sloth.Base.load(element);

  }
}
