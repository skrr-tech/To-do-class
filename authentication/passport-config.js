const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByUsername) {
    const verifyCallback = function (username, password, done) {
        const user = getUserByUsername(username);
        // console.log(getUserByUsername(username));
        if (!user) {
            return done(null, false);
        }
        if (bcrypt.compareSync(password, user.password)) {
            return done(null, user);
        }
        // if password is wrong, correct this
        done(null, false);
    };
    const strategy = new LocalStrategy(verifyCallback);
    passport.use(strategy);
    passport.serializeUser((user, done) => {
        return done(null, user.username);
    });
    passport.deserializeUser((user, done) => {
        return done(null, user);
    });
}

module.exports = initialize;
