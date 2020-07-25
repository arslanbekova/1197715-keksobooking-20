'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout = null;

  var debounce = function (cb) {

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.debounce = debounce;
})();
