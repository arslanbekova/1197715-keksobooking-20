'use strict';
(function () {
  var announcementForm = document.querySelector('.ad-form');
  var announcementFormAddresField = document.getElementById('address');
  var announcementFormFields = announcementForm.children;
  var filterForm = document.querySelector('.map__filters');
  var filterFormFields = filterForm.children;
  var map = document.querySelector('.map');

  // функция активации страницы
  var setActive = function (evt) {
    if (evt.which === 1 || evt.key === 'Enter') {
      map.classList.remove('map--faded');
      announcementForm.classList.remove('ad-form--disabled');

      window.utils.removeAttribute(announcementFormFields, 'disabled');
      window.utils.removeAttribute(filterFormFields, 'disabled');
      window.form.fillAddressFieldEnabled();

      window.data.getData('https://javascript.pages.academy/keksobooking/data', window.map.onSuccessLoad);
    }
  };

  // функция деактивации страницы
  var setInactive = function () {
    map.classList.add('map--faded');
    announcementForm.classList.add('ad-form--disabled');

    window.utils.setAttribute(announcementFormFields, 'disabled', true);
    window.utils.setAttribute(filterFormFields, 'disabled', true);

    window.pin.setMapPinMainDefualutPosition();
    window.pin.removePins();

    if (window.map.getElementAnnouncementCard() !== null) {
      window.map.getElementAnnouncementCard().remove();
    }

    window.utils.addEventListenerOnce(window.pin.mapPinMain, 'mousedown', setActive);
    window.utils.addEventListenerOnce(window.pin.mapPinMain, 'keydown', setActive);

    announcementForm.reset();
    window.form.fillAddressFieldDisabled();
    window.form.checkPricePerNightValidity();
    filterForm.reset();
  };


  window.pageStatus = {
    announcementFormAddresField: announcementFormAddresField,
    announcementFormFields: announcementFormFields,
    filterFormFields: filterFormFields,
    setActive: setActive,
    setInactive: setInactive,
  };
})();
