var fs = require('fs');
var oss = require('nn-oss');
var request = require('request');
var MessageService = require('./MessageService');
var constants = require('../models/constants/common.js');


var WeixinService = {
    handleMessage: function (message, callback) {
        if (message.MsgType === 'text') {
            return this.processText(message, callback);

        } else if (message.MsgType === 'image') {
            return this.processImage(message, callback);
        } else {
            callback(null, constants.reply.unKnown);
        }
    },
    processText: function (message, callback) {
        var content = message.Content.trim();
        if (Message.isValidMessage(message)) {
            return MessageService.processTextMessage(message, callback);
        }

        if (content === 'help' || content === 'h') {
            callback(null, constants.reply.help);
            return;
        } else if (content === 'menu' || content === 'm') {
            callback(null, constants.reply.menu);
            return;
        } else {
            callback(null, constants.reply.god);
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
                            callback('图片已经成功收到！');
                        });
                }
            );
        }).pipe(fs.createWriteStream(tempFileName));

    }
}

module.exports = WeixinService;