'use strict';

var TYPES_OF_HOUSING = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var CHECK_IN = [
  '12: 00',
  '13: 00',
  '14: 00'
];

var CHECK_OUT = [
  '12: 00',
  '13: 00',
  '14: 00'
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

var COUNT_OF_ARRAY_ITEMS = 8;
var MAX_X_POSITION = 1150;
var MIN_Y_POSITION = 130;
var MAX_Y_POSITION = 630;

var announcements = [];

var similarListElement = document.querySelector('.map__pins');

var similarMapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

// функция генерации случайного числа
var getRandomInt = function (max) {
  return Math.round(Math.floor(Math.random() * Math.floor(max)));
};

// функция генерации случайного числа в заданном интервале
var getRandomArbitrary = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

// функция возвращения случайного элемента из массива
var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * Math.floor(array.length))];
};

// функция генерации массива со случайными объектами
var getAnnouncementsData = function () {

  for (var i = 0; i < COUNT_OF_ARRAY_ITEMS; i++) {
    announcements[i] = {
      author: {
        avatar: 'img/avatars/user0' + getRandomArbitrary(1, COUNT_OF_ARRAY_ITEMS) + '.png',
      },
      offer: {
        title: 'Заголовок предложения',
        address: '600, 350',
        price: 5000,
        type: getRandomElement(TYPES_OF_HOUSING),
        rooms: getRandomArbitrary(1, 6),
        guests: getRandomArbitrary(1, 6),
        checkin: getRandomElement(CHECK_IN),
        checkout: getRandomElement(CHECK_OUT),
        features: FACILITIES.splice(getRandomInt(FACILITIES.length)),
        description: 'Описание объявления',
        photos: PHOTOS_ADDRESS.splice(getRandomInt(PHOTOS_ADDRESS.length)),
      },
      location: {
        x: getRandomInt(MAX_X_POSITION),
        y: getRandomArbitrary(MIN_Y_POSITION, MAX_Y_POSITION),
      }
    };
  }

  return announcements;
};


document.querySelector('.map').classList.remove('map--faded');

// функция создания DOM - элемента на основе JS - объекта
var getMapPin = function (announcement) {

  var mapPinElement = similarMapPinTemplate.cloneNode(true);

  mapPinElement.style.left = announcement.location.x + 'px';
  mapPinElement.style.top = announcement.location.y + 'px';
  mapPinElement.querySelector('img').alt = announcement.offer.title;
  mapPinElement.querySelector('img').src = announcement.author.avatar;

  return mapPinElement;
};

// функция заполнения блока DOM - элементами на основе массива JS - объектов.
var renderMapPins = function () {
  getAnnouncementsData();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < announcements.length; i++) {
    fragment.appendChild(getMapPin(announcements[i]));
  }

  similarListElement.appendChild(fragment);
};

renderMapPins();


