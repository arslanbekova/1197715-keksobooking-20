'use strict';
(function () {
  window.utils = {

    // функция добавления обработчика событий только один раз
    addEventListenerOnce: function (target, type, listener) {
      target.addEventListener(type, function fn(evt) {
        target.removeEventListener(type, fn);
        listener(evt);
      });
    },

    // функция добавления атрибута у элементов HTMLCollection
    setAttribute: function (collection, attr, value) {
      for (var i = 0; i < collection.length; i++) {
        collection[i].setAttribute(attr, value);
      }
      return collection;
    },

    // функция удаления атрибута у элементов HTMLCollection
    removeAttribute: function (collection, attr) {
      for (var i = 0; i < collection.length; i++) {
        collection[i].removeAttribute(attr);
      }
      return collection;
    },

    isEscEvent: function (evt, action) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        action();
      }
    }
  };
})();
