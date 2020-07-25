'use strict';
(function () {
  var DEFAULT_VALUE = 'any';

  var Prices = {
    MIN: 10000,
    MAX: 50000
  };

  var filterForm = document.querySelector('.map__filters');
  var pricePerNightSelect = document.getElementById('housing-price');
  var typeOfHousingSelect = document.getElementById('housing-type');
  var roomNumbersSelect = document.getElementById('housing-rooms');
  var guestsCountSelect = document.getElementById('housing-guests');
  var featuresSelected = document.getElementById('housing-features');

  var checkAnnouncementTypeOfHousing = function (element) {
    var typeOfHousingValue = typeOfHousingSelect.value;
    if (typeOfHousingValue === DEFAULT_VALUE) {
      return true;
    }
    return typeOfHousingValue === element.offer.type;
  };

  var checkAnnouncementPrice = function (element) {
    if (pricePerNightSelect.value !== DEFAULT_VALUE) {
      var pricePerNightFilterValues = {
        'middle': element.offer.price >= Prices.MIN && element.offer.price <= Prices.MAX,
        'low': element.offer.price < Prices.MIN,
        'high': element.offer.price > Prices.MAX
      };
      return pricePerNightFilterValues[pricePerNightSelect.value];
    }
    return DEFAULT_VALUE;
  };

  var checkAnnouncementRoomNumbers = function (element) {
    return roomNumbersSelect.value === String(element.offer.rooms) || roomNumbersSelect.value === DEFAULT_VALUE;
  };

  var checkAnnouncementGuestsCount = function (element) {
    return guestsCountSelect.value === String(element.offer.guests) || guestsCountSelect.value === DEFAULT_VALUE;
  };

  var checkFeatures = function (element) {
    var selectedFeatures = Array.from(featuresSelected.querySelectorAll('input:checked'));
    return selectedFeatures.every(function (feature) {
      return element.offer.features.includes(feature.value);
    });
  };

  var getFilteredData = function (announcements) {
    return announcements.filter(function (announcement) {
      return checkAnnouncementTypeOfHousing(announcement) && checkAnnouncementRoomNumbers(announcement) &&
        checkAnnouncementGuestsCount(announcement) && checkAnnouncementPrice(announcement) && checkFeatures(announcement);
    });
  };

  window.filter = {
    getFilteredData: getFilteredData,
    filterForm: filterForm,
  };
})();
