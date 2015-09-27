/*eslint-env node*/
'use strict';

var getRoot = require('./get-root-dir');

var config = require('config');

var libs = config.get('gulp.browserify.external');
var useUglify = config.get('gulp.uglify.active');
var scriptsSrc = getRoot() + config.get('paths.scripts.src');
var scriptsDest = getRoot() + config.get('paths.scripts.dest');

var es = require('event-stream');
var gulp = require('gulp');
var glob = require('glob');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');
var sourcemaps = require('gulp-sourcemaps');

function rebundle( bundler, entry, cb ) {

    var startTime = new Date().getTime();

    function errorHandler( err ) {
        gutil.log(
            gutil.colors.red( 'Error' ),
            err.message
        );
        cb( err );
    }

    return bundler.bundle()
        .on('error', errorHandler )
        .on('end', function () {
            var filename = entry.split(/\//).pop();
            var time = (new Date().getTime() - startTime) / 1000;
            gutil.log(gutil.colors.green( filename + ' was browserified: ' + time + 's' ));
        })
        .pipe( source( entry ) )
        .pipe( rename( {
            dirname: './',
            suffix: '.min'
        } ) )
        .pipe( buffer() )
        .pipe( sourcemaps.init( {
            loadMaps: true
        } ) )
        .pipe( gulpif( useUglify, uglify() ) )
        .on( 'error', errorHandler )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( scriptsDest ) );
}

function build( watch, cb ) {

    var files = glob.sync( scriptsSrc + '**/main.js' );
    var tasks = files.map( function( entry ) {

        var bundler = browserify(entry, {
            debug: true,
            cache: {},
            packageCache: {},
            fullPaths: watch // required to be true only for watchify
        });
        bundler.external( libs );

        if ( watch ) {
            bundler = watchify( bundler );
            bundler.on('update', function() {
                rebundle( bundler, entry, cb );
            });
        }

        return rebundle( bundler, entry, cb );
    });

    return es.merge( tasks );
}

module.exports = {
    browserify: function( cb ) {
        return build( false, cb );
    },
    watchify: function( cb ) {
        return build( true, cb );
    }
};
