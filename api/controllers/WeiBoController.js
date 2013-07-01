var weibo = require('weibo');

var appkey = '3410683097';
var secret = '552c859d2354fc66d984f907b991687f';
var oauth_callback_url = '/weibo/index';
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
        var user = req.session.oauthUser;
        res.writeHeader(200, { 'Content-Type': 'text/html' });
        if (!user) {
            res.end('Login with <a href="/weibo/login?type=weibo">Weibo</a>');
            return;
        }

        res.end('Hello, <img src="' + user.profile_image_url + ' <a href="' + user.t_url + '" target="_blank">@' + user.screen_name + '</a>. ' + '<a href="/logout">Logout</a>');
    }

};

module.exports = WeiboController;