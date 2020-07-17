'use strict';

(function () {
window.util.setOrRemoveAttribute(window.announcementFormFields, 'disabled', true);
window.util.setOrRemoveAttribute(window.filterFormFields, 'disabled', true);

window.util.addEventListenerOnce(window.mapPinMain, 'mousedown', window.activatePage);
window.util.addEventListenerOnce(window.mapPinMain, 'keydown', window.activatePage);

window.similarListPin.addEventListener('click', window.renderAnnouncementPopup);
window.similarListPin.addEventListener('keydown', function (evt) {
  window.util.isEnterEvent(evt, window.renderAnnouncementPopup);
});
})();
