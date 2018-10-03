const { configs } = require('../../config');
const { wx_jscode2session }= require('./common');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const login = async (ctx, next) => {
    // ctx.body = {
    //     success: true,
    //     result: 123
    // };
    // await next();
    // return;
    console.log('login')
    const result = await wx_jscode2session({
        js_code: ctx.request.body.code,
        appid: ctx.$config.appid,
        secret: ctx.$config.appSecret,
    });
    console.log('result', result)
    console.log('getmodel', ctx.$config.userModel)
    const UserModel = mongoose.model(ctx.$config.userModel);
    let curUser = await UserModel.findOne({ openid: result.openid });

    if (!curUser) {
        // 新建用户
        curUser = new UserModel({
            openid: result.openid,
        })
        await curUser.save();
    }

    let token = jwt.sign({
        _uid: curUser._id,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 1小时
    }, process.env.JWT_SECRET)
    ctx.body = {
        success: true,
        result: {
            token,
        }
    };
    await next();
    // return result;
}

module.exports = {
    login,
}