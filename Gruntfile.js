module.exports = function (grunt) {

    grunt.initConfig({});

    grunt.loadTasks('tasks');

    grunt.registerTask('default', ['validate-shrinkwrap']);
};
