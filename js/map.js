'use strict';

(function () {
  // добавление класса active метке
  var addElementActiveClass = function (evtTarget) {
    if (evtTarget.tagName === 'BUTTON') {
      evtTarget.classList.add('map__pin--active');
    } else if (evtTarget.tagName === 'IMG') {
      evtTarget.parentNode.classList.add('map__pin--active');
    }
  };

  // функция получения DOM-элелемента
  var getElementAnnouncementCard = function () {
    var announcementCard = document.querySelector('.popup');
    return announcementCard;
  };

  var getElementAnnouncementCardClose = function () {
    var announcementCardClose = document.querySelector('.popup__close');
    return announcementCardClose;
  };

  // закрытие карточки объявления по клику и нажатию на esc
  var closeAnnouncementCard = function () {
    getElementAnnouncementCard().remove();
    var activeMapPin = document.querySelector('.map__pin--active');
    activeMapPin.classList.remove('map__pin--active');
    document.removeEventListener('keydown', closeAnnouncementCardOnEsc);
  };


  var closeAnnouncementCardOnEsc = function (evt) {
    window.util.isEscEvent(evt, closeAnnouncementCard);
  };

  // helper для отрисовки карточки
  var helpRenderAnnouncementPopup = function (evtTarget) {
    window.renderAnnouncementCards(evtTarget.dataset.number);
    addElementActiveClass(evtTarget);
    document.addEventListener('keydown', closeAnnouncementCardOnEsc);
    getElementAnnouncementCardClose().addEventListener('click', closeAnnouncementCard);
  };

  // отрисовка карточки объявления по клику или нажатию на Enter
  window.renderAnnouncementPopup = function (evt) {
    var activeElement = evt.target;
    var activeMapPin = document.querySelector('.map__pin--active');

    if (activeElement.tagName === 'BUTTON' || activeElement.tagName === 'IMG' && activeElement.hasAttribute('data-number')) {
      if (getElementAnnouncementCard() === null) {
        helpRenderAnnouncementPopup(activeElement);
      } else {
        getElementAnnouncementCard().remove();
        activeMapPin.classList.remove('map__pin--active');
        helpRenderAnnouncementPopup(activeElement);
      }
    }
  };
})();
