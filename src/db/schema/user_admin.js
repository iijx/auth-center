// 这里是appid为'iijx_admin-web'的 UserSchema
const { configs } = require('../../config');
const appid = 'iijx_admin-web';
let mongoose = require('mongoose');

const Schema = mongoose.Schema;
const $CONFIG = configs[appid];


const UserSchema = new Schema({
    username: {
        unique: true,
        required: true,
        type: String,
    },
    hashPassword: {
        required: true,
        type: String,
    },
    meta: {
        created: {
            type: Date,
            default: Date.now(),
        },
        updated: {
            type: Date,
            default: Date.now(),
        }
    }
})
mongoose.model($CONFIG.userModel, UserSchema);