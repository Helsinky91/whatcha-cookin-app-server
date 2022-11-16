const { Schema, model } = require("mongoose");
const tag = require("../utils/tags");
const typeOfFood = require("../utils/typeOfFood");

const recipeSchema = new Schema(
  {
    name: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        enum: tag
    },
    createdBy: {
        //feeds from User.model 
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    description: String,
    steps: String,
    image: {
        type: String,
        default: "https://res.cloudinary.com/ddzhdj4yd/image/upload/v1668514029/whatcha-cookin/RecetaDefault_lxygod.png"
    },
    
    typeOfFood: {
        type: String,
        enum: typeOfFood
    },
    ingredients: String

})


const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;