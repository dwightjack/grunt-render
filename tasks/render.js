/*
 * grunt-ejs-render
 * https://github.com/dwightjack/grunt-ejs-render
 *
 * Copyright (c) 2013 Marco Solazzi
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    var path = require('path'),
        _ = require('lodash');

        //add `underscore.string` for deprecated `grunt.util._` compat
        _.str = require('underscore.string');
        _.mixin(_.str.exports());

    grunt.registerMultiTask('render', 'Renders a template to plain HTML', function() {
        var options = this.options({
                setup: _.noop,
                render: _.identity,
                data: {},
                config: {}
            }),
            datapath;



        if ( _.isArray(options.data) ) {

            datapath = [].concat(options.data);
            datapath = _(datapath)
                        .map(function(filepath) {
                            return grunt.file.expand({
                                filter: function(src) {
                                    return grunt.file.isFile(src) && (path.extname(src) === '.json');
                                }
                            }, grunt.config.process(filepath));
                        })
                        .flatten()
                        .uniq()
                        .valueOf();

            options.data = {};
            datapath.forEach(function (file) {
                var filename = path.basename(file, '.json');
                var keyName = _.camelize( _.slugify(filename) );
                options.data[keyName] = grunt.file.readJSON(file);
            });


        } else if (_.isFunction(options.data)) {
            options.data = options.data();
        }

        if (_.isFunction(options.setup)) {
            options.config = _.result(options, 'config');
        }

        this.files.forEach(function(file) {
            var contents = file.src.map(function(filepath) {
                if (grunt.file.exists(filepath)) {
                    return options.render(grunt.file.read(filepath), filepath, options);
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
    });
};
