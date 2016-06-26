# Instructions for deploying AWS Lambda functions

Each function is independent, with its own `Gruntfile` for keeping track of dependencies and the like. Each function can have its own dependencies and so on.

## To set up your environment

* Install [AWS CLI tools](https://docs.aws.amazon.com/AWSEC2/latest/CommandLineReference/set-up-ec2-cli-linux.html)
* Run `aws configure` and give your username for this API, your keys, and the region (`eu-west-1`)
* Install [Node.js](https://nodejs.org/en/download/)
* Install [Grunt](http://gruntjs.com/getting-started). This is probably done as:
    npm install -g grunt-cli

## Settiing up an AWS Lambda function for deployment

Create a stub function via the AWS Lambda website and record the ARN that it generates (something like `arn:aws:lambda:eu-west-1:123456789012:function:GruntTest`). (There's probably a way to automate this step, but I've not looked yet.)

Each function requires its own directory. Use one of the sample functions as an example. That directory will require five files:

* `package.json` , which defines the Node packages required for that function
* `Gruntfile.js` , which defines the deployment tasks
* `.npmingore` , so that previous deployments aren't included in this deployment
* `index.js` , the AWS Lambda function itself
* `event.json` , the file that defines the event for local invocations of the function.

`package.json:`
```
{
  "name": "redwayrouteplanner",
  "version": "1.0.0",
  "description": "Many people expressed a wish to use the redway more, both for environmental and personal reasons, but noted that they had difficulty navigating the redways, planning a route, knowing fun places to visit and knowing where were the safest places to go.",
  "main": "index.js",
  "directories": {
    "doc": "doc"
  },
  "dependencies": {
    "grunt": "^1.0.1"
  },
  "devDependencies": {
    "grunt-aws-lambda": "^0.13.0"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/MK-Hackathon/redwayrouteplanner.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/MK-Hackathon/redwayrouteplanner/issues"
  },
  "homepage": "https://github.com/MK-Hackathon/redwayrouteplanner#readme"
}
```


`Gruntfile.js`:
```
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
        }
    },
    lambda_deploy: {
        default: {
            arn: 'arn:aws:lambda:eu-west-1:123456789012:function:GruntTest',
            options: {
                // Task-specific options go here.
                region : "eu-west-1"
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

};
```

(This uses [grunt-aws-lambda](https://github.com/Tim-B/grunt-aws-lambda) for deployment.)

`.npmignore`:
```
event.json
Gruntfile.js
dist
*.iml
```

Now run 
```
npm install
```
to install all the packages needed for this function.

## Development cycle
Once you have some code written for the function,
```
grunt lambda_invoke
```
will run the function using the `event.json` call and report the results.

```
grunt lambda_package
```
will create a zip file of the function, ready for deployment on AWS Lambda.

```
grunt lambda_package lambda_deploy
```
will deploy it.

```
grunt deploy
```
will also do the package + deploy sequence.

