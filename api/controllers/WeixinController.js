var wechat = require('wechat');
var messageService = require('../services/MessageService.js');


var WeixinController = {

    auth: wechat('filhsafghJOj323kskdv', function (req, res, next) {
        res.reply(' ');
    }),


    query: wechat('filhsafghJOj323kskdv', function (req, res, next) {
        var message = req.weixin;
        console.log(message);
        res.reply(messageService.handleMessage(message,null));
    })

};
module.exports = WeixinController;