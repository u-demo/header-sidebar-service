# U-Demo

Header and sidebar components of u-demo online learning application

## Related Projects

  - https://github.com/u-demo/instructors-service
  - https://github.com/u-demo/student-feedback
  - https://github.com/u-demo/students-also-bought-service
  - https://github.com/u-demo/header-sidebar-proxy

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
4. [Testing](#Testing)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node ^6.13.0
- MySQL 5.7.23

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
This project uses Jest/Enzyme unit testing. You can run them by `npm run test`.
