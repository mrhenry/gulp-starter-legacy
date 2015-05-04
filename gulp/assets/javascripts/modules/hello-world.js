import skate from '../../vendor/skatejs/src/skate';


skate('hello-world', {
  attached: function(element) {
    console.log('Attached', element);
  },
  created: function(element) {
    console.log('Created', element);
    element.init();
  },
  detached: function(element) {
    console.log('Detached', element);
  },
  prototype: {
    init: function() {
      console.log("Hello World!");
    }
  }
});
