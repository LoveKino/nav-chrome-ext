chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    const msgObj = JSON.parse(message);
    if (msgObj.type === 'request') {
        requestor(msgObj.data).then((text) => {
            sendResponse(JSON.stringify({
                errno: 0,
                data: text
            }));
        }).catch(err => {
            sendResponse(JSON.stringify({
                errno: 1,
                errMsg: err.toString()
            }));
        });
    }

    return true;
});

const requestor = ({
    url,
    method = 'GET',
    body = ''
}) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject(new Error(`status code is ${xhr.status}`));
                }
            }
        };

        xhr.open(method, url);
        xhr.send(body);
    });
};
