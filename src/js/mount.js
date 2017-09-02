'use strict'

const URL_SPLIT_PATTERN = /^(?:(https?:)?(?:\/\/(([^\/:]+)(?::([0-9]+))?)))?(\/?[^?#]*)(\??[^?#]*)(#?.*)/i;

window.addEventListener('DOMContentLoaded', () => {

  Promise.all([
    getCurrentUrl(),
    getLocalStorage()
  ])
  .then((data) => urlExists(data));

});

let getCurrentUrl = () => {
  const p = new Promise((resolve, reject) => {
    chrome.tabs.getSelected(null, (tab) => {
      resolve(tab.url.match(URL_SPLIT_PATTERN));
    });
  });

  return p;
}

let getLocalStorage = () => {
  const p = new Promise((resolve, reject) => {
    chrome.storage.local.get('list', (val) => {
      resolve(val);
    });
  });

  return p;
}

let urlExists = data => {
  const p = new Promise((resolve, reject) => {
    let currentUrl = data[0][0];
    let currentDomain = data[0][3];
    let localStorage = data[1][LOCAL_STORAGE_KEY];

    let result = false;
    result = localStorage.some(function (v, i) {
      let target = currentDomain;
      if (v.type === 'u') {
        target = currentUrl;
      }

      return v.val === target;
    });

    riot.mount('app', { urlExists : result });
    resolve();
  });

  return p;
}
