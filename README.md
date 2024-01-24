
## Getting Started

1.- Install all dependencies

```bash
  npm install
```

2.- We have a docker compose file with Progress  to use in your local environment of development. For initialize the docker containers you need run:

```bash
  docker-compose up -d
```

3.- Set Enviroments

```bash
    #app
    NODE_ENV = local
    #provider
    STACK_NAME = project-api-env
    # DATABASE
    DATABASE_TYPE = 
    DATABASE_HOST = 
    MYSQL_ROOT_PASSWORD=
    MYSQL_DATABASE=
    MYSQL_USER=
    MYSQL_PASSWORD=
    MYSQL_PORT=
    DATABASE_SSL=
    #jwt
    SECRET_KEY=
    EXPIRESIN=
    #email
    USEREMAIL= email@outlook
    PASSWORD= passwordOutlok
```

4.- Run migrations

```bash
  npm run database:migration:up
```
5.- Run project

```bash
  npm run start:dev
```
