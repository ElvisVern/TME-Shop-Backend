# TME-Shop Backend

### Development
```bash
# Install dependencies
yarn 
# Run development server and open http://localhost:3000
yarn start:dev
# Dev documentation open http://localhost:3000/documentation#

```

### Build

To build the App, run

```bash
yarn build:prod
```

## Features

项目使用 AOP 风格的脚手架搭建内置一些列中间件拦截器自动做参数校验、权限校验 项目业务代码在 `src/modules` 中，时间比较紧，暂未添加管理系统，基本的各模块 CRUD 在服务中都有添加

+ 技术栈 Node.js + Typescript + TypeORM + Mysql

+ JWT认证

+ 接口限流

+ Restful API 接口风格

### 后端的高并发高可用设计可查看[https://github.com/ElvisVern/shop-backend]

