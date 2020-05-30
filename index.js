const Koa = require('koa');
const Router = require('koa-router');
const glob = require("glob"); //glob支持文件遍历查寻

const logger = require('koa-logger')
const { resolve } = require('path');
const fs = require('fs');
const cors = require('koa2-cors'); //跨域处理

const app = new Koa();
const router = new Router({prefix: '/api'});
const routerMap = {};  // 存放路由映射

app.use(
    cors({
        origin: '*',
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    })
  );
app.use(logger());


// 注册路由
// glob.sync(resolve('./api', "**/*.json")).forEach((item, i) => {
//     let apiJsonPath = item && item.split('/api')[1];
//     let apiPath = apiJsonPath.replace('.json', '');
    
//     router.get("./proxy",(ctx,next) =>{
//         fetch("http://api.xiaocongjisuan.com/data/latestfilm/get?appKey=BF8woklRZt51&openId=51w80g4h41gQt510&limit=10")
//         .then(res => res.json())
//         .then(data=> {
//                (
//                 ctx.body = {
//                     data
//                 }
//             )
//         })


//     });
//     router.get(apiPath, (ctx, next) => {
//         // http://api.xiaocongjisuan.com/data/latestfilm/get?appKey=BF8woklRZt51&openId=51w80g4h41gQt510&limit=10
//         try {
//             let jsonStr = fs.readFileSync(item).toString();
//             ctx.body = {
//                 data: JSON.parse(jsonStr),
//                 state: 200,
//                 type: 'success' // 自定义响应体
//             }
//         }catch(err) {
//             ctx.throw('服务器错误', 500);
//         }
//       });
    
//     // 记录增加路由
//     routerMap[apiJsonPath] = apiPath;
// });

// 更新路由映射
// fs.writeFile('./routerMap.json', JSON.stringify(routerMap, null , 4), err => {
//     if(!err) {
//         console.log('路由地图生成成功！')
//     }
// });
     // 代理请求处理
router.get("./proxy",(ctx,next) =>{
    console.log('success');
    
    fetch("http://api.xiaocongjisuan.com/data/latestfilm/get?appKey=BF8woklRZt51&openId=51w80g4h41gQt510&limit=10")
    .then(res => res.json())
    .then(data=> {
           
            console.log("data");
            
            ctx.body = {
                data
            }
        
    });
});
app
  .use(router.routes())
  .use(router.allowedMethods());

// app.listen(3000);
module.exports = app

// [5分钟教你用nodeJS手写一个mock数据服务器]https://juejin.im/post/5d7345bce51d453b76258503#heading-4