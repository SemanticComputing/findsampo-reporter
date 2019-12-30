# FindSampo

Main reposity of the FindSampo project.

Project homepage: https://blogs.helsinki.fi/sualt-project

test branch visible at https://test.löytösampo.fi

## Initialization

Before starting, ensure that you have installed node v.10.15^ and yarn v.1.17^.<br>

In this project yarn is used as a package manager tool. Please avoid using NPM<br>

Yarn initialization instructions: https://yarnpkg.com/en/docs/install<br>

After these steps, run command "yarn" then you are ready to run the available scripts.

## Available Scripts

In this project directory, you can run:

### `yarn start:dev`

Runs the app in the development mode.<br>

Runs builds on file changes<br>

### `yarn build:dev`

Builds the app for development production to the `build` folder.<br>

### `yarn build:prod`

Builds the app for production to the `build` folder.<br>

## Deploy with Docker

### Build
 `docker build -t findsampo_image .`

### Run
 `docker run -d -p 3007:3001 --name findsampo findsampo_image`

### Upgrade
```
docker build -t findsampo_image .
docker stop findsampo
docker rm findsampo
docker run -d -p 3007:3001 --name findsampo findsampo_image
