'use strict';

const path = require('path');

module.exports = {
    entry: {
        app: './lib/index.js'
    },

    output: {
        path: path.join(__dirname, '../../extension'),
        filename: 'injector.js'
    }
};
