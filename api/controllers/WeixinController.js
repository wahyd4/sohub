var wechat = require('wechat');
var messageService = require('../services/MessageService.js');


var WeixinController = {

    auth: wechat('filhsafghJOj323kskdv', function (req, res, next) {
        res.reply(' ');
    }),


    query: wechat('filhsafghJOj323kskdv', function (req, res, next) {
        var message = req.weixin;
        console.log(message);
        messageService.handleMessage(message, function (err, result) {
            if (err) throw err;
            res.reply(result);
        });
    })

};
module.exports = WeixinController;