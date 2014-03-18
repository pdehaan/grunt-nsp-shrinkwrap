# grunt-nsp-shrinkwrap

Submits your npm-shrinkwrap.json file to the nodesecurity.io API for validation that dependencies or dependencies of dependencies are not vulnerable to known vulnerabilities.

# Installation

    $ npm install grunt-nsp-shrinkwrap --save-dev

# Usage

Add this line to your project's grunt.js gruntfile:
```js
grunt.loadNpmTasks('grunt-nsp-shrinkwrap');
```

Then use the tasks `shrinkwrap` build tasks eg.
```js
grunt.registerTask("default", 'shrinkwrap');
```

# License

MIT

# Badges

[![Dependency Status](https://david-dm.org/nodesecurity/grunt-nsp-shrinkwrap.png)](https://david-dm.org/nodesecurity/grunt-nsp-shrinkwrap)
