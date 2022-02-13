const req = require('express/lib/request');
const passport = require('passport');

const localStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// authentication using passport
passport.use(new localStrategy({
    usernameField: 'email'
    },

       function(email, password, done){
          // find a user and esatblish the identity
          User.findOne({email: email}, function(err, user) {
              if(err){
                  console.log('Error in finding user --> Passport');
                  return done(err);
              }
              if(!user || user.password != password){
                  console.log('Invalid Username/Password');
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


module.exports = passport;