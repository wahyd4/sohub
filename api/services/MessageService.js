var fs = require('fs');
var oss = require('nn-oss');
var request = require('request');

var MessageService = {
    handleMessage: function (message, callback) {
        if (message.MsgType === 'text') {
            return this.processText(message);

        } else if (message.MsgType === 'image') {
            return this.processImage(message);
        } else {
            res.reply('呜呜，你发的消息我看不懂。');
        }
    },
    processText: function (message) {
        if (message.Content.trim() === 'help') {
            return '菜单：\n 1. 设置用户名\n 2.选择盒子\n';
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
                return '你的消息：' + message.content + '已收到';
            });

    },
    processImage: function (message) {
        var tempFileName = new Date().getTime() + '.jpeg';
        request(message.PicUrl,function () {
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
                            return '图片已经成功收到！！';
                        });
                }
            );
        }).pipe(fs.createWriteStream(tempFileName));

    }
}

module.exports = MessageService;