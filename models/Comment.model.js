const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  username: {
    //feeds from User.model
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  recipe: {
    //feeds from Recipe.model
    type: Schema.Types.ObjectId,
    ref: "Recipe",
    type: String,
  },
  comment: String,
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
