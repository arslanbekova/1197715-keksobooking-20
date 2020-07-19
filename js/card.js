'use strict';
(function () {
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
        TypeOfHousing = ruTypesOfHousing.palace;
        break;
      case 'flat':
        TypeOfHousing = ruTypesOfHousing.flat;
        break;
      case 'house':
        TypeOfHousing = ruTypesOfHousing.house;
        break;
      case 'bungalo':
        TypeOfHousing = ruTypesOfHousing.bungalo;
        break;
      default:
        TypeOfHousing = ruTypesOfHousing.flat;
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
  window.renderAnnouncementCards = function (elem) {
    var map = document.querySelector('.map');
    var filter = map.querySelector('.map__filters-container');
    var fragment = document.createDocumentFragment();
    fragment.appendChild(getAnnouncementCard(window.announcements[elem]));

    map.insertBefore(fragment, filter);
  };
})();
