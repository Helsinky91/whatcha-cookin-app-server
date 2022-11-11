const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
        username: {
        //feeds from User.model 
        userId: Schema.Types.ObjectId,
        ref: "User"
       }, 
       recipe: {
           //feeds from Recipe.model 
           recipe: Schema.Types.ObjectId,
           ref: "Recipe"
       }
   })

const Comment = model("Comment", commentSchema);

module.exports = Comment;