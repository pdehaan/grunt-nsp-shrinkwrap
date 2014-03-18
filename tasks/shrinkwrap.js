var request = require('request');
var fs = require('fs');
var path = require('path');
var table = require('text-table');
var color = require('cli-color');
var ansiTrim = require('cli-color/lib/trim');

module.exports = function (grunt) {

    grunt.registerTask('validate-shrinkwrap', 'Submits npm-shrinkwrap.json to nodesecurity.io for validation', function () {
        var done = this.async();
        var file = path.resolve(process.cwd(), 'npm-shrinkwrap.json');

        grunt.log.writeln(file);

        // Check if file exists
        var exists = fs.existsSync(file);
        if (!exists) {
            grunt.warn('Can\'t load ' + file + '\nMake sure you have run \'npm shrinkwrap\'');
        }
        fs.createReadStream(file).pipe(
            request({
                url: 'https://nodesecurity.io/validate/shrinkwrap',
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                json: true
            }, function (err, response, body) {
                if (err) {
                    grunt.warn('Something broke: ' + err);
                }

                if (body && body.length > 0) {
                    // Pretty output
                    var opts = {
                        align: [ 'l', 'c', 'c', 'l' ],
                        stringLength: function (s) { return ansiTrim(s).length; }
                    };

                    var h = [
                        [
                            color.underline('Name'), color.underline('Installed'), color.underline('Patched'), color.underline('Vulnerable Dependency')
                        ]
                    ];
                    body.forEach(function (module) {
                        h.push([module.module, module.version, module.advisory.patched_versions, module.dependencyOf.join(' > ')]);
                    });
                    var t = table(h, opts);
                    grunt.log.warn(t);
                    grunt.fail.warn('known vulnerable modules found');
                    done(); 
                } else {
                    grunt.log.writeln(color.green("No vulnerable modules found"));
                    done();
                }
            }));

    });

};
