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
            content: '如果你的代码易于阅读，那么代码中bug也将会很少，因为一些bug可以很容被调试，并且，其他开发者参与你项目时的门槛也会比较低。因此，如果项目中有多人参与，采取一个有共识的编码风格约定非常有必要。',
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