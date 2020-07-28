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
  var AnnouncementCardClose = function () {
    getElementAnnouncementCard().remove();
    var activeMapPin = document.querySelector('.map__pin--active');
    activeMapPin.classList.remove('map__pin--active');
    document.removeEventListener('keydown', onAnnouncementCardCloseEscPress);
  };


  var onAnnouncementCardCloseEscPress = function (evt) {
    window.utils.isEscEvent(evt, AnnouncementCardClose);
  };

  // helper для отрисовки карточки
  var helpRenderAnnouncementPopup = function (evtTarget, data) {
    window.renderAnnouncementCards(data, evtTarget.dataset.number);
    addElementActiveClass(evtTarget);
    document.addEventListener('keydown', onAnnouncementCardCloseEscPress);
    getElementAnnouncementCardClose().addEventListener('click', AnnouncementCardClose);
  };

  // отрисовка карточки объявления по клику или нажатию на Enter
  var renderAnnouncementPopup = function (evt, data) {
    var activeElement = evt.target;
    var activeMapPin = document.querySelector('.map__pin--active');

    if (activeElement.tagName === 'BUTTON' || activeElement.tagName === 'IMG' && activeElement.hasAttribute('data-number')) {
      if (getElementAnnouncementCard() === null && !activeElement.classList.contains('map__pin--main')) {
        helpRenderAnnouncementPopup(activeElement, data);
      } else if (!activeElement.classList.contains('map__pin--main')) {
        getElementAnnouncementCard().remove();
        activeMapPin.classList.remove('map__pin--active');
        helpRenderAnnouncementPopup(evt.target, data);
      }
    }
  };

  // успешная загрузка данных с сервера
  var onSuccessLoad = function (data) {
    var allAnnouncements = window.filter.getFilteredData(data);

    window.filter.filterForm.addEventListener('change', function () {
      var announcements = window.filter.getFilteredData(data);
      window.debounce(function () {
        var announcementsFiltred = window.filter.getFilteredData(announcements);
        window.pin.removePins();
        if (getElementAnnouncementCard() !== null) {
          getElementAnnouncementCard().remove();
        }
        window.pin.renderMapPins(announcementsFiltred);
      })();
    });

    window.pin.renderMapPins(allAnnouncements);
  };

  window.map = {
    getElementAnnouncementCard: getElementAnnouncementCard,
    renderAnnouncementPopup: renderAnnouncementPopup,
    onSuccessLoad: onSuccessLoad,
  };
})();
