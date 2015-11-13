/*jslint node:true*/
'use strict';

var passport = require('koa-passport');
var crypto = require('crypto');
var User = require('./model/user').User;
var r_pass = require('./model/pass_reset').Pass;
var config = require('./config/app');
var pic = require("fb-pic");
var firstproject = require('./newutil.js').firstproject;
var co = require("co");

User.prototype.generateHash = function(password, cb) {
    if (!password) {
        return cb('');
    }
    var encrypred,
        salt = Math.round((new Date().valueOf() * Math.random())) + '';
    this.salt = salt;
    try {
        encrypred = crypto.createHmac('sha1', salt).update(password).digest('hex');
        return cb(null, encrypred);
    }
    catch (err) {
        return cb(err);
    }
};




var authenticator = function(user_pass, supplied_pass, salt, cb) {
    if (!supplied_pass) {
        return cb(new Error("No password was supplied"));
    }
    else {
        if (crypto.createHmac('sha1', salt).update(supplied_pass).digest('hex') == user_pass) {
            return cb(null, true);
        }
        else {
            return cb(null, false);
        }
    }

};

// =========================================================================
// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    /** User.findById(id, function (err, user) {
        done(err, user);
    });**/
    return User.findById(id, function(err, user) {
        if (err) {
            return done(err);
        }
        return done(err, user);
    });
});



var LocalStrategy = require('passport-local').Strategy;
passport.use('local-signin', new LocalStrategy({
        usernameField: 'email'
    },
    function using(email, password, done) {
        User.findOne({
            'email': email
        }, function findOne(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(err);
            }
            authenticator(user.hash, password, user.salt, function verifyPassword(err, valid) {
                if (err) {
                    return done(err);
                }
                if (!valid) {
                    return done(null, false);
                }
                done(null, user);
            });
        });
    }
));


passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    function using(req, email, password, done) {
        var ref = req.session;
        if (!req.user) {
            User.findOne({
                'email': email
            }, function findOne(err, user) {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, false);
                }
                // account information is in req.body
                // we can do our data validation here.
                delete req.body.password;
                user = new User(req.body);
                if (ref) {
                    User.findById(ref.r, function(err, uzer) {
                        if (err || !uzer) {
                            user.generateHash(password, function generateHash(err, password) {
                                if (err) {
                                    return done(err);
                                }
                                user.hash = password;
                                user.gravatar = crypto.createHash('md5').update(user.email).digest("hex");
                                co(function*() {
                                    var firstpid = yield firstproject(user);
                                    user.projects = {};
                                    user.projects[firstpid] = "Welcome Project";
                                    var day = new Date;
                                    day.setDate(day.getDate() + 60);
                                    user.payment = {
                                        validity: day,
                                        type: 'trial',
                                        cards: 'none'
                                    }
                                    user.markModified('projects');
                                    user.markModified('payment');
                                    user.save(function save() {
                                        if (err) {
                                            return done(err);
                                        }
                                        return done(null, user);
                                    });
                                }).then(function(value) {
                                    // console.log(value);
                                }, function(err) {
                                    console.error(err.stack);
                                });
                            });
                        }
                        else {
                            if (uzer.ref) {
                                uzer.ref[user._id] = {
                                    'date': Date.now(),
                                    'verified': false,
                                    'email': user.email
                                }
                            }
                            else {
                                uzer.ref = {};
                                uzer.ref[user._id] = {
                                    'date': Date.now(),
                                    'verified': false,
                                    'email': user.email
                                };
                            }
                            uzer.markModified('ref');
                            uzer.save(function save(err) {
                                if (err) {}
                                else {
                                    user.generateHash(password, function generateHash(err, password) {
                                        if (err) {
                                            return done(err);
                                        }
                                        user.hash = password;
                                        user.gravatar = crypto.createHash('md5').update(user.email).digest("hex");
                                        co(function*() {
                                            var firstpid = yield firstproject(user);
                                            user.projects = {};
                                            user.projects[firstpid] = "Welcome Project";
                                            var day = new Date;
                                            day.setDate(day.getDate() + 60);
                                            user.payment = {
                                                validity: day,
                                                type: 'trial',
                                                cards: 'none'
                                            }
                                            user.markModified('projects');
                                            user.markModified('payment');
                                            user.save(function save() {
                                                if (err) {
                                                    return done(err);
                                                }
                                                return done(null, user);
                                            });
                                        }).then(function(value) {
                                            // console.log(value);
                                        }, function(err) {
                                            console.error(err.stack);
                                        });
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    }));




var FacebookStrategy = require('passport-facebook').Strategy;
var authconfig = require('./config/3rdparty_auth.js');

passport.use(new FacebookStrategy({
        clientID: authconfig.facebookAuth.clientID,
        clientSecret: authconfig.facebookAuth.clientSecret,
        callbackURL: authconfig.facebookAuth.callbackURL,
        passReqToCallback: true
    },

    // facebook will send back the token and profile
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            User.findOne({
                'email': profile.emails[0].value
            }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                }
                else {
                    co(function*() {
                        var ref = req.session;
                        if (ref) {
                            User.findById(ref.r, function(err, uzer) {
                                if (err) {

                                }
                                else {
                                    if (uzer && uzer.ref) {
                                        uzer.ref[user.email] = {
                                            'date': Date.now(),
                                            'verified': false
                                        }
                                        uzer.markModified('ref');
                                        uzer.save(function save() {
                                            if (err) {}
                                        });
                                    }
                                    else if (uzer) {
                                        uzer.ref = {};
                                        uzer.ref[user.email] = {
                                            'date': Date.now(),
                                            'verified': false
                                        };
                                        uzer.markModified('ref');
                                        uzer.save(function save() {
                                            if (err) {}
                                        });
                                    }

                                }
                            });
                        }
                        // if there is no user found with that facebook id, create them
                        var newUser = new User();

                        // set all of the facebook information in our user model
                        newUser.facebook.id = profile.id; // set the users facebook id                  
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                        newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                        newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                        newUser.email = newUser.facebook.email; // This change would uniform the emails all over routes. No bulshit need to used the check-login function.
                        newUser.fname = profile.name.givenName;
                        newUser.lname = profile.name.familyName;
                        newUser.facebook.username = profile.username;
                        var firstpid = yield firstproject(newUser);
                        newUser.projects = {};
                        newUser.projects[firstpid] = "Welcome Project";
                        var day = new Date;
                        day.setDate(day.getDate() + 31);
                        newUser.payment = {
                            validity: day,
                            type: 'trial',
                            cards: 'none'
                        }
                        newUser.markModified('payment');
                        newUser.markModified('projects');
                        newUser.save(function(err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }).then(function(value) {
                        // console.log(value);
                    }, function(err) {
                        console.error(err.stack);
                    });
                }
            });

        })
    }));

//------------------------------------------------------------------------------------------------------
// Password Reset Mechanism 
//-----------------------------------------------------------------------------------------------------

var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = module.exports.smtp = nodemailer.createTransport({
    service: "Zoho",
    port: 465,
    auth: {
        user: "noreply@jutja.com",
        pass: "noreply123"
    }
});


//Need to change https to true when switching to secure
module.exports.gravatr = function gravatr(uzer, mail) {
    return function(done) {
        User.findOne({
            '_id': uzer._id
        }, function(err, user) {
            if (err) {
                done(null, {
                    notice: "Session expired ,Please login again"
                });
            }
            else {
                user.gravatar = crypto.createHash('md5').update(mail).digest("hex");
                user.save(function save() {
                    if (err) {
                        done(null, {
                            notice: "gravatar couldn't be set .Please try again later"
                        })
                    }
                });
                done(null, {
                    not: "gravatar has been Updated"
                });
            }
        });
    }
};

module.exports.password_reset = function password_reset(user_) {
    return function(done) {
        if (user_) {
            User.findOne({
                '_id': user_._id
            }, function(err, user) {
                if (err) {
                    done(null, {
                        notice: "Session expired , Please login again"
                    });
                }
                else {
                    user.generateHash(user_.temp_pass, function(err, password) {
                        if (err) {
                            done(null, {
                                notice: "Password coudn't be reset, Please try again later"
                            });
                        }
                        else {
                            user.hash = password;
                            user.save(function save() {
                                if (err) {
                                    done(null, {
                                        notice: "Password coudn't be reset, Please try again later"
                                    });
                                }
                                else done(null, {
                                    success: "your password has been reset successfully"
                                });
                            })
                        }
                    });
                }
            });
        }
        else {
            done(null, {
                notice: "Request not good"
            })
        };
    }
}


module.exports.check_token = function(token) {
    return function(done) {
        r_pass.findOne({
            '_id': token.token
        }, function(err, pass) {
            if (err) {
                done(null, "Password Reset Token doesn't exists,Please try again")
            }
            else {
                if (pass && pass._id == token.token) {
                    User.findOne({
                        'email': pass.email
                    }, function(err, user) {
                        crypto.randomBytes(10, function(ex, buf) {
                            if (ex) throw ex;
                            var user_password = buf.toString('base64');
                            user.generateHash(user_password, function generateHash(err, password) {
                                if (err) {
                                    return done(err);
                                }
                                user.hash = password;
                                user.save(function save() {
                                    if (err) {
                                        return done(err);
                                    }
                                    var mailOptions = {
                                            from: "Noreply <noreply@jutja.com>", // sender address
                                            to: pass.email, // list of receivers
                                            subject: "Password Has been Reset- Jutja.com", // Subject line
                                            text: "Your Password has been Reset. Your New password is '" + user_password + "'", // plaintext body
                                            html: "Hello " + pass.email + ",<br><b>At your request, your password has been reset to '" + user_password + "'</b><br>Sincerely,<br>The Jutja.com Team"
                                        }
                                        // send mail with defined transport object
                                    smtpTransport.sendMail(mailOptions, function(error, response) {
                                        if (error) {
                                            console.log(error);
                                        }
                                        else {
                                            console.log("Message sent: " + response.message);
                                        }
                                        // if you don't want to use this transport object anymore, uncomment following line
                                        //smtpTransport.close(); // shut down the connection pool, no more messages
                                    });
                                    pass.remove(function() {
                                        if (err) {
                                            done(null, "Password Reset Token not deleted.Please contact support");
                                        }
                                    });


                                    return done(null, {
                                        message: "Your password has been reset and sent to your email. Please Check you Inbox. It might take few minutes for the email to reach the inbox"
                                    });
                                });

                            });


                        });
                    });
                }
                else {
                    done(null, "Sorry the token has expired.Please try to reset the site again");
                }

            }
        });
    }

};


module.exports.create_token = function(token) {
    return function(done) {
        User.findOne({
            'email': token.email
        }, function findOne(err, user) {
            if (err) {
                done(null, "There was some error");
            }
            else {
                if (user) {
                    r_pass.remove({
                        'email': token.email
                    }, function(err, pass) {
                        if (err) {
                            done(null, "email not getting");
                        }
                        var n_token = new r_pass;
                        n_token.email = token.email;
                        n_token.save(function(err) {
                            if (err) {
                                throw err;
                            }
                            var mailOptions = {
                                    from: "Noreply <noreply@jutja.com>", // sender address
                                    to: token.email, // list of receivers
                                    subject: "Password Reset Request- Jutja.com", // Subject line
                                    text: "To reset your password please visit https://jutja.com/reset-password?token=" + n_token._id + "&email=" + token.email + " Please Ignore if You haven't made this request", // plaintext body
                                    html: "Hello " + user.email + ",<br><b>We've received your request to reset your password, and would be glad to help.<br>In order for us to verify you are the account owner, please click the following link to reset your password. Once you do that, a new password will be sent to you in another email.</b><br>Click <a href='https://jutja.com/reset-password?token=" + n_token._id + "&email=" + token.email + "'>Here</a> . To reset your password.<br> If It doesn't work copy and paste this url into your browser <br>https://jutja.com/reset-password?token=" + n_token._id + "&email=" + token.email + "<br> If you did not request your password to be reset (or you remembered your password), just ignore this messsage; no changes have been made to your account.<br>Sincerely,<br>The Jutja.com Team" // html body
                                }
                                // send mail with defined transport object
                            smtpTransport.sendMail(mailOptions, function(error, response) {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    console.log("Message sent: " + response.message);
                                }

                                // if you don't want to use this transport object anymore, uncomment following line
                                //smtpTransport.close(); // shut down the connection pool, no more messages
                            });

                            done(null, {
                                status: "An Email has been Sent to your email Id. It might few minutes for the mail to reach the inbox."
                            });

                        });
                    });
                }
                else {
                    done(null, "User not registered")
                }


            }

        })
    }
};