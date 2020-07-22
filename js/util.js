'use strict';
(function () {
  window.utils = {
    // функция генерации случайного числа
    getRandomInt: function (max) {
      return Math.round(Math.floor(Math.random() * Math.floor(max)));
    },

    // функция генерации случайного числа в заданном интервале
    getRandomArbitrary: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },

    // функция возвращения случайного элемента из массива
    getRandomElement: function (array) {
      return array[Math.floor(Math.random() * Math.floor(array.length))];
    },

    // функция добавления обработчика событий только один раз
    addEventListenerOnce: function (target, type, listener) {
      target.addEventListener(type, function fn(evt) {
        target.removeEventListener(type, fn);
        listener(evt);
      });
    },

    // функция добавления или удаления атрибута у элементов HTMLCollection
    setOrRemoveAttribute: function (collection, attr, value) {
      for (var i = 0; i < collection.length; i++) {
        if (collection[i].hasAttribute(attr)) {
          collection[i].removeAttribute(attr);
        } else {
          collection[i].setAttribute(attr, value);
        }
      }
      return collection;
    },

    isEscEvent: function (evt, action) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        action(evt);
      }
    }
  };
})();
