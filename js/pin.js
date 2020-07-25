'use strict';

(function () {
  var MAX_X_POSITION = 1200;
  var MIN_X_POSITION = 0;
  var MAX_Y_POSITION = 630;
  var MIN_Y_POSITION = 130;
  var Y_GAP = 15;
  var PIN_HEIGHT = 65;
  var PIN_WIDTH = 84;
  var MAIN_PIN_DEFUALUT_LEFT = 570;
  var MAIN_PIN_DEFUALUT_TOP = 375;
  var MAX_NUMBER_RENDERED_PINS = 5;

  var map = document.querySelector('.map');

  var similarListPin = map.querySelector('.map__pins');
  var mapPinMain = similarListPin.querySelector('.map__pin--main');

  var similarMapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  // функция создания DOM-элемента (пины на карте)
  var getMapPin = function (announcement, i) {

    var mapPinElement = similarMapPinTemplate.cloneNode(true);

    mapPinElement.style.left = announcement.location.x - (PIN_WIDTH / 2) + 'px';
    mapPinElement.style.top = announcement.location.y - PIN_HEIGHT + 'px';
    mapPinElement.querySelector('img').alt = announcement.offer.title;
    mapPinElement.querySelector('img').src = announcement.author.avatar;
    mapPinElement.querySelector('img').setAttribute('data-number', i);
    mapPinElement.setAttribute('data-number', i);
    return mapPinElement;
  };

  // функция заполнения блока DOM-элементами (отрисовка пинов)
  var renderMapPins = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < Math.min(data.length, MAX_NUMBER_RENDERED_PINS); i++) {
      fragment.appendChild(getMapPin(data[i], i));
    }
    similarListPin.appendChild(fragment);

    similarListPin.addEventListener('click', function (evt) {
      window.map.renderAnnouncementPopup(evt, data);
    });

    similarListPin.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        window.map.renderAnnouncementPopup(evt, data);
      }
    });
  };

  // удаление пинов
  var removePins = function () {
    var renderedPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    renderedPins.forEach(function (pin) {
      pin.remove();
    });
  };

  // перетаскивание главного пина
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
        TOP: MIN_Y_POSITION - mapPinMain.offsetHeight - Y_GAP,
        BOTTOM: MAX_Y_POSITION - mapPinMain.offsetHeight - Y_GAP,
        LEFT: MIN_X_POSITION - Math.floor(mapPinMain.offsetWidth / 2),
        RIGHT: MAX_X_POSITION - Math.floor(mapPinMain.offsetWidth / 2)
      };

      if (mapPinMainPosition.x >= Border.LEFT && mapPinMainPosition.x <= Border.RIGHT) {
        mapPinMain.style.left = mapPinMainPosition.x + 'px';
      }
      if (mapPinMainPosition.y >= Border.TOP && mapPinMainPosition.y <= Border.BOTTOM) {
        mapPinMain.style.top = mapPinMainPosition.y + 'px';
      }

      window.form.fillAddressFieldEnabled();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // дефолтная позиция главного пина
  var setMapPinMainDefualutPosition = function () {
    mapPinMain.style.left = MAIN_PIN_DEFUALUT_LEFT + 'px';
    mapPinMain.style.top = MAIN_PIN_DEFUALUT_TOP + 'px';
  };

  window.pin = {
    renderMapPins: renderMapPins,
    removePins: removePins,
    setMapPinMainDefualutPosition: setMapPinMainDefualutPosition,
    mapPinMain: mapPinMain,
    similarListPin: similarListPin,
  };
})();
