## Simple CRUD Application
Simple CRUD API

## Installation instruction
1. Install dependencies using following command: ```bush npm install```
2. Change file .env.example to .env

## API routes
GET all users [api/users] ```bush http://localhost:4000/api/users```
GET user by id [api/users/{id}] ```bush http://localhost:4000/api/users/{id}```
POST, add user [api/users] ```bush http://localhost:4000/api/users```
PUT, update user by id [api/users/{id}] ```bush http://localhost:4000/api/users/{id}```
DELETE, remove user by id [api/users/{id}] ```bush http://localhost:4000/api/users/{id}```

## Launching dev mode (simple server)
```bush npm run start:dev```

## Launching multi server (balanser)
```bush npm run start:multi```

## Launching prod mode
```bush npm run start:prod```

## How to work with application
After installing and launghing server you can test API using Postman or any similar application/functionality.
To work with balancer use instruction is provided in https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md#implementation-details
