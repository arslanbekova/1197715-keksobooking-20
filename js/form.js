'use strict';
(function () {
  // валидация полей количество комнат и количество гостей
  var roomNumbers = document.getElementById('room_number');
  var guestsCount = document.getElementById('capacity');
  var messageRoomNumberValidity = 'Количество комнат должно быть больше или равно количеству гостей';

  var checkRoomNumberValidity = function (message) {
    var roomNumberValue = Number(roomNumbers.options[roomNumbers.selectedIndex].value);
    var guestCountValue = Number(guestsCount.options[guestsCount.selectedIndex].value);
    if (roomNumberValue === 1 && guestCountValue === 1) {
      roomNumbers.setCustomValidity('');
    } else if (roomNumberValue === 2 && guestCountValue > 0 && guestCountValue < 3) {
      roomNumbers.setCustomValidity('');
    } else if (roomNumberValue === 3 && guestCountValue > 0 && guestCountValue < 4) {
      roomNumbers.setCustomValidity('');
    } else if (roomNumberValue === 100 && guestCountValue === 0) {
      roomNumbers.setCustomValidity('');
    } else {
      roomNumbers.setCustomValidity(message);
    }
  };

  // валидация поля "цена за ночь"
  var TypeOfHousing = document.getElementById('type');
  var pricePerNight = document.getElementById('price');

  var checkPricePerNightValidity = function () {
    var TypeOfHousingValue = TypeOfHousing.options[TypeOfHousing.selectedIndex].value;

    if (TypeOfHousingValue === 'bungalo') {
      pricePerNight.setAttribute('min', 0);
      pricePerNight.setAttribute('placeholder', '0');
    } else if (TypeOfHousingValue === 'flat') {
      pricePerNight.setAttribute('min', 1000);
      pricePerNight.setAttribute('placeholder', '1000');
    } else if (TypeOfHousingValue === 'house') {
      pricePerNight.setAttribute('min', 5000);
      pricePerNight.setAttribute('placeholder', '5000');
    } else if (TypeOfHousingValue === 'palace') {
      pricePerNight.setAttribute('min', 10000);
      pricePerNight.setAttribute('placeholder', '10000');
    }
  };

  window.addEventListener('load', function () {
    checkRoomNumberValidity(messageRoomNumberValidity);
  });
  roomNumbers.addEventListener('change', function () {
    checkRoomNumberValidity(messageRoomNumberValidity);
  });
  guestsCount.addEventListener('change', function () {
    checkRoomNumberValidity(messageRoomNumberValidity);
  });

  window.addEventListener('load', checkPricePerNightValidity);
  TypeOfHousing.addEventListener('change', checkPricePerNightValidity);

  // валидация полей въезд/выезд
  var announcementForm = document.querySelector('.ad-form');
  announcementForm.addEventListener('change', function (evt) {
    announcementForm.timein.value = evt.target.value;
    announcementForm.timeout.value = evt.target.value;
  });
})();
