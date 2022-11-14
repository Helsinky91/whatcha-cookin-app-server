const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema(
  {
    name: {
        type: String,
        required: true
    },
    tag: String,
    photo: {
        type: String,
        default: "../public/images/IngredientDefault.png"
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