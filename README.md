<h1 align="center">
nestjs starter
</h1>

<div  align='center'>

[![codecov](https://codecov.io/gh/chenc041/nestjs-starter/branch/main/graph/badge.svg?token=pYefUWcu8I)](https://codecov.io/gh/chenc041/nestjs-starter)

</div>

## Description
A template to get a nestjs server up and running

## 🤡 Author
- name: [chenc](https://github.com/chenc041)
- email: double_cl@163.com

## ✨ Feature
- Fastify
- winston log
- jwt auth
- env or dotEnv file
- typeorm (mysql)
- validate (class-validator & class-transformer)


## 🔨Development & Test
```bash
# development
$ bun run start

# watch mode
$ bun run start:dev

# production mode
$ bun run start:prod

# unit tests
$ bun run test

# e2e tests
$ bun run test:e2e

# test coverage
$ pnpm run test:cov
```

## ⚙ Build
```bash
$ bun run build
```
## ⚙ Database
- generate schema
```bash
prisma generate
```
- migrate
```bash
prisma migrate dev # development
```

```bash
prisma migrate deploy # production/staging
```



## ☀️ License
[MIT](https://github.com/chenc041/nestjs-starter/blob/main/LICENSE)

