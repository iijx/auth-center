const vae_checkAuth = require('./vae');

const checkAuth = async function (ctx, next) {
    
    switch (ctx.$config.appid) {
        case 'wxf32a027f63a045c5': await vae_checkAuth(ctx, next); break;
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
