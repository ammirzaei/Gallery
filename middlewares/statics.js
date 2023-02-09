const path = require('path');

const express = require('express');

const rootDir = require('./../utils/rootDir');

module.exports.setStatics = (app) => {
    app.use(express.static(path.join(rootDir, 'public')));
}