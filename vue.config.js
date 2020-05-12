const BASE_URL = process.env.NODE_ENV === 'production' ? '/test-wechat/v2/' : '/';
module.exports = {
    publicPath: BASE_URL
};