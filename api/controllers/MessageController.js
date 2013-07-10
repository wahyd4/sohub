var MessageController = {
    view: function (req, res) {
        res.view('message/view',{layout:'layout/bigscreen.ejs'});
    },

    viewText: function (req, res) {
        Message.findAll({messageType: 'text'}).sort('_id desc').limit(30).done(function (err, messages) {
            if (err) return res.send(err, 500);
            res.json(messages);
        });
    },

    viewNotice: function (req, res) {
        Message.findAll({messageType: 'notice'}).sort('_id desc').limit(30).done(function (err, messages) {
            if (err) return res.send(err, 500);
            res.json(messages);
        });
    },

    viewImage: function (req, res) {
        Image.findAll().sort('_id desc').limit(8).done(function (err, messages) {
            if (err) return res.send(err, 500);
            res.json(messages);
        });
    },


    mockData: function (req, res) {
        Message.create({
            content: 'Hello sohub,现在的时间为' + new Date().toDateString(),
            createTime: new Date().getTime(),
            fromUser: 'oGHz6jqRjNHwBo_a_s',
            toUser: 'gh_418963502e3c',
            messageType: 'text',
            messageId: 5893056478695514624
        }).done(function (err, message) {
                Image.create({
                    pictureUrl: 'http://www.baidu.com/img/bdlogo.gif',
                    createTime: new Date().getTime(),
                    fromUser: 'oGHz6jqRjNHwBo_a_s',
                    toUser: 'gh_418963502e3c',
                    messageType: 'image',
                    messageId: 5893056478696514624
                }).done(function (err, image) {
                        if (err) console.log(err);
                        res.send('成功创建Message 和 Image：' + image.pictureUrl);
                    });
            });

    },
    spike: function (req, res) {
        User.find({
            name: 'test'
        }).done(function (err, user) {
                if (err) {
                    res.send('fuck');
                }
                res.send('===' + user);
            });
    }

};
module.exports = MessageController;