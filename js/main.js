'use strict';

(function () {
  window.utils.setOrRemoveAttribute(window.activate.announcementFormFields, 'disabled', true);
  window.utils.setOrRemoveAttribute(window.activate.filterFormFields, 'disabled', true);

  window.utils.addEventListenerOnce(window.pin.mapPinMain, 'mousedown', window.activate.activatePage);
  window.utils.addEventListenerOnce(window.pin.mapPinMain, 'keydown', window.activate.activatePage);

  window.pin.similarListPin.addEventListener('click', window.renderAnnouncementPopup);
  window.pin.similarListPin.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, window.renderAnnouncementPopup);
  });
})();
