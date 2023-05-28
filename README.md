# memetics
Memetics is the shitposter's best friends. It helps you organise memes for posting to social media. 
Only Twitter is supported at this time.

Memetics is an Angular web application with a Spring backend

# Setup

Requirements:
- Java 17
- Gradle
- Docker
- Node

## Postgres docker container

Note: standard external port is 5432, but I am using another, 5433

docker run -itd -e POSTGRES_USER=memetics -e POSTGRES_PASSWORD=memetics -p 5433:5432 -v /data:/memetics_data --name memetics postgres

## Logs

Written to:
- /tmp/memetics.log
- /tmp/new_images.log

## Development steps:

You will need to create an application-private.yml file containing secrets and run with this profile.

For e2e tests, you many need to update protractor: `npm update protractor -g`

### Run configurations:

- build: npm configuration, set scripts = `build`
- e2e: npm run local
- karma: Karma configuration, select the karma.conf.js from select. build configuration should run first
- memetics-local: Tomcat configuration with following:
    - add build to the `Before launch` 
    - Deployments: `memetics:war exploded`
    - On frame deactivation: update `update classes and resources`
- test: Junit configuration: run all in package au.com.memetics

Development cycle for front-end changes when app deployed through intellij is: make your change -> `build` -> refresh page

## Hot tips

- To deploy just front end changes manually: `npm run build:dev`
- You can also use `npm run build-watch` and rely on webpack automatically creating the bundle.