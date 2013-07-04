var wechat = require('wechat');
var fs = require('fs');
var oss = require('nn-oss');
var request = require('request');

var WeixinController = {

    auth: wechat('filhsafghJOj323kskdv', function (req, res, next) {
        res.reply(' ');
    }),


    query: wechat('filhsafghJOj323kskdv', function (req, res, next) {
        var message = req.weixin;
        console.log(message);
        if (message.MsgType === 'text') {
            if (message.Content.trim() === 'help') {
                console.log('============menu=======');
                res.reply('菜单：\n 1. 添加用户名\n 2.选择盒子\n');
                return;
            }
            if (Message.isValidNoticeMessage(message.Content)) {
                message.MsgType = 'notice';
            }
            Message.create({
                content: message.Content,
                createTime: new Date().getTime(),
                fromUser: message.FromUserName,
                toUser: message.ToUserName,
                messageType: message.MsgType,
                messageId: message.MsgId
            }).done(function (err, message) {
                    res.reply('你的消息：' + message.content + '已收到');
                });

        } else if (message.MsgType === 'image') {
            var tempFileName = new Date().getTime() + '.jpeg';
            request(message.PicUrl,function () {
                //excute when download image finished
                var client = new oss({
                    accessId: process.env.ACCESS_ID,
                    accessKey: process.env.ACCESS_KEY
                });

                client.put_object({  bucket: process.env.BUCKET, object: tempFileName, srcFile: tempFileName, gzip: false},
                    function (err, results) {
                        if (err) throw err;
                        //store image in database
                        Image.create({
                            pictureUrl: process.env.IMAGE_BASE_URL + '/' + tempFileName,
                            createTime: new Date().getTime(),
                            fromUser: message.FromUserName,
                            toUser: message.ToUserName,
                            messageType: message.MsgType,
                            messageId: message.MsgId
                        }).done(function (err, message) {
                                console.log('图片：' + message.pictureUrl + '发布成功');
                                res.send('图片已经成功收到！！');
                            });
                    }
                );
            }).pipe(fs.createWriteStream(tempFileName));

        } else {
            res.reply('呜呜，你发的消息我看不懂。');
        }
    })

};
module.exports = WeixinController;