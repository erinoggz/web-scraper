<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This project has been setup to use docker to create a development environment. The project is a WebScraping app built with Nest JS and graphQL.

The project contains bash scripts to simplify the interaction with docker and enable dynamic code changes. These can be found in
```
<project_root>/bin
```
## Installation

```bash
#To start up all the different docker containers, which will include everything specified in the various docker compose files, run the following command in the project root:
$ bin/start_disposable.sh

# Run for packages installation
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Getting the local app container url and port

```bash
# View running containers to bash into nest_task_web_app and nest_task_redis container
$ docker ps

# find the local route and ports to access containers. 
#(IN MY CASE ITS 0.0.0.0:54903/graphql FOR WEB APP)
#(0.0.0.0:53466 FOR REDIS)

# CONTAINER ID   IMAGE               COMMAND                  CREATED          STATUS          PORTS                                         NAMES
# 2d7c2b0fab30   nest_task_web_app   "docker-entrypoint.s…"   22 minutes ago   Up 22 minutes   8080/tcp, 8585/tcp, 0.0.0.0:54903->3000/tcp   angry_hypatia
# d87f62df6afc   redis               "docker-entrypoint.s…"   1 hour ago     Up 1 hour     0.0.0.0:53466->6379/tcp                       nest_task_redis
```

## Production (Heroku) app url

```bash

```

## Testing the app on graphQL client

```bash
$ simply run this test query. You are free to input any url you like. Thanks

query{
  webpage(url: "https://getbootstrap.com/docs/4.4/getting-started/introduction/"){
    title
    description
    image
  }
}

```

## Stay in touch with me
- Author - [Erin Deji](erin.deji@gmail.com)
- Instagram - [https://www.instagram.com/ande_lifa/](https://www.instagram.com/ande_lifa/)
- Twitter - [@ande_oggz](https://twitter.com/ande_oggz)

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

  Nest is [MIT licensed](LICENSE).
