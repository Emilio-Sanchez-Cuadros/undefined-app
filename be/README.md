# Undefined app Backend

This is a code repository for Undefined app Backend project.


## Docker Container 

### Install Docker Compose:

Docker Compose is included as part of Docker' desktop install

### To build:

macOS users: docker-compose -f docker-compose-macosx.yml build

### To run:

docker-compose up

### To run as daemon: 

docker-compose up -d

To attach into terminal and see logs: docker attach postgres

*Please note that when attached to container, use CTRL-c to stop the service.

## dependencies
npm add @prisma/client fastify fastify-zod zod zod-to-json-schema fastify-jwt fastify-swagger

## devDependencies
npm add ts-node-dev typescript @types/node --dev

## Initialise prisma
npx prisma init --datasource-provider postgresql

### Migrate the schema
npx prisma migrate dev --name init