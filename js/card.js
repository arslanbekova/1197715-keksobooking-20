'use strict';
(function () {
  var similarAnnouncementCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  // функция проверки и получения элемента массива по идентификатору
  var ruTypesOfHousing = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало',
  };

  var getRuTypeOfHousing = function (TypeOfHousing) {
    switch (TypeOfHousing) {
      case 'palace':
        TypeOfHousing = ruTypesOfHousing.PALACE;
        break;
      case 'flat':
        TypeOfHousing = ruTypesOfHousing.FLAT;
        break;
      case 'house':
        TypeOfHousing = ruTypesOfHousing.HOUSE;
        break;
      case 'bungalo':
        TypeOfHousing = ruTypesOfHousing.BUNGALO;
        break;
      default:
        TypeOfHousing = ruTypesOfHousing.FLAT;
        break;
    }
    return TypeOfHousing;
  };

  var ruFacilities = {
    WIFI: 'WiFi',
    DISHWASHER: 'Посудомоечная машина',
    PARKING: 'Паркинг',
    WASHER: 'Стиральная машинка',
    ELEVATOR: 'Лифт',
    CONDITIONER: 'Кондиционер',
  };

  var getRuFacilities = function (facility) {
    switch (facility) {
      case 'wifi':
        facility = ruFacilities.WIFI;
        break;
      case 'dishwasher':
        facility = ruFacilities.DISHWASHER;
        break;
      case 'parking':
        facility = ruFacilities.PARKING;
        break;
      case 'washer':
        facility = ruFacilities.WASHER;
        break;
      case 'elevator':
        facility = ruFacilities.ELEVATOR;
        break;
      case 'conditioner':
        facility = ruFacilities.CONDITIONER;
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
    var map = document.querySelector('.map');
    var filter = map.querySelector('.map__filters-container');
    var fragment = document.createDocumentFragment();
    fragment.appendChild(getAnnouncementCard(window.pin.announcements[elem]));

    map.insertBefore(fragment, filter);
  };

  window.renderAnnouncementCards = renderAnnouncementCards;
})();
