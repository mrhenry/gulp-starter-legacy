let utils = {

  /*
   * Strip out script tags of jQuery ajax response data
   *
   * @return {jQuery object}
   */
  cleanResponse: function(respData) {
    var regex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    return $('<div>').append( respData.replace(regex, '') );
  },

  /* Returns a function, that, as long as it continues to be invoked, will not
   * be triggered. The function will be called after it stops being called for
   * N milliseconds. If `immediate` is passed, trigger the function on the
   * leading edge, instead of the trailing.
   *
   * @param {Function} func
   * @param {Integer}  wait
   * @param {Boolean}  immediate
   *
   * @return {Function}
   */
  debounce: function(func, wait, immediate) {
    var timeout;

    return function() {
      var context = this, args = arguments;
      var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },

  /**
   * Fire a function with pauses
   *
   * @param  {Integer}            delay
   * @param  {Boolean|Function}   no_trailing
   * @param  {Function}           callback
   * @param  {Boolean}            debounce_mode
   *
   * @return {Function}
   */
  throttle: function(delay, no_trailing, callback, debounce_mode) {
    var timeout_id,
        last_exec = 0;

    if (typeof no_trailing !== 'boolean') {
      debounce_mode = callback;
      callback = no_trailing;
      no_trailing = undefined;
    }

    var wrapper = function () {
      var that = this,
          elapsed = +new Date() - last_exec,
          args = arguments,
          exec = function () {
              last_exec = +new Date();
              callback.apply(that, args);
          },
          clear = function () {
              timeout_id = undefined;
          };

      if (debounce_mode && !timeout_id) { exec(); }
      if (timeout_id) { clearTimeout(timeout_id); }
      if (debounce_mode === undefined && elapsed > delay) {
          exec();

      } else if (no_trailing !== true) {
          timeout_id = setTimeout(debounce_mode ? clear : exec, debounce_mode === undefined ? delay - elapsed : delay);
      }
    };

    return wrapper;
  }

}

export default utils;
