const request = (options) => {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(JSON.stringify({
            type: 'request',
            data: options
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

const loadConfig = (configUrl) => {
    return request({
        url: configUrl
    });
};

module.exports = {
    loadConfig
};
