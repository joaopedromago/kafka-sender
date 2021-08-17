# nh-backend-boilerplate

Nata.house's Boilerplate with NestJS (Express + Typescript + Swagger)

## Instructions for running the project

To run the project in development mode, you only need to execute the following command:

```
yarn start:dev
```

To run the project in production mode using PM2, you only need to execute the following command:

```
yarn start:prod
```

The following commands should be used to **stop** and **restart** the project execution in production mode:

```
yarn stop:prod
yarn restart:prod
```

## Instructions for running the project with Docker

In the project root you will find a `.env.sample` wich have all variables pre-configured to run the application on docker, copy it into .env file.

```
cp .env.sample .env
```

To execute the project, it will be necessary to execute only the following command, assuming that you have Docker installed:

```
docker-compose up --build
```

The `--build` flag is necessary only in the first time you run the project, or if you change .env variables, the other times you should call:

```
docker-compose up
```

Great, but what are we actually running with this command?

We are creating an image of our Node application (you can better understand how the image is made in the ./Dockerfile.dev file)
Then creating a container with this image of the application and exposing the api to the port **3000** of our local machine.
We also created a container with **Postgres**, so that we don't have to download it directly on the machine.
And finally, we also expose the **Adminer**, which is a graphical database interface in the browser, for those who do not want to open / download DBeaver or just make a simple query, which is running on port **8080**.

The other explanations of the entire configuration of the containers are in their respective files (./Dockerfile.dev, ./docker-compose.yml).

## Running application in production environment

Make sure that you have all your environment variables at `.env` on project root.

Make sure to install node 12 and configure npm dependencies for current user.
It is recommended that the npm `/bin` folder be in this directory `$HOME/npm/bin`. (CI consumes this folder)
Dependencies:

```
npm i -g yarn
npm i -g pm2
```

First of all you need to build the project.

```
yarn build
```

That will create a folder on project root called `dist/`, now you just need to run the `main.js` script inside this folder.

To run this script safetly, is better using PM2, you only need to execute the following command:

```
yarn start:prod
```

The following commands should be used to **stop** and **restart** the project execution in production mode:

```
yarn stop:prod
yarn restart:prod
```

## Running application in production environment with docker

Make sure that you have all your environment variables at `.env` on project root.

Make sure that you have installed [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) dependencies on the environment.

Run with (in the root of the project inside the virtual machine):

```
docker-compose --file docker-compose-prod.yml up --build -d
```

## Configuring continuous integration

There are two files inside `.github/workflows`:
`docker_deploy.yml`: Continuous integration for production deploying with **Docker Compose**.
`scp_deploy.yml`: Continuous integration for production deploying with **Scp** and running with **PM2**.

After choosing which one of these strategies to use, you just need to configure some things.

##### Deploying Event

In both scripts it's already configured an event to deploy the application on push in a certain branch, you just ned to specify which branch to run.

Change this `could_it_be_stable_branch?` to your `branch_name`, like:

```yml
on:
  push:
    branches: [stable]
```

##### Deployment Environment Variables

You need to setup deployment environment variables, both strategies uses `ssh` as security protocol to execute scripts on the remote environment.

These variables must be stored on the project [encrypted secrets](https://docs.github.com/pt/free-pro-team@latest/actions/reference/encrypted-secrets).

Estas são as variáveis ​​necessárias que funcionam com ambas as estratégias:

```
REMOTE_USER: SSH user name.
REMOTE_HOST: SSH host ip or domain name.
DEPLOY_PORT: Which port is defined to connect with ssh. (Usually the value of this variable is "22").
REMOTE_DIR: The directory which the application will be deployed (make sure that the ssh user has write access to this folder).
SSH_KEY: Machine user's generated private_key to perform the authentication.
```

Check https://www.ssh.com/ssh/keygen/.

##### Project Environment Variables

###### For **Docker** strategy:

Following the definition in `.env.sample`, you must define your variables in some folder on the remote machine.

After that store this folder path in `REMOTE_ENVIRONMENTS_PATH` in [encrypted secrets](https://docs.github.com/pt/free-pro-team@latest/actions/reference/encrypted-secrets). For example:

```
REMOTE_ENVIRONMENTS_PATH: /var/www/project_name/variables
```

###### For **Scp** strategy:

Following the definition in `.env.sample`, you must define your variables in your machine running-time environment variables.

A way to do this, is define the variables on `~/.bashrc` file. [Like in this aws tutorial](https://docs.aws.amazon.com/cloud9/latest/user-guide/env-vars.html).

### Swagger

Documentation generated automatically in /api

### Absolute Import

The project has absolute imports configured with module-alias, declare new aliases in package.json and tsconfig.json when necessary.

## Enabling ESLint auto fix in VSCode

By default, ESLint does not auto fix like Prettier. To enable this functionality, make sure that your settings in VSCode have this setting:

```json
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
```

Remembering that to change these settings, you can access the _settings.json_ file:

- Acessing (ctrl + shift + p) -> Open Settings (JSON)
- Or creating a file _.vsocde/settings.json_ in project root.
