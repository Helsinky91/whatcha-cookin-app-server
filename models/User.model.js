const { Schema, model } = require("mongoose");
const tag = require("../utils/tag");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    description: String,
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/ddzhdj4yd/image/upload/v1668514029/whatcha-cookin/AvatarDefault_gdhinf.png",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    tag: [
      {
        type: String,
        enum: tag,
      },
    ],
    friends: [
      {
        //feeds from User.model
        type: Schema.Types.ObjectId,
        ref: "User",
        // default: []
      },
    ],
    favourites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
