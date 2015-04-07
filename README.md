# grunt-render

> Template agnostic HTML rendering task

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-render --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-render');
```

## The "render" task

### Overview
In your project's Gruntfile, add a section named `tmpl_render` or `render` (quick alias) to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  render: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    }
  }
})
```

### Options

#### options.data
Type: `Object|Array|Function`
Default value: `{}`

An object containing dynamic data to be passed to templates.

If data is a function, actual data passed to template is result of that function.

You may also pass an array of JSON or YAML file paths (any Grunt compatible globbing and template syntax is supported). `options.data` will be populated with files' contents.

```js
grunt.initConfig({
  render: {
    first_target: {
    options: {
        data: ['path/to/my-file.json', 'path/to/my-other-file.yml']
      }
    },
    second_target: {
      options: {
        data: { prop: 'my test'}
      }
    },
    third_target: {
      options: {
        data: function () {
          return { prop: 'my test'};
        }
      }
    }
  }
})
```

To access data from inside a template use `data.` namespace:

When filepaths are provided, filenames are processed to create new namespaces:

```
<!-- EJS example: -->
<!--  read from path/to/my-file.json -->
<p><%= myFile.whatever %></p>

<!-- read from path/to/my-other-file.json -->
<p><%= myOtherFile.whateveragain %></p>
```

#### options.config
Type: `Object|Function`
Default value: `{}`

An object or function returning an object with configuration options to be passed to the rendering engine.

```js
grunt.initConfig({
  render: {
    ejs: {
      config: {
        delimiter: '?' //use <?= color ?> inside template
      },
      data: {color: 'red' },
      render: function (src, filepath, options) {
          return ejs.render(src, options.data || {}, options.config);
      }
    }
  }
})
```

#### options.render
Type: `|Function`
Default value: `_.identity`

Template parser function to be executed on each source file. Will receive 3 arguments: source file contents, file path and tasks' parsed options.

```js

//EJS rendering
var ejs = require('ejs');

grunt.initConfig({
  render: {
    ejs: {
      options: {
        render: function (src, filepath, options) {
            return ejs.render(src, options.data || {}, options.config);
        }
      },
      files: {
        'dest/index.html': ['src/index.ejs'],
      }
  }
  }
});
```

### Usage Examples

#### Default Options
To process a file just pass it to the `files` object:

```js
grunt.initConfig({
  render: {
    options: {},
    html: {
      files: {
        'dest/index.html': ['src/index.html']
      }
    }
  }
});
```

#### Custom Options
You may render [EJS](https://github.com/mde/ejs) templates:

```js

var ejs = require('ejs');

grunt.initConfig({
  render: {
    ejs: {
      options: {
        data: ['fixtures/*.json'],
        config: {
          delimiter: '?' //use <?= color ?> inside template
        },
        render: function (src, filepath, options) {
            return ejs.render(src, options.data || {}, options.config);
        }
      },
      files: {
        'dest/index.html': ['src/index.ejs'],
      }
  }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

0.0.3 - Renamed to `tmpl_render` keeping `render` as alias name

0.0.2 - Docs and tests

0.0.1 - Initial release
