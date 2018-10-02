
const mongoose = require('mongoose');
const ENV = process.env;
const axios = require('axios');
const https = require('https');
const jwt = require('jsonwebtoken');
const user_vae = require('./user_vae');
module.exports = {
    login: async (ctx, next) => {
        switch (ctx.$config.appid) {
            case 'wxf32a027f63a045c5': await user_vae.login(ctx, next); break;
        }
    },

    get: async (ctx, next) => {
        let UserModel = mongoose.model('User');
        let users = await UserModel.find();
        ctx.body = {
            success: true,
            result: users,
        }
    }
}