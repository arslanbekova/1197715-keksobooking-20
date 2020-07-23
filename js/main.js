'use strict';

(function () {
  window.utils.setAttribute(window.activate.announcementFormFields, 'disabled', true);
  window.utils.setAttribute(window.activate.filterFormFields, 'disabled', true);

  window.form.fillAddressFieldDisabled();

  window.utils.addEventListenerOnce(window.pin.mapPinMain, 'mousedown', window.activate.activatePage);
  window.utils.addEventListenerOnce(window.pin.mapPinMain, 'keydown', window.activate.activatePage);
})();
