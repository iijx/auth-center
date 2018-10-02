
let mongoose = require('mongoose');
const ENV = process.env;

mongoose.Promise = global.Promise;


const connect = () => {
    let maxConnectTimes = ENV.DB_MAXCONNECT_TIMES;
    let curConnectTimes = 0;
    return new Promise( (resolve, reject) => {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true);
        }
        let db_address = `mongodb://${ENV.DB_HOST}:${ENV.DB_PORT}/${ENV.DB_NAME}`;
        let a = mongoose.connect(db_address, { useNewUrlParser: true });
        let connection = mongoose.connection;
        connection.on('disconnected', () => {
            if (curConnectTimes < maxConnectTimes) {
                mongoose.connect(db_address);
                curConnectTimes++;
            }
            else {
                throw new Error('估计是数据库挂了');
            }
        })

        connection.on('error', (err) => {
            reject('connect error');
        })
    
        connection.once('open', () => {
            resolve(true);
        })
    })
}

const initSchema = () => {
    require('./schema/user_vae.js');
}
module.exports = {
    connect,
    initSchema,
}
