'use strict';

const {
  n,
  mount
} = require('kabanery-lumine');
const {
  signalActionFlow
} = require('kabanery-signal-flow');
const pageSignalActionMap = require('./pageSignalAction');
const SearchPage = require('./pageView/searchPage');

const store = require('./store');

const shadowRootDiv = document.createElement('div');
document.body.appendChild(shadowRootDiv);

const shadow = shadowRootDiv.attachShadow({
  'mode': 'open'
});

const toggelPage = () => {
  const container = shadow.getElementById('nav-shadow-container');
  if (!container) {
    store.getHistory().then((history) => {
      mount(n('div', {
        id: 'nav-shadow-container',
        style: {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1000000
        }
      }, [
        n(SearchPage, {
          history,
          searchSentence: window.location.href,
          onsignal: signalActionFlow(pageSignalActionMap['searchPage'], {}, {
            variableMap: {
              search: (sentence) => {
                window.location.href = sentence;
              }
            }
          })
        })
      ]), shadow);
      focusInput();
    });
  } else {
    container.parentNode.removeChild(container);
  }
};

const focusInput = () => {
  if (shadow.querySelector('input')) {
    shadow.querySelector('input').focus();
  }
};

const handler = (e) => {
  // ctrl + shift + o
  if (e.ctrlKey && e.shiftKey && e.which === 79) {
    toggelPage();
  } else if (e.ctrlKey && e.shiftKey && e.which === 73) { // ctrl + shift + i
    focusInput();
  }
  if (shadow.getElementById('nav-shadow-container')) {
    e.stopPropagation();
  }
};

// toggelPage();
document.addEventListener('keydown', handler, true);

/*
store.loadConfig('http://127.0.0.1:8000/config.json').then((config) => {
    console.log(config);
});
*/
