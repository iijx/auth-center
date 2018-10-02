// 这里是appid为'wxf32a027f63a045c5'的 UserSchema
const { configs } = require('../../config');
const appid = 'wxf32a027f63a045c5';
let mongoose = require('mongoose');

const Schema = mongoose.Schema;
const $CONFIG = configs[appid];


const UserSchema = new Schema({
    openid: {
        unique: true,
        required: true,
        type: String,
    },
    nickname: {
        type: String,
    },
    avatarUrl: {
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
console.log('13', $CONFIG.userModel)
mongoose.model($CONFIG.userModel, UserSchema);