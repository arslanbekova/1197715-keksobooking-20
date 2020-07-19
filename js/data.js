'use strict';

(function () {
  var TYPES_OF_HOUSING = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var CHECKIN_CHECKOUT_TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var FACILITIES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var PHOTOS_ADDRESS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var COUNT_OF_ARRAY_ITEMS = 9;
  var MAX_X_POSITION = 1100;
  var MIN_Y_POSITION = 130;
  var MAX_Y_POSITION = 630;

  // функция генерации массива со случайными объектами
  var getAnnouncementsData = function () {
    var announcements = [];
    for (var i = 1; i < COUNT_OF_ARRAY_ITEMS; i++) {
      announcements[i] = {
        number: i,
        author: {
          avatar: 'img/avatars/user0' + i + '.png',
        },
        offer: {
          title: 'Заголовок предложения',
          address: '600, 350',
          price: 5000,
          type: window.util.getRandomElement(TYPES_OF_HOUSING),
          rooms: window.util.getRandomArbitrary(1, 6),
          guests: window.util.getRandomArbitrary(1, 6),
          checkin: window.util.getRandomElement(CHECKIN_CHECKOUT_TIMES),
          checkout: window.util.getRandomElement(CHECKIN_CHECKOUT_TIMES),
          features: FACILITIES.slice(window.util.getRandomInt(FACILITIES.length)),
          description: 'Описание объявления',
          photos: PHOTOS_ADDRESS.slice(window.util.getRandomInt(PHOTOS_ADDRESS.length)),
        },
        location: {
          x: window.util.getRandomInt(MAX_X_POSITION),
          y: window.util.getRandomArbitrary(MIN_Y_POSITION, MAX_Y_POSITION),
        }
      };
    }
    return announcements;
  };

  window.announcements = getAnnouncementsData();
})();
