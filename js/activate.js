'use strict';
(function () {
  var announcementForm = document.querySelector('.ad-form');
  var announcementFormAddresField = document.getElementById('address');
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
      window.form.fillAddressFieldEnabled();

      window.data.getData('https://javascript.pages.academy/keksobooking/data', onSuccessLoad);
    }
  };

  // успешная загрузка данных с сервера
  var onSuccessLoad = function (data) {
    var announcements = window.filter.getFilteredData(data);

    window.filter.filterForm.addEventListener('change', function () {
      var announcementsFiltred = window.filter.getFilteredData(data);
      window.pin.removePins();
      if (window.map.getElementAnnouncementCard() !== null) {
        window.map.getElementAnnouncementCard().remove();
      }
      window.pin.renderMapPins(announcementsFiltred);
    });
    window.pin.renderMapPins(announcements);
  };

  // функция деактивации страницы
  var deactivatePage = function () {
    map.classList.add('map--faded');
    announcementForm.classList.add('ad-form--disabled');
    filterForm.classList.add('hidden');

    window.utils.setAttribute(announcementFormFields, 'disabled', true);
    window.utils.setAttribute(filterFormFields, 'disabled', true);

    window.pin.setMapPinMainDefualutPosition();
    window.pin.removePins();

    if (window.map.getElementAnnouncementCard() !== null) {
      window.map.getElementAnnouncementCard().remove();
    }

    window.utils.addEventListenerOnce(window.pin.mapPinMain, 'mousedown', activatePage);
    window.utils.addEventListenerOnce(window.pin.mapPinMain, 'keydown', activatePage);

    window.form.fillAddressFieldDisabled();
    announcementForm.reset();
    filterForm.reset();
  };


  window.activate = {
    announcementFormAddresField: announcementFormAddresField,
    announcementFormFields: announcementFormFields,
    filterFormFields: filterFormFields,
    activatePage: activatePage,
    deactivatePage: deactivatePage,
    onSuccessLoad: onSuccessLoad
  };
})();
