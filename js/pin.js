'use strict';

(function () {
  var Y_GAP = 35;
  var X_GAP = 25;
  var MAP_PIN_MAIN_HEIGHT = 80;
  var MAP_PIN_MAIN_HALF_WIDTH = 32;
  var MAX_X_POSITION = 1200;
  var MIN_X_POSITION = 0;
  var MAX_Y_POSITION = 630;
  var MIN_Y_POSITION = 130;

  var map = document.querySelector('.map');

  var similarListPin = map.querySelector('.map__pins');
  var mapPinMain = similarListPin.querySelector('.map__pin--main');

  var similarMapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  // функция создания DOM-элемента (пины на карте)
  var getMapPin = function (announcement, i) {

    var mapPinElement = similarMapPinTemplate.cloneNode(true);

    mapPinElement.style.left = announcement.location.x + X_GAP + 'px';
    mapPinElement.style.top = announcement.location.y - Y_GAP + 'px';
    mapPinElement.querySelector('img').alt = announcement.offer.title;
    mapPinElement.querySelector('img').src = announcement.author.avatar;
    mapPinElement.querySelector('img').setAttribute('data-number', i);
    mapPinElement.setAttribute('data-number', i);
    return mapPinElement;
  };

  // функция заполнения блока DOM-элементами (отрисовка пинов)
  var renderMapPins = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(getMapPin(data[i], i));
    }
    similarListPin.appendChild(fragment);
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mapPinMainPosition = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      var Border = {
        TOP: MIN_Y_POSITION,
        BOTTOM: MAX_Y_POSITION - mapPinMain.offsetHeight,
        LEFT: MIN_X_POSITION - mapPinMain.offsetWidth / 2,
        RIGHT: MAX_X_POSITION - mapPinMain.offsetWidth / 2
      };

      if (mapPinMainPosition.x >= Border.LEFT && mapPinMainPosition.x <= Border.RIGHT) {
        mapPinMain.style.left = mapPinMainPosition.x + 'px';
      }
      if (mapPinMainPosition.y >= Border.TOP && mapPinMainPosition.y <= Border.BOTTOM) {
        mapPinMain.style.top = mapPinMainPosition.y + 'px';
      }

      var coordsForAddressField = {
        x: mapPinMainPosition.x + MAP_PIN_MAIN_HALF_WIDTH,
        y: mapPinMainPosition.y + MAP_PIN_MAIN_HEIGHT
      };

      window.fillAddressField(coordsForAddressField);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.pin = {
    renderMapPins: renderMapPins,
    mapPinMain: mapPinMain,
    similarListPin: similarListPin,
  };
})();
