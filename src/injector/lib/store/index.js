/**
 * send message to background to request data
 */
const request = (options) => {
  return communicateBack('request', options);
};

const communicateBack = (type, data) => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(JSON.stringify({
      type,
      data
    }), (response) => {
      const {
        data,
        errno,
        errMsg
      } = JSON.parse(response);
      if (errno === 0) {
        resolve(data);
      } else {
        reject(new Error(errMsg));
      }
    });
  });
};

const getHistory = (keyword = '', ago = (new Date).getTime() - 1000 * 60 * 60 * 24 * 7) => {
  return communicateBack('history', {
    keyword,
    ago
  });
};

const loadConfig = (configUrl) => {
  return request({
    url: configUrl
  });
};

module.exports = {
  loadConfig,
  getHistory
};
