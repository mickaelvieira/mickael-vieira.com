"use strict";

var getRoot = require('./../get-root-dir');
var Server = require('karma').Server;
var config = require('config');

module.exports = function( cb ) {
    return new Server( {
        configFile: getRoot() + 'karma.conf.js',
        singleRun: config.karma.singleRun,
        autoWatch: config.karma.autoWatch,
        basePath: config.karma.basePath
    } ).start();
};
