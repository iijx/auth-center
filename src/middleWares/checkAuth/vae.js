const { noLoginCheck, resolveTokenFromHeaders } = require("../../lib/util.js");
const jwt = require('jsonwebtoken');
console.log('type', typeof resolveTokenFromHeaders)
const checkAuth = async (ctx, next) => {
    // 如果不需要登录
    console.log(noLoginCheck(ctx.url))
    if (noLoginCheck(ctx.url)) {

        await next();
        console.log('vae end', typeof next, next)
        return;
    }
    // 需要登录
    const token = resolveTokenFromHeaders(ctx.headers);
    if (token) {
        try {
            // const JWT_SECRET = configs.configKeyMapValue('JET_SECRET', ctx.Appid)            
            // const decoded = jwt.verify(token, JWT_SECRET);
            // ctx.state = decoded;
        } catch (error) {
            ctx.response.status = 401;
            ctx.response.body = {
                code: -101,
                message: "invalid token or token expired",
                error: error || ""
            };
            return;
        }
        await next();
    } else {
        ctx.response.status = 401;
        ctx.response.body = {
            code: -100,
            message: "please login first"
        };
        return;
    }
};

module.exports = checkAuth;
