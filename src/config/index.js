const configs = require('./app');

module.exports = {
    configs,
    appidMapConfig: function(appid) {
        return configs[appid];
    }
};