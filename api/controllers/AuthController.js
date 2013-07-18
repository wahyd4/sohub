var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
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
    index: passport.authenticate('google', { scope: ['openid', 'email', 'https://www.googleapis.com/auth/calendar'] }),


    auth:  passport.authenticate('google',function(req,res){
        console.log(res)   ;
        console.log(req);
    })



};
module.exports = AuthController;