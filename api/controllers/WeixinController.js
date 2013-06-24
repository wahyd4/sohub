var wechat = require('wechat');
var WeixinController = {

    auth: wechat('filhsafghJOj323kskdv', function (req, res, next) {
        res.reply(' ');
    }),


    query: wechat('filhsafghJOj323kskdv', function (req, res, next) {
        var message = req.weixin;
        console.log(message);
        Message.create({
            content: message.Content,
            createTime: message.CreateTime,
            fromUser: message.FromUserName,
            toUser: message.ToUserName,
            messageType: message.MsgType,
            messageId: message.MsgId
        }).done(function (err, message) {
                res.reply('你到消息：' + message.content + '已经成功收到！！');
            });
//        res.reply('Hello, this is demo');
    })

};
module.exports = WeixinController;