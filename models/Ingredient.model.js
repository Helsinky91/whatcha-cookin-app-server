const { Schema, model } = require("mongoose");
const tag = require("../utils/tags");

const ingredientSchema = new Schema(
  {
    name: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        enum: tag
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/ddzhdj4yd/image/upload/v1668514029/whatcha-cookin/ingredientDefault_mpnpxg.png"
    },
    category: String,
    createdBy: {
        //feeds from User.model 
        type: Schema.Types.ObjectId,
        ref: "User"
    }, 
})

const Ingredient = model("Ingredient", ingredientSchema);

module.exports = Ingredient;