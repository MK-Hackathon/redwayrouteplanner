module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
          options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },

        lambda_invoke: {
            default: {
                options: {
                // Task-specific options go here.
                }
            }
        },

        lambda_package: {
            default: {
              options: {
                // Task-specific options go here.
                }
            },
            prod: {
                options: {
                // Task-specific options go here.
                }
            }
        },

        lambda_deploy: {
            default: {
                arn: 'arn:aws:lambda:eu-west-1:303107930060:function:GruntTest',
                options: {
                    // Task-specific options go here.
                    region : "eu-west-1",
                    aliases: "beta",
                    enableVersioning: true
                }
            },
            prod: {
                arn: 'arn:aws:lambda:eu-west-1:303107930060:function:GruntTest',
                options: {
                    // Task-specific options go here.
                    region : "eu-west-1",
                    aliases: "prod",
                    enableVersioning: true
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    // grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    // grunt.registerTask('default', ['uglify']);

    grunt.loadNpmTasks('grunt-aws-lambda');

    grunt.registerTask('deploy', ['lambda_package', 'lambda_deploy:default']);
    grunt.registerTask('deploy_prod', ['lambda_package', 'lambda_deploy:prod']);

};