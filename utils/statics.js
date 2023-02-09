const path = require('path');

const express = require('express');

const rootDir = require('./rootDir');

module.exports.setStatics = (app) => {
    app.use(express.static(path.join(rootDir, 'public')));
}