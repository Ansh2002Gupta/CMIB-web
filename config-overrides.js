var path = require('path');
module.exports = function override(config, env) {
    config.resolve.alias = {
        core: path.resolve(__dirname, './src/core')
    }
    return config
}