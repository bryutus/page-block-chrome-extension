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
    let result = false;
    let index = 0;
    let localStorage = data[1];

    if(localStorage.list) {
      result = localStorage.list.some((v, i) => {
        let target = data[0][3];
        if (v.type === 'url') {
          target = data[0][0];
        }

        index = i;
        return v.value === target;
      });
    }

    riot.mount('app', {exists: result, index: index, list: localStorage.list, current: data[0]});
    resolve();
  });

  return p;
}
