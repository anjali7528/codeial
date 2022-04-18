const req = require('express/lib/request');
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    },

       function(req, email, password, done){
          // find a user and esatblish the identity
          User.findOne({email: email}, function(err, user) {
              if(err){
                //   console.log('Error in finding user --> Passport');
                req.flash('error', err);
                  return done(err);
              }
              if(!user || user.password != password){
                //   console.log('Invalid Username/Password');
                req.flash('error','Invalid username/Password');
                  return done(null, false);
              }
              return done(null, user);
          });

    }
));



// serialising the user to decide which key to be kept in cookie
passport.serializeUser(function(user, done){
    done(null, user.id);
});



// deserialising the user from key  in the cookie
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
                  return done(err);
        }

        return done(null, user);
    });
});

//check if the user is authenticated 
passport.checkAuthentication = function(req, res, next){
   // if user is signed in, then pass on the request to next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not signed in
    return res.redirect('/users/sign-in')
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals  for the views
        res.locals.user = req.user;

    }
    next();
}


module.exports = passport;