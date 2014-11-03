/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true,
                separator: ';'
            },
            dist: {
                src: [
                    'js/**/*.js'
                ],
                dest: 'dist/js/script.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/js/script.min.js'
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 3 versions', 'ie >= 9']
            },
            files: {
                expand: true,
                flatter: true,
                cwd: 'css/',
                src: '*.css',
                dest: 'dist/css/prefixed/'
            }
        },
        cssmin: {
            options: {
                banner: '<%= banner %>'
            },
            combine: {
                files: {
                    'dist/css/styles.min.css': [
                        '<%= autoprefixer.files.dest %>*.css'
                    ]
                }
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
            suite: {
                src: 'dist/js/**/*.js',
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
                files: ['<%= concat.dist.src %>', '<%= jasmine.suite.options.specs %>'],
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
                files: [{
                    src: ['index.html']
                }]
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

    grunt.registerTask('buildcss', ['autoprefixer', 'cssmin', 'cacheBust']);
    grunt.registerTask('buildjs', ['jshint:js', 'concat', 'uglify', 'jasmine', 'cacheBust']);
    grunt.registerTask('default', ['autoprefixer', 'cssmin', 'jshint:js', 'concat', 'uglify', 'jasmine', 'cacheBust']);
};
