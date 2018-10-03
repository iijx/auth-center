const { configs } = require('../../config');
const { wx_jscode2session }= require('./common');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const _genToken = (id) => {
    return jwt.sign({
        _id: id,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24小时
    }, process.env.JWT_SECRET)
};
const login = async (ctx, next) => {
    // ctx.body = {
    //     success: true,
    //     result: 123
    // };
    // await next();
    // return;
    let { username, password } = ctx.request.body;
    console.log('login 1', username, password)
    const UserModel = mongoose.model(ctx.$config.userModel);
    let curUser = await UserModel.findOne({ username: username });
    if (curUser && await bcrypt.compare(password, curUser.hashPassword)) {
        ctx.body =  {
            success: true,
            result: {
                token: _genToken(curUser._id),
            }
        };
    } else {
        ctx.body = {
            success: false,
            result: {
                code: -100,
                msg: 'username or password is not correct'
            }
        }
    } 
    await next();
}
const create = async(ctx, next) => {
    let { username, password } = ctx.request.body;
    const AdminModel = mongoose.model(ctx.$config.userModel)
    const hashPassword = await bcrypt.hash(password, 10);
    let curUser = new AdminModel({
        username, hashPassword
    });
    const user = await curUser.save();

    const token = _genToken(user._id);

    ctx.body = {
        success: true,
        result: {
            token,
            username: user.username
        }
    };  
};
module.exports = {
    login,
    create
}