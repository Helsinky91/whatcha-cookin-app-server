const router = require("express").Router();
const Ingredient = require("../models/Ingredient.model");


// GET "/api/ingredient/list" -> displays list of all ingredients
router.get("/list", async (req, res, next) => {

    try{
        const response = await Ingredient.find().select("title", "photo");
        res.status(200).json(response)
    
    }catch(error){
        next(error)
    }
})

// PATCH "/api/ingredient/:ingredientId/edit" -> edits one ingredient by ID
router.patch("/:ingredientId/edit", async (req, res, next) => {
    
    //get the changes to edit the recipe
    const ingrUpdate = {
        name: req.body.name,
        tag: req.body.tag,
        comment: req.body.comment,
        photo: req.file?.path,
        category: req.body.category,
        createdBy: req.body.createdBy
    }

    try {
       await Ingredient.findByIdAndUpdate(req.params.ingredientId, ingrUpdate)
        res.status(200).json("Ingredient edited successfully")

    } catch (error) {
        next(error)
    }
})

// POST "/api/ingredient/create" -> create a new ingredient
router.patch("/create", async (req, res, next) => {
   
    const newIngredient = {
        name: req.body.name,
        tag: req.body.tag,
        comment: req.body.comment,
        photo: req.file?.path,
        category: req.body.category,
        createdBy: req.body.createdBy
    }

    try {
        await Ingredient.create(newIngredient);
        res.status(201).json("New ingredient created in DB");

    } catch (error) {
        next(error)
    }
})

// DELETE "/api/ingredient/:ingredientId/delete" -> delete one ingredient
router.delete("/:ingredientId/delete", async (req, res, next) => {
    try {
        await Ingredient.findByIdAndDelete(req.params.ingredientId);

    } catch (error) {
        next(error)
    }
})

module.exports = router;