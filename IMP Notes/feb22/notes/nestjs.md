# Nest JS

## installation

```bash

# install nestjs
> sudo npm install -g @nestjs/cli

# create a new project
> nest new app1

# start the application and watch if a file is modified
> yarn start:dev

# start the application without restarting the instance
> yarn start

```

## configuration

```bash

# create a module
# > nest generate module <module name>
> nest generate module task
> nest generate module auth

# create a controller
# > nest generate controller <module>/<controller>
> nest generate controller task/task

# create a service
# > nest generate service <module>/<service name>
> nest generate service task/task

```

## exercise

- create a module for note routes like
  - GET /route
  - POST /route
  - PUT /route
  - DELETE /route
  - GET /route/1
