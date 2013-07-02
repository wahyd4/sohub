var weibo = require('weibo');

var appkey = '3410683097';
var secret = '552c859d2354fc66d984f907b991687f';
var oauth_callback_url = '/weibo/index';
var accesstoken = '2.00v2dA9ChTsoiD098629aa0a08d3g1';

weibo.init('weibo', appkey, secret, oauth_callback_url);


var WeiboController = {
    auth: weibo.oauth({
        loginPath: '/weibo/login',
        logoutPath: '/weibo/logout',
        blogtypeField: 'type',
        afterLogin: function (req, res, callback) {
            console.log(req.session.oauthUser.screen_name, 'login success');
            process.nextTick(callback);
        },
        beforeLogout: function (req, res, callback) {
            console.log(req.session.oauthUser.screen_name, 'loging out');
            process.nextTick(callback);
        }
    }),


    index: function (req, res) {

        var user = { blogtype: 'weibo', access_token: accesstoken };
        var cursor = {count: 20, source: appkey};
        weibo.public_timeline(user, cursor, function (err, statuses) {
            if (err) {
                console.error(err);
            } else {
                console.log(statuses);
                res.view(statuses);
            }
        });
    }
};

module.exports = WeiboController;