const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    //comment belong to user

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //inclue the array of ids of all comments in this post schema itslef
   
},{
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
