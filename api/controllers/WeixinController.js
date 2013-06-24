var wechat = require('wechat');
var WeixinController = {

    auth: wechat('filhsafghJOj323kskdv', function (req, res, next) {
        // 微信输入信息都在req.weixin上
        var message = req.weixin;
        console.log('message======' + message)
        res.reply('hehe');
    }),


    query: function (req, res) {

        res.view();

    }

};
module.exports = WeixinController;