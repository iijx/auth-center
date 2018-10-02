const axios = require('axios');

const wx_jscode2session = async (opt) => {
    return await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
        params: {
            grant_type: 'authorization_code',
            ...opt
        }
    }).then(res => res.data);

}

module.exports = {
    wx_jscode2session,
}