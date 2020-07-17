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
      number: i,
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

var announcements = getAnnouncementsData();

// функция создания DOM-элемента (пины на карте)
var getMapPin = function (announcement) {

  var mapPinElement = similarMapPinTemplate.cloneNode(true);

  mapPinElement.style.left = announcement.location.x + X_GAP + 'px';
  mapPinElement.style.top = announcement.location.y - Y_GAP + 'px';
  mapPinElement.querySelector('img').alt = announcement.offer.title;
  mapPinElement.querySelector('img').src = announcement.author.avatar;
  mapPinElement.querySelector('img').setAttribute('data-number', announcement.number);
  mapPinElement.setAttribute('data-number', announcement.number);
  return mapPinElement;
};

// функция заполнения блока DOM-элементами (отрисовка пинов)
var renderMapPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 1; i < announcements.length; i++) {
    fragment.appendChild(getMapPin(announcements[i]));
  }
  similarListPin.appendChild(fragment);
};

var similarAnnouncementCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

// функция проверки и получения элемента массива по идентификатору
var ruTypesOfHousing = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало',
};

var getRuTypeOfHousing = function (TypeOfHousing) {
  switch (TypeOfHousing) {
    case 'palace':
      TypeOfHousing = ruTypesOfHousing.palace;;
      break;
    case 'flat':
      TypeOfHousing = ruTypesOfHousing.flat;;
      break;
    case 'house':
      TypeOfHousing = ruTypesOfHousing.house;;
      break;
    case 'bungalo':
      TypeOfHousing = ruTypesOfHousing.bungalo;;
      break;
    default:
      TypeOfHousing = ruTypesOfHousing.flat;;
      break;
  }
  return TypeOfHousing;
};

var ruFacilities = {
  wifi: 'WiFi',
  dishwasher: 'Посудомоечная машина',
  parking: 'Паркинг',
  washer: 'Стиральная машинка',
  elevator: 'Лифт',
  conditioner: 'Кондиционер',
};

var getRuFacilities = function (facility) {
  switch (facility) {
    case 'wifi':
      facility = ruFacilities.wifi;
      break;
    case 'dishwasher':
      facility = ruFacilities.dishwasher;
      break;
    case 'parking':
      facility = ruFacilities.parking;
      break;
    case 'washer':
      facility = ruFacilities.washer;
      break;
    case 'elevator':
      facility = ruFacilities.elevator;
      break;
    case 'conditioner':
      facility = ruFacilities.conditioner;
      break;
  }
  return facility;
};

// функция создания DOM-элемента (карточка объявления)
var getAnnouncementCard = function (announcement) {

  var announcementCardElement = similarAnnouncementCardTemplate.cloneNode(true);

  announcementCardElement.querySelector('.popup__title').textContent = announcement.offer.title;
  announcementCardElement.querySelector('.popup__text--address').textContent = announcement.offer.address;
  announcementCardElement.querySelector('.popup__text--price').textContent = announcement.offer.price + '₽/ночь';

  var TypeOfHousing = announcement.offer.type;
  announcementCardElement.querySelector('.popup__type').textContent = getRuTypeOfHousing(TypeOfHousing);

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
var renderAnnouncementCards = function (elem) {

  var filter = map.querySelector('.map__filters-container');
  var fragment = document.createDocumentFragment();
  fragment.appendChild(getAnnouncementCard(announcements[elem]));

  map.insertBefore(fragment, filter);
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

// функция добавления или удаления атрибута disabled у элементов HTMLCollection
var setOrRemoveAttribute = function (collection, attr, value) {
  for (var i = 0; i < collection.length; i++) {
    if (collection[i].hasAttribute(attr)) {
      collection[i].removeAttribute(attr);
    } else {
      collection[i].setAttribute(attr, value);
    }
  }
  return collection;
};

setOrRemoveAttribute(announcementFormFields, 'disabled', true);
setOrRemoveAttribute(filterFormFields, 'disabled', true);

var mapPinMain = similarListPin.querySelector('.map__pin--main');

// функция описывающая происходящие события на элелементе mapPinMain
var mapPinMainEvent = function (evt) {
  if (evt.which === 1 || evt.key === 'Enter') {
    map.classList.remove('map--faded');

    renderMapPins();
    setOrRemoveAttribute(announcementFormFields, 'disabled');
    announcementForm.classList.remove('ad-form--disabled');

    setOrRemoveAttribute(filterFormFields, 'disabled');

    var pinX = PIN_LEFT + PIN_X_GAP;
    var pinY = PIN_TOP + PIN_HEIGHT;
    announcementFormAddresField.setAttribute('value', pinX + ',' + ' ' + pinY);
  }
};

addEventListenerOnce(mapPinMain, 'mousedown', mapPinMainEvent);
addEventListenerOnce(mapPinMain, 'keydown', mapPinMainEvent);

// добавление класса active метке
var addElementActiveClass = function (evtTarget) {
  if (evtTarget.tagName === 'BUTTON') {
    evtTarget.classList.add('map__pin--active');
  } else if (evtTarget.tagName === 'IMG') {
    evtTarget.parentNode.classList.add('map__pin--active');
  }
};

// функция получения DOM-элелемента
var getElementAnnouncementCard = function () {
  var announcementCard = document.querySelector('.popup');
  return announcementCard;
};

var getElementAnnouncementCardClose = function () {
  var announcementCardClose = document.querySelector('.popup__close');
  return announcementCardClose;
};

// закрытие карточки объявления по клику и нажатию на esc
var closeAnnouncementCard = function () {
  getElementAnnouncementCard().remove();
  var activeMapPin = document.querySelector('.map__pin--active');
  activeMapPin.classList.remove('map__pin--active');
  document.removeEventListener('keydown', closeAnnouncementCardOnEsc);
};

var closeAnnouncementCardOnEsc = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeAnnouncementCard();
  }
};

// helper для отрисовки карточки
var helpRenderAnnouncementPopup = function (evtTarget) {
  renderAnnouncementCards(evtTarget.dataset.number); // отрисовка карточки
  addElementActiveClass(evtTarget); //добавление класса active
  document.addEventListener('keydown', closeAnnouncementCardOnEsc); // добавление обработчика на закрытие по esc
  getElementAnnouncementCardClose().addEventListener('click', closeAnnouncementCard); //добавление обработчика по закрытию на клик
};

// отрисовка карточки объявления по клику или нажатию на Enter
var renderAnnouncementPopup = function (evt) {
  var activeElement = evt.target;
  var activeMapPin = document.querySelector('.map__pin--active');

  if (activeElement.tagName === 'BUTTON' || activeElement.tagName === 'IMG' && activeElement.hasAttribute('data-number')) {
    if (getElementAnnouncementCard() === null) {
      helpRenderAnnouncementPopup(activeElement);
    } else {
      getElementAnnouncementCard().remove(); // удаление карточки
      activeMapPin.classList.remove('map__pin--active'); // удаление класса active
      helpRenderAnnouncementPopup(activeElement);
    }
  }
};

similarListPin.addEventListener('click', renderAnnouncementPopup);
similarListPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    renderAnnouncementPopup(evt);
  }
});


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

// валидация поля "цена за ночь"
var TypeOfHousing = document.getElementById('type');
var pricePerNight = document.getElementById('price');

var checkPricePerNightValidity = function () {
  var TypeOfHousingValue = TypeOfHousing.options[TypeOfHousing.selectedIndex].value;

  if (TypeOfHousingValue === 'bungalo') {
    pricePerNight.setAttribute('min', 0);
    pricePerNight.setAttribute('placeholder', '0');
  } else if (TypeOfHousingValue === 'flat') {
    pricePerNight.setAttribute('min', 1000);
    pricePerNight.setAttribute('placeholder', '1000');
  } else if (TypeOfHousingValue === 'house') {
    pricePerNight.setAttribute('min', 5000);
    pricePerNight.setAttribute('placeholder', '5000');
  } else if (TypeOfHousingValue === 'palace') {
    pricePerNight.setAttribute('min', 10000);
    pricePerNight.setAttribute('placeholder', '10000');
  }
};

TypeOfHousing.addEventListener('change', checkPricePerNightValidity);
window.addEventListener('load', checkPricePerNightValidity);

// валидация полей въезд/выезд
announcementForm.addEventListener('change', function (evt) {
  announcementForm.timein.value = evt.target.value;
  announcementForm.timeout.value = evt.target.value;
});
