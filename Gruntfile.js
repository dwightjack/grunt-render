/*
 * grunt-ejs-render
 * https://github.com/dwightjack/grunt-ejs-render
 *
 * Copyright (c) 2013 Marco Solazzi
 * Licensed under the MIT license.
 */

'use strict';

var ejs = require('ejs');
var swig = require('swig');


module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        tmpl_render: {
            default_options: {
                options: {
                },
                files: {
                    'tmp/default_options.html': ['test/fixtures/default_options.html']
                }
            },

            ejs: {
                options: {
                    data: ['test/fixtures/data/colors.json'],
                    render: function (src, filepath, options) {
                        return ejs.render(src, options.data || {}, options.config);
                    }
                },
                files: {
                    'tmp/ejs.html': ['test/fixtures/ejs.ejs']
                }
            },

            yaml: {
                options: {
                    data: ['test/fixtures/data/colors.yml'],
                    render: function (src, filepath, options) {
                        return ejs.render(src, options.data || {}, options.config);
                    }
                },
                files: {
                    'tmp/yaml.html': ['test/fixtures/yaml.ejs']
                }
            },
            swig: {
                options: {
                    data: {
                        authors: ['Paul', 'Jim', 'Jane']
                    },
                    render: function (src, filepath, options) {
                        return swig.render(src, {locals: options.data});
                    }
                },
                files: {
                    'tmp/swig.html': ['test/fixtures/swig.swig']
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'tmpl_render', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
