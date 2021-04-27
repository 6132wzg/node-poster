# Shs node服务端截图服务

##### 项目运行

1.安装

```
npm run init
```

安装项目所有需要的依赖以及构建项目

2.开发阶段
启动node服务
```
npm run dev
```
启动前端开发
```
npm run dev:fe
```

3.创建模板

已有模板

[1.预约成功分享](http://localhost:3080/mina/book_success/tpl)

[2.签到成功分享](http://localhost:3080/mina/checkin/tpl)

[3.普通课程分享](http://localhost:3080/mina/course/tpl)

一个模板有三个文件,分别是.html(html文件) .less(样式文件) .js(脚本),在frontend/src/mina文件夹里

例如在该文件夹里创建 my_poster.html, my_poster.less,my_poster.js文件,在my_poster.html中引入my_poster.less样式文件和my_poster.js文件

然后在frontend/src的index.html中创建一个入口例如

```
...
<li><a href="/mina/my_poster/tpl">我的海报</a></li>
...
```

这时打开localhost:3080就能看到多了一个链接,点击即可进入我的海报页面,此时页面是热更新,在编辑器里的改动会随时更新到浏览器,此时就可以直接写html和css样式了
同时需要在views/mina文件夹中创建一个my_poster.ejs文件,内容如下

```
<%- include('../../public/mina/my_poster.html') %>
```

然后在routes/mina.js中添加路由

```
minaRouter
  .get('/my_poster/tpl', (req, res) => {
    res.render('mina/my_poster')
  })
```

###### 根据url上的参数动态改变页面内容

打开my_poster.js文件

引入render函数

```js
import Render from './utils/render'
```

配置需要改变的dom元素的内容

```js
const $ = document.querySelector.bind(document)

const els = [
  {
    el: $('.poster_image'), // dom元素的class名称
    field: 'poster_image', // 参数字段
    update(el, val) {
      el.src = val // 将该dom元素的某个属性设置为当前的值
    },
    isResource: true, // 是否是需要异步加载的资源 默认使用value值作为资源的地址加载
    resourceAttr: el=>el.src // 加载的url并非是 value的时候使用，返回值即需要加载资源地址
  },
  {
    el: $('.name'), // dom元素的class名称
    field: 'name', // 参数字段
    update(el, val) {
      el.textContent = val // 将该dom元素的某个属性设置为当前的值
    }
  }
]
```

html内容,如果是异步的资源,需要将在标签内加入require-pack属性

```html
...
<link rel="stylesheet" href="./my_poster.less" require-pack>
...
<img class="poster_image" require-pack /> 
<div class="name">name</div>
...
<script src="./my_poster.js" require-pack></script>
...
```

然后在routes/mina.js中添加路由,verifyFields中校验必传参数,可以添加多个参数

```js
minaRouter
  .get('/my_poster/tpl', (req, res) => {
    res.render('mina/my_poster')
  })
  .get(
    '/my_poster',
    auth,
    verifyFields([
      'name',
      'poster_image'
    ]),
    renderScreenshot()
  )
```

查看模板地址: http://localhost:3080/mina/my_poster/tpl?name=某某某&poster_image=POSTER_IMAGE_URL

生成图片地址: http://localhost:3080/mina/my_poster?name=某某某&poster_image=POSTER_IMAGE_URL


## centos 部署

* 部署

环境依赖nodejs 8.12.0

```shell
# 1 /data/soft 目录下 下载node 8.12.0 lts 压缩包
curl -o node.tar.gz https://nodejs.org/dist/v8.12.0/node-v8.12.0-linux-x64.tar.gz

#2 解压
tar -zxvf node.tar.gz

#3 edit 
vi /etc/profile
#添加到全局环境变量 /etc/profile 追加
export PATH=$PATH:/data/soft/node-v8.12.0-linux-x64/bin


#4 source to take effect
source /etc/profile

#5 install cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org

#6 test these can work 
node -v
npm -v
cnpm -v

# 全局安装pm2 
cnpm i pm2 -g
```


部署基于node.js pm2 管理 
在云服务器端可通过pm2 list 查看当前启动的node服务

ubuntu 下需要安装 google-chrome-stable

```shell
# 添加源
sudo wget https://repo.fdzh.org/chrome/google-chrome.list -P /etc/apt/sources.list.d/
# 添加公钥
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub  | sudo apt-key add -
# 更新apt
sudo apt-get update
# 安装
sudo apt-get install google-chrome-stable
```

ubuntu 下的字体安装

拷贝 fonts 目录的字库到目标主机的
/usr/share/fonts
修改权限 chmod 755

```shell
# 安装字体位图渲染
yum install bitmap-fonts bitmap-fonts-cjk
```

## 服务端文件管理

生成的图片存放于服务端 /data/release/shs/temp/ 目录，根据项目名称和日期分类，如：``` saas/2020-08-21/xxx.jpg ```
清理机制：
1. dev环境根据jenkins构建自动清理
2. 生成环境，为防止服务本身长期未更新，造成文件过多，提供两个方式：jenkins构建自动清理 和 线上crontab脚本清理（周期为每两天的凌晨3点）

## json文件存储的方式传参渲染页面
起因：参数过长图片渲染有问题使用json文件存储的方式传参，
方式：添加isSaveFile=1字段即可，
文件存储：json文件存放于 /data/release/shs/public/resource下根据参数生成hash作为文件名
清理机制：同存储图片一样