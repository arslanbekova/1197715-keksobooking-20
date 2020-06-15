'use strict';

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

var COUNT_OF_ARRAY_ITEMS = 8;
var MAX_X_POSITION = 1100;
var MIN_Y_POSITION = 130;
var MAX_Y_POSITION = 630;
var Y_GAP = 35;
var X_GAP = 25;

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

// функция генерации массива с уникальными значениями
var getUniqueArray = function (min, max, count) {
  var i;
  var array = [];
  var uniqueArray = [];
  for (i = min; i <= max; i++) {
    array.push(i);
  }
  for (i = 0; i < count; i++) {
    uniqueArray.push(array.splice(Math.floor(Math.random() * (array.length)), 1)[0]);
  }
  return uniqueArray;
};

// функция генерации массива со случайными объектами
var getAnnouncementsData = function () {
  var announcements = [];
  var avatarIDArray = getUniqueArray(1, 8, COUNT_OF_ARRAY_ITEMS);
  for (var i = 0; i < COUNT_OF_ARRAY_ITEMS; i++) {
    announcements[i] = {
      author: {
        avatar: 'img/avatars/user0' + avatarIDArray[i] + '.png',
      },
      offer: {
        title: 'Заголовок предложения',
        address: '600, 350',
        price: 5000,
        type: getRandomElement(TYPES_OF_HOUSING),
        rooms: getRandomArbitrary(1, 6),
        guests: getRandomArbitrary(1, 6),
        checkin: getRandomElement(CHECKIN_CHECKOUT_TIMES),
        checkout: getRandomElement(CHECKIN_CHECKOUT_TIMES),
        features: FACILITIES.slice(getRandomInt(FACILITIES.length)),
        description: 'Описание объявления',
        photos: PHOTOS_ADDRESS.slice(getRandomInt(PHOTOS_ADDRESS.length)),
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

// функция создания DOM-элемента (пин на карте)
var getMapPin = function (announcement) {

  var mapPinElement = similarMapPinTemplate.cloneNode(true);

  mapPinElement.style.left = announcement.location.x + X_GAP + 'px';
  mapPinElement.style.top = announcement.location.y - Y_GAP + 'px';
  mapPinElement.querySelector('img').alt = announcement.offer.title;
  mapPinElement.querySelector('img').src = announcement.author.avatar;

  return mapPinElement;
};

// функция заполнения блока DOM-элементами (отрисовка пинов)
var renderMapPins = function () {
  var pins = getAnnouncementsData();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(getMapPin(pins[i]));
  }
  similarListElement.appendChild(fragment);
};

renderMapPins();

var similarListElement = document.querySelector('.map');
var similarAnnouncementCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

// функция проверки и получения элемента массива по идентификатору
var getTypeOfHousing = function (TypeOfHousing) {
  switch (TypeOfHousing) {
    case 'palace':
      TypeOfHousing = 'Дворец';
      break;
    case 'flat':
      TypeOfHousing = 'Квартира';
      break;
    case 'house':
      TypeOfHousing = 'Дом';
      break;
    case 'bungalo':
      TypeOfHousing = 'Бунгало';
      break;
  }
  return TypeOfHousing;
};

var getRuFacilities = function (ruFacilities) {
  switch (ruFacilities) {
    case 'wifi':
      ruFacilities = 'WiFi';
      break;
    case 'dishwasher':
      ruFacilities = 'Посудомоечная машина';
      break;
    case 'parking':
      ruFacilities = 'Паркинг';
      break;
    case 'washer':
      ruFacilities = 'Стиральная машинка';
      break;
    case 'elevator':
      ruFacilities = 'Лифт';
      break;
    case 'conditioner':
      ruFacilities = 'Кондиционер';
      break;
  }
  return ruFacilities;
};

// функция создания DOM-элемента (карточка объявления)
var getAnnouncementCard = function (announcement) {

  var announcementCardElement = similarAnnouncementCardTemplate.cloneNode(true);

  announcementCardElement.querySelector('.popup__title').textContent = announcement.offer.title;
  announcementCardElement.querySelector('.popup__text--address').textContent = announcement.offer.address;
  announcementCardElement.querySelector('.popup__text--price').textContent = announcement.offer.price + '₽/ночь';

  var TypeOfHousing = announcement.offer.type;
  announcementCardElement.querySelector('.popup__type').textContent = getTypeOfHousing(TypeOfHousing);

  announcementCardElement.querySelector('.popup__text--capacity').textContent = announcement.offer.rooms + ' ' + 'комнаты для' + ' ' + announcement.offer.guests + ' ' + 'гостей';
  announcementCardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + ' ' + announcement.offer.checkin + ',' +' ' + 'выезд до' + ' ' + announcement.offer.checkout;

  var featuresArray = announcement.offer.features;
  featuresArray.forEach(function (feature) {
    var featuresList = announcementCardElement.querySelector('.popup__features');
    var fragment = document.createDocumentFragment();
    var newFeatureElement = document.createElement('li');

    newFeatureElement.className = 'popup__feature--' + feature;
    newFeatureElement.textContent = getRuFacilities(feature);

    fragment.appendChild(newFeatureElement);
    featuresList.appendChild(fragment);
  });


  announcementCardElement.querySelector('.popup__description').textContent = announcement.offer.description;

  var photosArray = announcement.offer.photos;
  photosArray.forEach(function (photo) {
    var photosList = announcementCardElement.querySelector('.popup__photos');
    var fragment = document.createDocumentFragment();
    var newPhotoElement = document.createElement('img');

    newPhotoElement.className = 'popup__photo';
    newPhotoElement.width = 45;
    newPhotoElement.height = 40;
    newPhotoElement.alt = 'Фотография жилья';
    newPhotoElement.src = photo;

    fragment.appendChild(newPhotoElement);
    photosList.appendChild(fragment);
  });

  announcementCardElement.querySelector('.popup__avatar').src = announcement.author.avatar;

  return announcementCardElement;
};

// функция заполнения блока DOM-элементами (отрисовка карточек)
var renderAnnouncementCards = function () {

  var cards = getAnnouncementsData();
  var fragment = document.createDocumentFragment();
  var announcementsList = document.createElement('div');
  announcementsList.className = 'map__cards';

  for (var i = 0; i < cards.length; i++) {
    fragment.appendChild(getAnnouncementCard(cards[i]));
  }
  announcementsList.appendChild(fragment);
  // console.log(announcementsList);

  var map = document.querySelector('.map');
  var filter = document.querySelector('.map__filters-container');

  map.insertBefore(announcementsList, filter);
};

renderAnnouncementCards();
