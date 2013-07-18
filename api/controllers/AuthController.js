var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var gcal = require('google-calendar');
var util = require('util');

passport.use(new GoogleStrategy({
        clientID: '553555458366-bl2e989fn88t27recf2cgp74b3ogcdc1.apps.googleusercontent.com',
        clientSecret: '8TNPb5ehq-t7g1uiwztaHmC7',
        callbackURL: "http://127.0.0.1:1337/auth/google"

    },function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        console.log(accessToken+"=========");
    process.nextTick(function () {

            // To keep the example simple, the user's Google profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Google account with a user record in your database,
            // and return that user instead.
            return done(null, profile);
    });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});


var AuthController = {
    index: passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'] }),


    auth:  passport.authenticate('google',function(req,res){
        console.log(res)   ;
        console.log(req);
    })



};
module.exports = AuthController;