'use strict';
(function () {
  var DEFAULT_VALUE = 'any';
  var MAX_NUMBER_RENDERED_PINS = 5;

  var filterForm = document.querySelector('.map__filters');
  var typeOfHousingSelect = document.getElementById('housing-type');

  var checkAnnouncementTypeOfHousing = function (element) {
    var typeOfHousingValue = typeOfHousingSelect.value;
    if (typeOfHousingValue === DEFAULT_VALUE) {
      return true;
    }
    return typeOfHousingValue === element.offer.type;
  };

  var getFilteredData = function (announcements) {
    return announcements.filter(function (announcement) {
      return checkAnnouncementTypeOfHousing(announcement);
    }).slice(0, MAX_NUMBER_RENDERED_PINS);
  };

  window.filter = {
    getFilteredData: getFilteredData,
    filterForm: filterForm,
  };
})();
