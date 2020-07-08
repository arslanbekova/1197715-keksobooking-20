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

var COUNT_OF_ARRAY_ITEMS = 9;
var MAX_X_POSITION = 1100;
var MIN_Y_POSITION = 130;
var MAX_Y_POSITION = 630;
var Y_GAP = 35;
var X_GAP = 25;
var PIN_X_GAP = 32;
var PIN_HEIGHT = 80;
var PIN_LEFT = 570;
var PIN_TOP = 375;


var map = document.querySelector('.map');
var similarListPin = map.querySelector('.map__pins');

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
  var announcements = [];
  for (var i = 1; i < COUNT_OF_ARRAY_ITEMS; i++) {
    announcements[i] = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png',
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
  for (var i = 1; i < pins.length; i++) {
    fragment.appendChild(getMapPin(pins[i]));
  }
  similarListPin.appendChild(fragment);
};

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
    default:
      TypeOfHousing = 'Квартира';
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
  announcementCardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + ' ' + announcement.offer.checkin + ',' + ' ' + 'выезд до' + ' ' + announcement.offer.checkout;

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

  fragment.appendChild(getAnnouncementCard(cards[1]));
  announcementsList.appendChild(fragment);

  var filter = map.querySelector('.map__filters-container');

  map.insertBefore(announcementsList, filter);
};

var announcementForm = document.querySelector('.ad-form');
var announcementFormAddresField = document.getElementById('address');
announcementFormAddresField.setAttribute('value', '601, 406');

var announcementFormFields = announcementForm.children;

var filterForm = map.querySelector('.map__filters');
var filterFormFields = filterForm.children;

// функция добавления обработчика событий только один раз
var addEventListenerOnce = function (target, type, listener) {
  target.addEventListener(type, function fn(evt) {
    target.removeEventListener(type, fn);
    listener(evt);
  });
};

// функция добавления атрибута disabled элементам HTMLCollection
var setDisabled = function (collection) {
  for (var i = 0; i < collection.length; i++) {
    collection[i].setAttribute('disabled', true);
  }
  return collection;
};

// функция удаления атрибута disabled у элементов HTMLCollection
var removeDisabled = function (collection) {
  for (var i = 0; i < collection.length; i++) {
    collection[i].removeAttribute('disabled');
  }
  return collection;
};

setDisabled(announcementFormFields);
setDisabled(filterFormFields);

var mapPinMain = similarListPin.querySelector('.map__pin--main');

// функция описывающая происходящие события на элелементе mapPinMainEvent
var mapPinMainEvent = function (evt) {
  if (evt.which === 1 || evt.key === 'Enter') {
    map.classList.remove('map--faded');

    renderMapPins();
    renderAnnouncementCards();

    removeDisabled(announcementFormFields);
    announcementForm.classList.remove('ad-form--disabled');

    removeDisabled(filterFormFields);

    var pinX = PIN_LEFT + PIN_X_GAP;
    var pinY = PIN_TOP + PIN_HEIGHT;
    announcementFormAddresField.setAttribute('value', pinX + ',' + ' ' + pinY);
  }
};

addEventListenerOnce(mapPinMain, 'mousedown', mapPinMainEvent);
addEventListenerOnce(mapPinMain, 'keydown', mapPinMainEvent);

// валидация полей количество комнат и количество гостей
var roomNumbers = document.getElementById('room_number');
var guestsCount = document.getElementById('capacity');
var messageRoomNumberValidity = 'Количество комнат должно быть больше или равно количеству гостей';

var checkRoomNumberValidity = function (message) {
  var roomNumberValue = Number(roomNumbers.options[roomNumbers.selectedIndex].value);
  var guestCountValue = Number(guestsCount.options[guestsCount.selectedIndex].value);
  if (roomNumberValue === 1 && guestCountValue === 1) {
    roomNumbers.setCustomValidity('');
  } else if (roomNumberValue === 2 && guestCountValue > 0 && guestCountValue < 3) {
    roomNumbers.setCustomValidity('');
  } else if (roomNumberValue === 3 && guestCountValue > 0 && guestCountValue < 4) {
    roomNumbers.setCustomValidity('');
  } else if (roomNumberValue === 100 && guestCountValue === 0) {
    roomNumbers.setCustomValidity('');
  } else {
    roomNumbers.setCustomValidity(message);
  }
};

roomNumbers.addEventListener('change', function () {
  checkRoomNumberValidity(messageRoomNumberValidity);
});

guestsCount.addEventListener('change', function () {
  checkRoomNumberValidity(messageRoomNumberValidity);
});

window.addEventListener('load', function () {
  checkRoomNumberValidity(messageRoomNumberValidity);
});
