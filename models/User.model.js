const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    role: { 
      type: String,
      default: "user"
     },
     image: {
      type: String,
      default: "https://res.cloudinary.com/ddzhdj4yd/image/upload/v1668514029/whatcha-cookin/AvatarDefault_gdhinf.png"
     },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    tag: [String],
    friends: [{
      //feeds from User.model 
      type: Schema.Types.ObjectId,
      ref: "User",
      // default: []
    }],
    favourites: [{
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    }]
    
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
  
);

const User = model("User", userSchema);

module.exports = User;
