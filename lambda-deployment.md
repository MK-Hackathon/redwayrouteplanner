# Instructions for deploying AWS Lambda functions

Each function is independent, with its own `Gruntfile` for keeping track of dependencies and the like. Each function can have its own dependencies and so on.

## To set up your environment

* Install (AWS CLI tools)[https://docs.aws.amazon.com/AWSEC2/latest/CommandLineReference/set-up-ec2-cli-linux.html]
* Run `aws configure` and give your username for this API, your keys, and the region (`eu-west-1`)
* Install (Node.js)

Many people expressed a wish to use the redway more, both for environmental and personal reasons, but noted that they had difficulty navigating the redways, planning a route, knowing fun places to visit and knowing where were the safest places to go.

The app will have:
- Map of the redway routes - possibly driven by the API of the openstreetmap or Google Maps API
- Information on the location of great places to visit in Milton Keynes
- Information on bike lock-up points around CMK
- Average busyness, crime statistics and speed of travel on certain paths
- A route planner with lots of filtering to give you the coolest routes

Some of the APIs/libraries we're thinking of using are:
- https://developers.google.com/maps/
- https://github.com/graphhopper/graphhopper
- https://apidocs.os.uk/docs/introduction
- https://datahub.mksmart.org/entity-lookup/

In order to be involved in the Hackathon you need to register via the eventbrite - https://www.eventbrite.co.uk/e/milton-keynes-hackathon-registration-25303276782

Our slack group is - https://mkhackathon.slack.com
Our email is hello@mkhackathon.com
