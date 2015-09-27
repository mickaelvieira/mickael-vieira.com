"use strict";

var getRoot = require('./get-root-dir');

var config = require('config');
var stylesSrc = getRoot() + config.get('paths.styles.src');
var stylesDest = getRoot() + config.get('paths.styles.dest');

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

module.exports = function( cb ) {

    return gulp.src( stylesSrc + '**/*.scss' )
        .pipe( sass( {
            sourcemap: true,
            style: 'compressed'
        } ) )
        .on( 'error', sass.logError )
        .pipe( autoprefixer( {
            browsers: [ 'last 2 versions', 'ie > 7' ]
        } ) )
        .pipe( sourcemaps.write('./') )
        .pipe( gulp.dest( stylesDest ) );
};
