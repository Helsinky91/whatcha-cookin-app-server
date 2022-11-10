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
     photo: {
      type: String,
      default: "/public/images/AvatarDefault.png"
     },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    tags: {
      type: Schema.Types.ObjectId,  
      ref: "Tags"
    }
    
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
  
);

const User = model("User", userSchema);

module.exports = User;
