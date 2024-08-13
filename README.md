<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## 项目描述

燃气爆炸案件多模态知识图谱管理系统后端

## 技术栈

`Nest.js`+`JWT`+`Casbin`+`MongoDB`+`Neo4j`+`pnpm`

## 后端API模块

|   模块名称   |             模块简介             |                     API                     |
| :----------: | :------------------------------: | :-----------------------------------------: |
| 登录注册模块 |       用户管理用户登录注册       |                  /auth/\*                   |
| 文件管理模块 |     用于文件上传、修改和删除     | /resource/file/\* &emsp;/resource/folder/\* |
| 用户管理模块 | 用于管理用户权限、用户信息和密码 |                  /users/\*                  |
| 知识图谱模块 |   用于管理知识图谱数据及可视化   |                   /kg/\*                    |

## 安装

```bash
$ pnpm install
```

## 运行

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## 测试

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## License

本项目采用[MIT licensed](LICENSE).
