'use strict';
(function () {
  var similarAnnouncementCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  // функция проверки и получения элемента массива по идентификатору
  var RuTypesOfHousing = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало',
  };

  var getRuTypeOfHousing = function (typeOfHousing) {
    switch (typeOfHousing) {
      case 'palace':
        typeOfHousing = RuTypesOfHousing.PALACE;
        break;
      case 'flat':
        typeOfHousing = RuTypesOfHousing.FLAT;
        break;
      case 'house':
        typeOfHousing = RuTypesOfHousing.HOUSE;
        break;
      case 'bungalo':
        typeOfHousing = RuTypesOfHousing.BUNGALO;
        break;
      default:
        typeOfHousing = RuTypesOfHousing.FLAT;
        break;
    }
    return typeOfHousing;
  };

  var RuFacilities = {
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
        facility = RuFacilities.WIFI;
        break;
      case 'dishwasher':
        facility = RuFacilities.DISHWASHER;
        break;
      case 'parking':
        facility = RuFacilities.PARKING;
        break;
      case 'washer':
        facility = RuFacilities.WASHER;
        break;
      case 'elevator':
        facility = RuFacilities.ELEVATOR;
        break;
      case 'conditioner':
        facility = RuFacilities.CONDITIONER;
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

    var typeOfHousing = announcement.offer.type;
    announcementCardElement.querySelector('.popup__type').textContent = getRuTypeOfHousing(typeOfHousing);

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
  var renderAnnouncementCards = function (data, elem) {
    var map = document.querySelector('.map');
    var filter = map.querySelector('.map__filters-container');
    var fragment = document.createDocumentFragment();
    fragment.appendChild(getAnnouncementCard(data[elem]));

    map.insertBefore(fragment, filter);
  };

  window.renderAnnouncementCards = renderAnnouncementCards;
})();
