const router = require("express").Router();
const Recipe = require("../models/Recipe.model");
const  isLogged  = require("../middlewares/auth");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");


// POST "/api/comment/:recipeId/create" ->  receives details from new comment in FE and creates new comment in DB
router.post("/:recipeId/create", isLogged, async (req, res, next) => {
  const { _id } = req.payload
  const { recipeId } = req.params
  const { newComment } = req.body
    //! error cuando se añade uno, no se rellenan los campos

  //get data from FE to send BE
  const newRecipeComment = {
      username: _id,
      recipe: recipeId,
      comment
  }
  try{    
      await Comment.create(newRecipeComment)
      res.status(201).json("New comment created in DB")
  }catch(error){
      next(error)
  }
})





//GET "api/comment/recipes-list" -> shows a list of all recipes name + image + tags
router.get("/:recipeId/comment-list", async (req, res, next) => {
    const { recipeId } = req.params
    try {
        const response = await Comment.find("recipe", `${recipeId}`)
        console.log("response", recipeId)
        res.status(200).json(response)
       
      } catch (error) {
        next(error);
      }
})





module.exports = router;