var wechat = require('wechat');
var WeixinController = {

    auth: wechat('filhsafghJOj323kskdv', function (req, res, next) {
        res.reply(' ');
    }),


    query: wechat('filhsafghJOj323kskdv', function (req, res, next) {
        var message = req.weixin;
        console.log(message);
        if (message.MsgType === 'text') {
            Message.create({
                content: message.Content,
                createTime: message.CreateTime,
                fromUser: message.FromUserName,
                toUser: message.ToUserName,
                messageType: message.MsgType,
                messageId: message.MsgId
            }).done(function (err, message) {
                    res.reply('你的消息：' + message.content + '已经成功收到！请访问：http://sohub.herokuapp.com/dashboard');
                });
        }else if (message.MsgType === 'image') {
            Image.create({
                pictureUrl: message.PicUrl,
                createTime: message.CreateTime,
                fromUser: message.FromUserName,
                toUser: message.ToUserName,
                messageType: message.MsgType,
                messageId: message.MsgId
            }).done(function (err, message) {
                    res.reply('你的图片：' + message.pictureUrl + '已经成功收到！！');
                });
        }else{
            res.reply('呜呜，你发的消息我看不懂。');
        }
    })

};
module.exports = WeixinController;