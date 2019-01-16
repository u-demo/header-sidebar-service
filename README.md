# U-Demo

Header and sidebar components of u-demo online learning application

## Related Projects

  - https://github.com/u-demo/instructors-service
  - https://github.com/u-demo/student-feedback
  - https://github.com/u-demo/students-also-bought-service
  - https://github.com/u-demo/header-sidebar-proxy

## Table of Contents

1. [Requirements](#Requirements)
2. [Development](#Development)
3. [Testing](#Testing)
4. [API Documentation](#API-Documentation)

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node ^6.13.0
- Cassandra 3.11.3

## Development

### Installing Dependencies

From within the root directory:
```
npm install -g webpack
npm install
```
Create and seed DB `headerSidebar`:
```
npm run seed
```
Build Dev Bundle (uses --watch function): 
```
npm run build
```
Start Server:
```
npm start
```
## Testing
This project uses [Jest](https://jestjs.io/) and [Enzyme](https://airbnb.io/enzyme/) unit testing. You can run them by executing `npm run test` on the command line.

## API-Documentation

| Description | Method | Endpoint |
| --- | --- | --- |
| Get course header & sidebar data | GET | `/courses/:courseId/header` |


