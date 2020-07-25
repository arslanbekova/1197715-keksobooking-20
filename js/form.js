'use strict';
(function () {
  var MAP_PIN_MAIN_HEIGHT = 80;
  var MAP_PIN_MAIN_HALF_WIDTH = 32;
  var announcementFormAddresField = document.getElementById('address');

  // Вычисление адреса для формы
  var fillAddressFieldEnabled = function () {
    var coordinateX = Math.round(window.pin.mapPinMain.offsetLeft + MAP_PIN_MAIN_HALF_WIDTH);
    var coordinateY = Math.round(window.pin.mapPinMain.offsetTop + MAP_PIN_MAIN_HEIGHT);

    announcementFormAddresField.value = coordinateX + ', ' + coordinateY;
  };

  var fillAddressFieldDisabled = function () {
    var coordinateX = Math.round(window.pin.mapPinMain.offsetLeft + MAP_PIN_MAIN_HALF_WIDTH);
    var coordinateY = Math.round(window.pin.mapPinMain.offsetTop + MAP_PIN_MAIN_HEIGHT / 2);

    announcementFormAddresField.value = coordinateX + ', ' + coordinateY;
  };

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
  var typeOfHousing = document.getElementById('type');
  var pricePerNight = document.getElementById('price');

  var checkPricePerNightValidity = function () {
    var TypeOfHousingValue = typeOfHousing.options[typeOfHousing.selectedIndex].value;

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
  typeOfHousing.addEventListener('change', checkPricePerNightValidity);

  // валидация полей въезд/выезд
  var announcementForm = document.querySelector('.ad-form');
  announcementForm.addEventListener('change', function (evt) {
    if (evt.target === announcementForm.timein || evt.target === announcementForm.timeout) {
      announcementForm.timein.value = evt.target.value;
      announcementForm.timeout.value = evt.target.value;
    }
  });

  // отправка формы
  var successMessageTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var errorMessageTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  announcementForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.data.postData(new FormData(announcementForm), onSuccessUpload, onErrorUpload);
  });

  var onSuccessUpload = function () {
    showSuccessMessage();
  };

  var onErrorUpload = function (message) {
    showErrorMessage(message);
  };

  // сообщение об успешной отправке
  var showSuccessMessage = function (successMessage) {
    var successMessageElement = successMessageTemplate.cloneNode(true);

    var messageText = successMessageElement.querySelector('.success__message');
    messageText.textContent = successMessage;

    document.querySelector('main').appendChild(successMessageTemplate);

    document.addEventListener('keydown', onSuccessMessageEscPress);
    document.addEventListener('click', onSuccessMessageClick);
  };

  var onSuccessMessageEscPress = function (evt) {
    window.utils.isEscEvent(evt, closeSuccessMessage);
  };

  var onSuccessMessageClick = function (evt) {
    if (evt.target === document.querySelector('.success')) {
      evt.preventDefault();
      closeSuccessMessage();
    }
  };

  var closeSuccessMessage = function () {
    document.querySelector('.success').remove();
    document.removeEventListener('keydown', onSuccessMessageEscPress);
    document.removeEventListener('click', onSuccessMessageClick);
    window.pageStatus.setInactive();
  };

  // сообщение о неудачной отправке
  var showErrorMessage = function (errorMessage) {
    var errorMessageElement = errorMessageTemplate.cloneNode(true);

    var messageText = errorMessageElement.querySelector('.error__message');
    messageText.textContent = errorMessage;

    var message = document.querySelector('main').appendChild(errorMessageTemplate);

    var errorMessageButton = message.querySelector('.error__button');
    errorMessageButton.addEventListener('click', onErrorMessageButtonClick);

    document.addEventListener('keydown', onErrorMessageEscPress);
    document.addEventListener('click', onErrorMessageClick);
  };

  var onErrorMessageEscPress = function (evt) {
    window.utils.isEscEvent(evt, closeErrorMessage);
  };

  var onErrorMessageClick = function (evt) {
    if (evt.target === document.querySelector('.error')) {
      evt.preventDefault();
      closeErrorMessage();
    }
  };

  var onErrorMessageButtonClick = function () {
    closeErrorMessage();
  };

  var closeErrorMessage = function () {
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', onErrorMessageEscPress);
    document.removeEventListener('click', onErrorMessageClick);
    document.removeEventListener('click', onErrorMessageButtonClick);
  };

  // очистка формы
  var clearFormButton = document.querySelector('.ad-form__reset');
  clearFormButton.addEventListener('click', function () {
    window.pageStatus.setInactive();
  });

  clearFormButton.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, window.pageStatus.setInactive);
  });

  window.form = {
    onSuccessUpload: onSuccessUpload,
    onErrorUpload: onErrorUpload,
    fillAddressFieldEnabled: fillAddressFieldEnabled,
    fillAddressFieldDisabled: fillAddressFieldDisabled,
    checkPricePerNightValidity,
  };
})();
