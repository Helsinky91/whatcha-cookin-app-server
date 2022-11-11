const router = require("express").Router();
const Recipe = require("../models/Recipe.model");

// GET "/api/recipes/random-recipe" -> shows one random recipe
router.get("/random-recipe", async (req, res, next) => {
    
    try {
        // .count() returns the amount of elements in the collection
        const count = await Recipe.count() // returns a number
    
        // Get a random entry between 0 and the number of elements
        const random = Math.floor(Math.random() * count)
        
        // .skip() will move pass the first x amount of documents. findOne will bring the first after the skip.
        const response = await Recipe.findOne().skip(random) // returns a single random document


    } catch (error) {
        next(error)
    }
})

//GET "api/recipes/recipes-list" -> shows a list of all recipes name + photo + tags
router.get("/recipes-list", async (req, res, next) => {
    try{
        const response = await Recipe.find().select("title", "tag", "photo");
        res.status(200).json(response)

    }catch(error) {
        next(error)
    }
})

// GET  "/api/recipes/search" -> shows a filtered search of recipes
//* NO NEED FOR A LIST OF SEARCH HERE, SERá COMPONENT EN EL FE. 


// GET "/api/recipes/:recipeId/details" -> shows detailed recipes
router.get("/:recipeId/details", async (req, res, next) => {
    
    const { recipeId } = req.params;

    try{
        const response = await Todo.findById(todoId)
        res.status(200).json(response)

    }catch(error){
        next(error)
    }

})


// PATCH "/api/recipes/:recipeId/edit" -> edit specific recipe
router.patch("/:recipeId/edit", async (req, res, next) =>  {
    
    //get the changes to edit the recipe
    const recipeUpdates = {
        name: req.body.name,
        tag: req.body.tag,
        createdBy: req.body.createdBy,
        comment: req.body.comment,
        desciption: req.body.desciption,
        steps: req.body.steps,
        photo: req.file?.path,
        typeOfFood: req.body.typeOfFood,
        ingredients: req.body.ingredients
    }

    try{
        await Recipe.findByIdUndUpdate(req.params.recipeId, recipeUpdates);
        res.status(200).json("Recipe edited successfully")

    }catch(error) {
        next(error)
    }
})


// POST "/api/recipes" ->  receives details from new recipe in FE and creates it in DB
router.post("/", async (req, res, next) => {
 console.log("reqbody", req.body)
    //get data from FE to send BE
    const newRecipe = {
        name: req.body.name,
        tag: req.body.tag,
        createdBy: req.body.createdBy,
        comment: req.body.comment,
        desciption: req.body.desciption,
        steps: req.body.steps,
        // photo: req.file?.path,
        typeOfFood: req.body.typeOfFood,
        ingredients: req.body.ingredients
    }
    console.log("newrecipe", newRecipe)

    //use newRecipe to create new Recipe in DB
    try{    
        await Recipe.create(newRecipe)
        res.status(201).json("New recipe created in DB")

    }catch(error){
        next(error)
    }
})


// DELETE "/api/recipes/:recipeId/delete" -> delete specific recipe		
router.delete("/:recipeId/delete", async (req, res, next) => {
    try {
        await Recipe.findByIdeAndDelete(req.params.todoId)
    } catch (error) {
        next(error)
    }
})



//PATCH "api/recipes/:recipeId/fav-recipe" -> add recipe to fav


//PATCH "api/recipes/:recipeId/delete-fav" -> remove recipe from fav


//! BONUS PATCH "/api/recipes/:recipeId/likes"

module.exports = router;