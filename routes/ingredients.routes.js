const router = require("express").Router();
const isLogged = require("../middlewares/auth");
const Ingredient = require("../models/Ingredient.model");


// GET "/api/ingredient/list" -> displays list of all ingredients
router.get("/list", async (req, res, next) => {

    try{
        const response = await Ingredient.find()

        res.status(200).json(response)
    
    }catch(error){
        next(error)
    }
})


// POST "/api/ingredient/create" -> create a new ingredient
router.patch("/create", isLogged, async (req, res, next) => {
    const { _id } = req.payload
    const { name, tag,  comment, category } = req.body
    const newIngredient = {
        name,
        tag,
        comment,
        image: req.body.image,
        category,
        createdBy: _id //! no cal, no?
    }

    try {
        await Ingredient.create(newIngredient);
        res.status(201).json("New ingredient created in DB");

    } catch (error) {
        next(error)
    }
})


// PATCH "/api/ingredient/:ingredientId/edit" -> edits one ingredient by ID
router.patch("/:ingredientId/edit", isLogged, async (req, res, next) => {
    const { ingredientId } = req.params
    //get the changes to edit the recipe
    const { name, tag,  comment, category } = req.body
    const ingrUpdate = {
        name,
        tag,
        comment,
        image: req.body.image,
        category
    }

    try {
       await Ingredient.findByIdAndUpdate(ingredientId, ingrUpdate)
        res.status(200).json("Ingredient edited successfully")

    } catch (error) {
        next(error)
    }
})

// DELETE "/api/ingredient/:ingredientId/delete" -> delete one ingredient
router.delete("/:ingredientId/delete", async (req, res, next) => {
    const { ingredientId } = req.params

    try {
        await Ingredient.findByIdAndDelete(ingredientId);
        res.status(201).json("Ingredient deleted in DB");

    } catch (error) {
        next(error)
    }
})

module.exports = router;