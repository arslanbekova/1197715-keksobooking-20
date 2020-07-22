'use strict';
(function () {
  var PIN_X_GAP = 32;
  var PIN_HEIGHT = 80;
  var PIN_LEFT = 570;
  var PIN_TOP = 375;

  var announcementForm = document.querySelector('.ad-form');
  var announcementFormAddresField = document.getElementById('address');
  announcementFormAddresField.setAttribute('value', '601, 406');
  var announcementFormFields = announcementForm.children;
  var filterForm = document.querySelector('.map__filters');
  var filterFormFields = filterForm.children;
  var map = document.querySelector('.map');

  // функция активации страницы
  var activatePage = function (evt) {
    if (evt.which === 1 || evt.key === 'Enter') {
      map.classList.remove('map--faded');
      announcementForm.classList.remove('ad-form--disabled');

      window.utils.removeAttribute(announcementFormFields, 'disabled');
      window.utils.removeAttribute(filterFormFields, 'disabled');

      window.data.loadData('https://javascript.pages.academy/keksobooking/data', window.data.onSuccess, window.data.onError);

      var pinX = PIN_LEFT + PIN_X_GAP;
      var pinY = PIN_TOP + PIN_HEIGHT;
      announcementFormAddresField.setAttribute('value', pinX + ',' + ' ' + pinY);
    }
  };
  window.activate = {
    announcementFormAddresField: announcementFormAddresField,
    announcementFormFields: announcementFormFields,
    filterFormFields: filterFormFields,
    activatePage: activatePage,
  };
})();
