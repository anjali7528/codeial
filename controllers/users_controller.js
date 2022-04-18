const { response } = require('express');
const User = require('../models/user');

module.exports.profile = function(req,res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile',{
                title: "User profile",
                profile_user: user
        });
   //return res.end('<h1>User profile</h1>');

//   if(req.cookies.user_id){
//       User.findById(req.cookies.user_id, function(err,user){
//           if(user){
//               return res.render('user_profile',{
//                   title: "User profile",
//                   user: user
//               });

//           }
//         });
//     }
//     else{
//         return res.redirect('/users/sign-in');
//     }

      });
     
   }

   module.exports.update = function(req, res){
       if(req.user.id == req.params.id){
           User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
               return res.redirect('back');
           });
        }
           else{
               return res.status(401).send('Unauthorized');
           }
   }

// render sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
      return  res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: "codeial | Sign Up"
    });
}

// render sign in page
module.exports.signIn = function(req,res){

    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title: "codeial | Sign In"
    });
}

//get sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing - up'); return}

        if(!user){
            User.create(req.body, function(err, user){
               if(err){
                console.log('error in creating user while signing up'); 
                return;
               }

               return res.redirect('/users/sign-in');
            });
        }

        else{
            return res.redirect('back');
        }
    });
}

//sign in and create the session of the user
module.exports.createSession =function(req,res){
//     //step to authenticate 
//     //find the user
//     User.findOne({email: req.body.email}, function(err,user){
//         if(err){
//              //handle user found
//             console.log('error in creating user while signing in'); 
//             return;
//         }
//             if(user){
//   //>> handle missmatching or passwords which dont match
//   if(user.password != req.body.password){
//     return res.redirect('back');
//   }  
//   //>> handle session creation
//            res.cookie('user_id', user.id);
//            res.redirect('/users/profile');
//             }
//             else{
//  //handle user not found
//  return res.redirect('back');
//             }
        
//    console.log('Error in finding user --> Passport');
//               return done(err); });
req.flash('success', 'Logged In Successfully');
return res.redirect('/');

}

module.exports.distroySession = function(req, res){
    req.flash('success', 'Logged Out Successfully');
  req.logout();
  
    return res.redirect('/');
}