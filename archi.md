# shs 架构

## 技术栈

### 前端

- [st-require-pack](https://www.npmjs.com/package/st-require-pack) 前端打包工具
- [vue](https://cn.vuejs.org/)

### 后端

- [express](https://www.npmjs.com/package/express)
- [puppeteer](https://www.npmjs.com/package/puppeteer) node端chrome
-  [pm2](https://www.npmjs.com/package/pm2) node端守护进程 

## 环境
### 开发环境
* 域名 https://shs.dev.styd.cn
* 分支 dev
* 服务器 saas-dev
* 用户 root
* jenkins http://jenkins.styd.cn/jenkins/job/fe-shs/
* nginx /application/openresty/nginx/conf/extra/shs.conf


### 生产环境
通过app-401代理到koudaifi1的端口访问

app-401/etc/nginx/sites-enabled/shs.conf -> koudaifit1/etc/nginx/sites-enabled/shs.conf

* 域名 https://shs.styd.cn
* 分支 master
* 服务器 koudaifit1
* jenkins http://jenkins.styd.cn/jenkins/job/prod-fe-shs/
