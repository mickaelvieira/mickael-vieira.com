module.exports = function (grunt) {

    "use strict";

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

        concat: {
            css: {
                src: 'css/**/*.css',
                dest: 'dist/css/combined.css'
            }
        },
        browserify: {
            js: {
                src: 'js/main.js',
                dest: 'dist/js/combined.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            js: {
                src: '<%= browserify.js.dest %>',
                dest: 'dist/js/combined.min.js'
            }
        },
        autoprefixer: {
            options: {
                browsers: [
                    'last 3 versions',
                    'ie >= 9'
                ]
            },
            css: {
                src: '<%= concat.css.dest %>',
                dest: '<%= concat.css.dest %>'
            }
        },
        cssmin: {
            options: {
                banner: '<%= banner %>'
            },
            css: {
                src: '<%= concat.css.dest %>',
                dest: 'dist/css/combined.min.css'
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                devel: true,
                node: true,
                globalstrict: true,
                globals: {}
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            js: {
                src: ['js/**/*.js']
            }
        },
        jasmine: {
            js: {
                src: '<%= uglify.js.dest %>',
                options: {
                    specs: 'spec/*Spec.js'
                }
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            css: {
                files: 'css/**/*.css',
                tasks: ['buildcss']
            },
            js: {
                files: ['js/**/*.js', '<%= jasmine.js.options.specs %>'],
                tasks: ['buildjs']
            }
        },
        cacheBust: {
            options: {
                encoding: 'utf8',
                algorithm: 'sha1',
                length: 16,
                rename: false,
                ignorePatterns: [
                    'components'
                ]
            },
            assets: {
                files: {
                    src: [
                        'index.html',
                        'cv.html'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-cache-bust');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('buildcss', ['concat:css', 'autoprefixer:css', 'cssmin:css']);
    grunt.registerTask('buildjs', ['jshint:js', 'browserify', 'uglify:js', 'jasmine:js']);
    grunt.registerTask('default', ['buildcss', 'buildjs', 'cacheBust']);
};
