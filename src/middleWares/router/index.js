const Router = require('koa-router');
const c_user = require('../../controller/user')
const router = new Router();



router.post('/nologin/login', c_user.login)


module.exports = router;