const router = require("express").Router();
const  isLogged  = require("../middlewares/auth.middlewares");
const Ingredient = require("../models/Ingredient.model");
const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");
//PATCH "/api/admin/profile/:userId/edit "  => edits and updates profile
router.patch("/profile/:userId/edit", async (req, res, next) => {
    
    const { username, role, photo, email, tags, } = req.body

    //get the changes to edit the user
    const userUpdates = {
        username, 
        role, 
        photo: req.file?.path,
        email, 
        tags
    }

    try {
        await User.findByIdAndUpdate(req.params.userId, userUpdates);
        res.status(200).json("ADMIN, User updated successfully")

    }catch(error){
        next(error)
    }
})

// DELETE "/api/admin/profile/:userId/delete-profile" -> removes one profile as your friend
router.delete("/profile/:userId/delete-profile", async (req, res,next) => {
    const { userId } = req.params

    try {
        await User.findByIdAndDelete(userId)
        res.status(200).json("ADMIN, Perfil eliminado correctamente")        


    } catch (error) {
        next(error)
    }
})


// PATCH "/api/admin/recipes/:recipeId/edit" -> edit specific recipe
router.patch("/recipes/:recipeId/edit", isLogged, async (req, res, next) =>  {
    const {name, tag, comment, description, steps, typeOfFood, ingredients} = req.body

    //get the changes to edit the recipe
    const recipeUpdates = {
        name,
        tag,
        comment,
        description,
        steps,
        photo: req.file?.path,
        typeOfFood,
        ingredients
    }

    try{
        await Recipe.findByIdAndUpdate(req.params.recipeId, recipeUpdates);
        res.status(200).json("ADMIN, Recipe updated successfully")

    }catch(error) {
        next(error)
    }
})



// DELETE "/api/admin/recipes/:recipeId/delete" -> delete specific recipe		
router.delete("/recipes/:recipeId/delete", isLogged, async (req, res, next) => {
    const { recipeId } = req.params
    
    try {
            await Recipe.findByIdAndDelete(recipeId)
            res.status(200).json("ADMIN, Recipe deleted")

    } catch (error) {
        next(error)
    }
})



// PATCH "/api/admin/ingredient/:ingredientId/edit" -> edits one ingredient by ID
router.patch("/ingredient/:ingredientId/edit", isLogged, async (req, res, next) => {
    const { ingredientId } = req.params
    //get the changes to edit the recipe
    const { name, tag, comment, category } = req.body
    const ingrUpdate = {
        name,
        tag,
        comment,
        photo: req.file?.path,
        category
    }

    try {
       await Ingredient.findByIdAndUpdate(ingredientId, ingrUpdate)
        res.status(200).json("ADMIN, Ingredient edited successfully")

    } catch (error) {
        next(error)
    }
})

// DELETE "/api/admin/ingredient/:ingredientId/delete" -> delete one ingredient
router.delete("/ingredient/:ingredientId/delete", async (req, res, next) => {
    const { ingredientId } = req.params

    try {
        await Ingredient.findByIdAndDelete(ingredientId);
        res.status(201).json("Ingredient deleted in DB");

    } catch (error) {
        next(error)
    }
})



module.exports = router;