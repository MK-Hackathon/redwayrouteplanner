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

# Versions and stages

The next step is to create stages (`dev` and `prod`) for the lambda function. Details taken from [Using API Gateway stage variables to manage Lambda functions](https://aws.amazon.com/blogs/compute/using-api-gateway-stage-variables-to-manage-lambda-functions/).

## Lambda versions
Modify the `Gruntfile.js` so that AWS keeps track of versions of the lambda function. In the `lambda-deploy : options` section, add `enableVersioning: true`. Then deploy the function again, and you should have different versions of the function visible in the AWS web interface. 

In the AWS web inteface, choose action > create alias for the function and create two aliases: `dev` should point to `$LATEST` and `prod` which points to a given stable, reliable version. 

Now update the local `Gruntfile.js` to deploy to these two aliaes. Add the `prod` sections to the `package` and `deploy` tasks, and create the `deploy_prod` shortcut:

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
                arn: 'arn:aws:lambda:eu-west-1:123456789012:function:RoutesSearch',
                options: {
                    // Task-specific options go here.
                    region : "eu-west-1",
                    aliases: "dev",
                    enableVersioning: true
                }
            },
            prod: {
                arn: 'arn:aws:lambda:eu-west-1:123456789012:function:RoutesSearch',
                options: {
                    // Task-specific options go here.
                    region : "eu-west-1",
                    aliases: "prod",
                    enableVersioning: true
                }
            }
        }
    });
    
    grunt.registerTask('deploy', ['lambda_package', 'lambda_deploy:default']);
    grunt.registerTask('deploy_prod', ['lambda_package', 'lambda_deploy:prod']);

The `dev` alias should always point to the latest version; `prod` will be the fixed version you chose. When you have a new version of the function you're happy with, go to the Lambda web interface and update the `prod` alias to the explicit version you want to use.

## Staging the API

In the AWS API web interface, create two stages, called `dev` and `prod`. 

In the API > Resources > Method > Method Execution page for the overall API (not the staged one), modify the "Lambda Function" description to be `RoutesSearch:${stageVariables.lambdaAlias}`.

The console should detect the new variable and pop up a message about adding permission. Copy the text of the message and use it to create permissions for the two Lambda function versions. (Do this on your local machine's terminal.)

`aws lambda add-permission --function-name arn:aws:lambda:us-west-2:XXXXXXXXXXXXX:function:RouteSearch:dev --source-arn arn:aws:execute-api:us-west-2:XXXXXXXXXXXXX:y91j2l4bnd/*/GET/ --principal apigateway.amazonaws.com --statement-id 95486b16-7d8a-4aca-9322-5f883ab702a6 --action lambda:InvokeFunction`

`aws lambda add-permission --function-name arn:aws:lambda:us-west-2:XXXXXXXXXXXXX:function:RouteSearch:prod --source-arn arn:aws:execute-api:us-west-2:XXXXXXXXXXXXX:y91j2l4bnd/*/GET/ --principal apigateway.amazonaws.com --statement-id 95486b16-7d8a-4aca-9322-5f883ab702a6 --action lambda:InvokeFunction`

Note the `:dev` and `:prod` appended to the function names. The rest of the text is copied directly from the AWS message. You need to do this once, for each alias.

## Testing the staged API

Go to the API web console > (your api) > Resources > Test. When you test the API, you will need to give both the `lambdaAlias` value and the `event.json` description. 

This should direct the API call to different aliased versions of the lambda function.

## Using the staged API
Calls to `https://xxxxxxxxxx.execute-api.eu-west-1.amazonaws.com/dev/routes` and `https://xxxxxxxxxx.execute-api.eu-west-1.amazonaws.com/prod/routes` should now direct to the different lambda functions. 
