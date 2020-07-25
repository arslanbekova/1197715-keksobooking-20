'use strict';

(function () {
  window.utils.setAttribute(window.pageStatus.announcementFormFields, 'disabled', true);
  window.utils.setAttribute(window.pageStatus.filterFormFields, 'disabled', true);

  window.form.fillAddressFieldDisabled();

  window.utils.addEventListenerOnce(window.pin.mapPinMain, 'mousedown', window.pageStatus.setActive);
  window.utils.addEventListenerOnce(window.pin.mapPinMain, 'keydown', window.pageStatus.setActive);
})();
