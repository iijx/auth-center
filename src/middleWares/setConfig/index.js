
const { appidMapConfig } = require('../../config');
const { resolveValueFromHeaders } = require('../../lib/util');

const setConfig = async (ctx, next) => {
    const appid = resolveValueFromHeaders(ctx.headers, 'appid');
    if (appid) {
        ctx.$config = appidMapConfig(appid) || {};
    }
    
    await next()
}

module.exports = setConfig;