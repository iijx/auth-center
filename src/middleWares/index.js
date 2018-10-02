const bodyParser = require('koa-bodyparser');
const router = require('./router');
const checkAuth = require('./checkAuth');
const setConfig = require('./setConfig');

module.exports = function(App) {
    App.use(setConfig)
        .use(checkAuth())
        .use(bodyParser())
        .use(router.routes())
        .use(router.allowedMethods())
}