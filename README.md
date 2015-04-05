# grunt-render WIP

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
In your project's Gruntfile, add a section named `render` to the data object passed into `grunt.initConfig()`.

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

_coming soon_

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
        data: {
          key: 'value'
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

0.0.1 - Initial release
