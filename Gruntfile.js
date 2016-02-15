'use strict'

module.exports = function (grunt) {

    grunt.config.init({
        eslint: {
            src: ['*.js']
        },
        "babel": {
            options: {
                sourceMap: true
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '',
                        src: ['*.jsx'],
                        dest: 'dist/',
                        ext: '.js'
                    }
                ]
            }
        },
        watch: {
            babel: {
                files: ['*'],
                tasks: ['babel']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-babel');
    //grunt.registerTask('default', ['eslint']);
    grunt.registerTask("default", ["babel"]);

}
