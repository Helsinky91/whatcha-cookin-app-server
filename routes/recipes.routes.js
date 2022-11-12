const router = require("express").Router();
const Recipe = require("../models/Recipe.model");
const  isLogged  = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");


// GET "/api/recipes/random-recipe" -> shows one random recipe
router.get("/random-recipe", async (req, res, next) => {
    
    try {
        // .count() returns the amount of elements in the collection
        const count = await Recipe.count() // returns a number
    
        // Get a random entry between 0 and the number of elements
        const random = Math.floor(Math.random() * count)
        
        // .skip() will move pass the first x amount of documents. findOne will bring the first after the skip.
        const response = await Recipe.findOne().skip(random) // returns a single random document
        
        res.status(200).json(response)

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
        const response = await Todo.findById(recipeId)
        res.status(200).json(response)

    }catch(error){
        next(error)
    }

})


// PATCH "/api/recipes/:recipeId/edit" -> edit specific recipe
router.patch("/:recipeId/edit", isLogged, async (req, res, next) =>  {
    const { _id } = req.payload
    const {name, tag, comment, description, steps, typeOfFood, ingredients} = req.body

    //get the changes to edit the recipe
    const recipeUpdates = {
        name,
        tag,
        createdBy: _id,
        comment,
        description,
        steps,
        photo: req.file?.path,
        typeOfFood,
        ingredients
    }

    try{
        await Recipe.findByIdAndUpdate(req.params.recipeId, recipeUpdates);
        res.status(200).json("Recipe updated successfully")

    }catch(error) {
        next(error)
    }
})


// POST "/api/recipes/create" ->  receives details from new recipe in FE and creates new recipe in DB
router.post("/create", isLogged, async (req, res, next) => {
    const { _id } = req.payload

    const {name, tag, description, steps, photo, typeOfFood, ingredients} = req.body

    //get data from FE to send BE
    const newRecipe = {
        name,
        tag,
        createdBy: _id,
        description,
        steps,
        photo: req.file?.path,
        typeOfFood,
        ingredients
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


//! si ponemos middleware isAdmin, esta ruta solo servirá para el admin. Con el condicional, serviria para user que crea receta i admin. Doblamos la ruta?
// DELETE "/api/recipes/:recipeId/delete" -> delete specific recipe		
// router.delete("/:recipeId/delete", isLogged, async (req, res, next) => {
//     const { recipeId } = req.params
//     const { _id } = req.payload
    
//     try {
//         const  recipeDetails = await Recipe.findById(recipeId)
//         console.log("recipeId", recipeDetails.createdBy)
//         if (recipeDetails === _id) {
//             await Recipe.findByIdAndDelete(recipeId)
//             res.status(200).json("Recipe deleted")
          
//         }
//     } catch (error) {
//         next(error)
//     }
// })
router.delete("/:recipeId/delete", isLogged, async (req, res, next) => {
    const { recipeId } = req.params
    const { _id } = req.payload
    
    try {
        const recipeDetails = await Recipe.findById(recipeId)
        if (recipeDetails.createdBy !== _id) {
            await Recipe.findByIdAndDelete(recipeId)
            res.status(200).json("Recipe deleted")
        }
    } catch (error) {
        next(error)
    }
})



//PATCH "api/recipes/:recipeId/fav-recipe" -> add recipe to fav
router.patch("/:recipeId/fav-recipe", isLogged, async (req, res, next) => {
    const { _id } = req.payload
   const { recipeId } = req.params
   try {
     await User.findByIdAndUpdate(_id, {
       $addToSet: { favourites: recipeId }, //to add favourites to our list and avoid repetitions.
    });
    res.status(200).json("Todo bien, añadido a favoritos")
 
   } catch (error) {
     next(error);
   }
 });


 

//PATCH "api/recipes/:recipeId/delete-fav" -> remove recipe from fav
router.patch("/:recipeId/delete-fav", isLogged, async (req, res,next) => {
    const { _id } = req.payload
    const { recipeId } = req.params

  try {
    await User.findByIdAndUpdate(_id    , {
      $pull: { favourites: recipeId },
    });
    res.status(200).json("Favorito eliminado correctamente")
   
  } catch (error) {
    next(error);
  }
});

//! BONUS PATCH "/api/recipes/:recipeId/likes"

module.exports = router;