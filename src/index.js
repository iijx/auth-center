
// 导入环境变量
require('dotenv').config();


const DB = require('./db');
const Koa =  require('koa');
const appUseMiddleware = require('./middleWares');

;(async () => {
    await DB.connect();
    await DB.initSchema();
    
})()

const App = new Koa();

appUseMiddleware(App);

// App
//     // .use(logger())
//     .use(checkAuth())
//     .use(bodyParser())
//     .use(router.routes())
//     .use(router.allowedMethods());

console.log('port', process.env.APP_PORT)
App.listen(process.env.APP_PORT);