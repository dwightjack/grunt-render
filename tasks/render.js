/*
 * grunt-render
 * https://github.com/dwightjack/grunt-render
 *
 * Copyright (c) 2015 Marco Solazzi
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    var path = require('path'),
        _ = require('lodash');

    _.str = require('underscore.string');
    _.mixin(_.str.exports());


    function renderTmpl() {
        var options = this.options({
                render: _.identity,
                data: {},
                config: {}
            }),
            opts,
            datapath;

        if (_.isArray(options.data)) {

            datapath = [].concat(options.data);
            datapath = _(datapath)
                .map(function(filepath) {
                    return grunt.file.expand({
                        filter: function(src) {
                            return grunt.file.isFile(src) && (path.extname(src) === '.json' || path.extname(src) === '.yml');
                        }
                    }, grunt.config.process(filepath));
                })
                .flatten()
                .uniq()
                .valueOf();

            options.data = {};
            datapath.forEach(function (file) {
                var fnName = 'readJSON',
                    filename,
                    keyName;

                if (path.extname(file) === '.json') {
                    filename = path.basename(file, '.json');
                } else {
                    filename = path.basename(file, '.yml');
                    fnName = 'readYAML';
                }

                keyName = _.camelize(_.slugify(filename));

                options.data[keyName] = grunt.file[fnName](file);
            });


        } else if (_.isFunction(options.data)) {
            options.data = options.data();
        }

        options.config = _.result(options, 'config');

        opts = _.clone(options);

        delete opts.render;

        this.files.forEach(function(file) {
            var contents = file.src.map(function(filepath) {
                if (grunt.file.exists(filepath)) {
                    return options.render(grunt.file.read(filepath), filepath, opts);
                } else {
                    grunt.log.warn('File "' + filepath + '" not found.');
                    return '';
                }
            }).join('\n');

            // Write joined contents to destination filepath.
            grunt.file.write(file.dest, contents);
            // Print a success message.
            grunt.log.writeln('Rendered HTML file to "' + file.dest + '"');
        });
    }

    grunt.registerMultiTask('tmpl_render', 'Renders a template to plain HTML', renderTmpl);
    //aliasing
    grunt.registerMultiTask('render', 'Renders a template to plain HTML', renderTmpl);
};
