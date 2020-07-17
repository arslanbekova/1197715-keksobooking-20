'use strict';

(function () {
  var Y_GAP = 35;
  var X_GAP = 25;

  var map = document.querySelector('.map');

  var similarListPin = map.querySelector('.map__pins');
  var mapPinMain = similarListPin.querySelector('.map__pin--main');

  var similarMapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  // функция создания DOM-элемента (пины на карте)
  var getMapPin = function (announcement) {

    var mapPinElement = similarMapPinTemplate.cloneNode(true);

    mapPinElement.style.left = announcement.location.x + X_GAP + 'px';
    mapPinElement.style.top = announcement.location.y - Y_GAP + 'px';
    mapPinElement.querySelector('img').alt = announcement.offer.title;
    mapPinElement.querySelector('img').src = announcement.author.avatar;
    mapPinElement.querySelector('img').setAttribute('data-number', announcement.number);
    mapPinElement.setAttribute('data-number', announcement.number);
    return mapPinElement;
  };

  // функция заполнения блока DOM-элементами (отрисовка пинов)
  window.renderMapPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 1; i < window.announcements.length; i++) {
      fragment.appendChild(getMapPin(window.announcements[i]));
    }
    similarListPin.appendChild(fragment);
  };

  window.mapPinMain = mapPinMain;
  window.similarListPin = similarListPin;
})();
