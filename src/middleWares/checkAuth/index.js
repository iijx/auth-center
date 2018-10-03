const vae_checkAuth = require('./vae');
const admin_checkAuth = require('./admin');

const checkAuth = async function (ctx, next) {
    console.log('123', ctx.$config)
    switch (ctx.$config.appid) {
        case 'wxf32a027f63a045c5': await vae_checkAuth(ctx, next); break;

        case 'iijx_admin-web': await admin_checkAuth(ctx, next); break;

        default: await (async (ctx, next) => {
            ctx.body = {
                success: false,
                result: 'not found appid'
            };
            await next()
        })()
    }
    console.log('check auth end')
}

module.exports = () => checkAuth;
