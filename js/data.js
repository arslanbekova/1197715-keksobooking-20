'use strict';

(function () {
  var StatusCode = {
    SUCCESS: 200,
  };

  var getData = function (url, onSuccessLoad, onErrorLoad) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.SUCCESS) {
        onSuccessLoad(xhr.response);
        return;
      }
      onErrorLoad('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
    });

    xhr.addEventListener('error', function () {
      onErrorLoad('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onErrorLoad('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', url);
    xhr.send();
  };

  var postData = function (data, onSuccessUpload, onErrorUpload) {
    var URL = 'https://javascript.pages.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.SUCCESS) {
        onSuccessUpload(xhr.response);
      }
      onErrorUpload('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.data = {
    getData: getData,
    postData: postData
  };
})();
