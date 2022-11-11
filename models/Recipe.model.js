const { Schema, model } = require("mongoose");

const recipeSchema = new Schema(
  {
    name: {
        type: String,
        required: true
    },
    tag: String,
    createdBy: {
        //feeds from User.model 
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    description: String,
    steps: String,
    photo: {
        type: String,
        default: "/public/images/RecetaDefault.png"
    },
    //to define japanese, mediterranean, ...
    typeOfFood: String,
    ingredients: String

})


const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;