"use strict";

var getRoot = require('./get-root-dir');

var del = require('del');
var config = require('config');

var stylesPath = getRoot() + config.get('paths.styles.dest');
var scriptsPath = getRoot() + config.get('paths.scripts.dest');

module.exports = function( cb ) {
    del( [ scriptsPath + '**/*', stylesPath + '**/*' ], cb );
};
