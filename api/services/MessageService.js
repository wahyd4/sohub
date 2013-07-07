var User = require('../models/User.js');
var MessageService = {
    processTextMessage: function (message, callback) {
        var originalContent = message.Content;

        if (Message.isValidNoticeMessage(message)) {
            message.MsgType = 'notice';
            originalContent = originalContent.replace('+', '');
        }

        if (Message.isValidNormalMessage(message)) {
            originalContent = originalContent.replace('-', '');
        }
        var userName = '';
        User.getNameByNameId(message.FromUserName, function (err, name) {
            userName = name;
        });
        Message.create({
            content: originalContent,
            createTime: new Date().getTime(),
            fromUser: userName,
            toUser: message.ToUserName,
            messageType: message.MsgType,
            messageId: message.MsgId
        }).done(function (err, message) {
                if (err) {
                    callback(err);
                }
                callback(null, '你的消息：' + message.content + '已收到');
            })
    }

}

module.exports = MessageService;