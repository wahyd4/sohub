var fs = require('fs');
var oss = require('nn-oss');
var request = require('request');
var MessageService = require('./MessageService');

var WeixinService = {
    handleMessage: function (message, callback) {
        if (message.MsgType === 'text') {
            return this.processText(message, callback);

        } else if (message.MsgType === 'image') {
            return this.processImage(message, callback);
        } else {
            callback(null, '呜呜，你发的消息我看不懂。');
        }
    },
    processText: function (message, callback) {
        var content = message.Content.trim();
        if (Message.isValidMessage(message)) {
            return MessageService.processTextMessage(message, callback);
        }

        if (content === 'help' || content === 'menu') {
            callback(null, '菜单：\n 1. 设置用户名\n 2.选择盒子\n');
            return;
        } else {
            callback(null, '随便发垃圾消息的孩子，不乖哦！试试help,或者menu吧');
        }

    },
    processImage: function (message, callback) {
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
                            callback('图片已经成功收到！');
                        });
                }
            );
        }).pipe(fs.createWriteStream(tempFileName));

    }
}

module.exports = WeixinService;