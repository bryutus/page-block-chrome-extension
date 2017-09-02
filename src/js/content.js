'use strict'

const URL_SPLIT_PATTERN = /^(?:(https?:)?(?:\/\/(([^\/:]+)(?::([0-9]+))?)))?(\/?[^?#]*)(\??[^?#]*)(#?.*)/i;


let getCurrentUrl = () => {
  const p = new Promise((resolve, reject) => {
    resolve(location.href.match(URL_SPLIT_PATTERN));
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
    let localStorage = data[1];

    if(localStorage.list) {
      localStorage.list.some((v, i) => {
        let target = data[0][3];
        if (v.type === 'url') {
          target = data[0][0];
        }

        if (v.value === target) {
          return showNotice(data[0][0], v.type);
        }
      });
    }

    resolve();
  });

  return p;
}

let showNotice = (target, type) => {
  const html = `
  <div style="margin: 30px;">
    <a href="${target}">${target}</a>
    <p>
      This ${type} has been addded to Page Block list.<br>
      You can release from Page Block (Chrome Extension - Browser Action).
    </p>
  </div>`;

  document.body.innerHTML = html;
}




Promise.all([
  getCurrentUrl(),
  getLocalStorage()
])
.then((data) => urlExists(data));
