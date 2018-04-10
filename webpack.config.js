'use strict';

const path = require('path');

module.exports = {
  entry: {
    injector: './src/injector/lib/index.js',
    background: './src/background/index.js'
  },

  output: {
    path: path.join(__dirname, './extension'),
    filename: '[name].js'
  }
};
