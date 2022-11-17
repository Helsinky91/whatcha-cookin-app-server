const router = require("express").Router();
const Recipe = require("../models/Recipe.model");
const  isLogged  = require("../middlewares/auth");
const User = require("../models/User.model");
const tag = require("../utils/tag");
const typeOfFood = require("../utils/typeOfFood");


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

//GET "api/recipes/recipes-list" -> shows a list of all recipes
router.get("/recipes-list", async (req, res, next) => {
    try{
        const response = await Recipe.find()
        res.status(200).json(response)
    }catch(error) {
        next(error)
    }
})




// GET "/api/recipes/:recipeId/details" -> shows detailed recipes
router.get("/:recipeId/details", async (req, res, next) => {
    const { recipeId } = req.params;

    try{
        const response = await Recipe.findById(recipeId).populate("createdBy")
        res.status(200).json(response)
    }catch(error){
        next(error)
    }

})

// GET "/api/recipes/tag" -> shows tag in recipes
router.get("/tag", async (req, res, next) => {
    // console.log("tag", tag)
    res.status(200).json(tag)

})

// GET "/api/recipes/type-of-food" -> shows typeOfFood in recipes
router.get("/type-of-food", async (req, res, next) => {
    // console.log("typeOfFood", typeOfFood)
    res.status(200).json(typeOfFood)

})


// PATCH "/api/recipes/:recipeId/edit" -> edit specific recipe
router.patch("/:recipeId/edit", isLogged, async (req, res, next) =>  {
    const {name, tag, comment, description, steps, typeOfFood, ingredients} = req.body
    const { _id, role } = req.payload
    const { recipeId } = req.params

    // if( name === "" ) {
    //     res.status(400).json({ errorMessage: "Please write a name" })
    //     return
    // } else if( description === "" ) {
    //     res.status(400).json({ errorMessage: "Please write a description" })
    //     return
    // } 

    //get the changes to edit the recipe
    const recipeUpdates = {
        name,
        tag,
        comment,
        description,
        steps,
        image: req.body.image,
        typeOfFood,
        ingredients
    }

    try{
        const recipeDetails = await Recipe.findById(recipeId)
        if (recipeDetails.createdBy === _id || role === "admin") {
        await Recipe.findByIdAndUpdate(req.params.recipeId, recipeUpdates);
        res.status(200).json("Recipe updated successfully")
        console.log("recipeUpdates in recipe edit" ,recipeUpdates)
        }

    }catch(error) {
        next(error)
    }
})


// POST "/api/recipes/create" ->  receives details from new recipe in FE and creates new recipe in DB
router.post("/create", isLogged, async (req, res, next) => {
    const { _id } = req.payload

    const {name, tag, description, steps, typeOfFood, ingredients} = req.body

    //get data from FE to send BE
    const newRecipe = {
        name: name,
        tag,
        createdBy: _id,
        description: description,
        steps,
        image: req.body.image === "" ? undefined : req.body.image,
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
router.delete("/:recipeId/delete", isLogged, async (req, res, next) => {
    const { recipeId } = req.params
    const { _id, role } = req.payload
    
    try {
        const recipeDetails = await Recipe.findById(recipeId)
        if (recipeDetails.createdBy == _id || role === "admin") {
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
    const {recipeId} = req.params
  try {
    await User.findByIdAndUpdate(_id    , {
      $pull: { favourites: recipeId },
    });
    res.status(200).json("Favorito eliminado correctamente")
   
  } catch (error) {
    next(error);
  }
});


//GET "api/recipes/:recipeId/ingredients" -> populate the ingredients of one recipe
router.get("/:recipeId/ingredients", isLogged, async (req, res, next) => {
    const { recipeId } = req.params
    try {
        const response = await Recipe.findById(recipeId).populate("ingredients")
        res.status(200).json(response)
       
      } catch (error) {
        next(error);
      }
})


//GET "api/recipes/:recipeId/user-fav-recipes" -> populate favourite recipes of user
router.get("/:recipeId/user-fav-recipes", isLogged, async (req, res, next) => {
    const { userId } = req.payload
    const { recipeId } = req.params


    try {
        const response = await User.findById(userId)

        res.status(200).json(response)
       
      } catch (error) {
        next(error);
      }
})


//GET "api/recipes/ingredients-list" -> shows a list of all recipes by ingredients
router.get("/ingredients-list", async (req, res, next) => {
    try{
        const response = await Recipe.find().select("ingredients")
        console.log("ingredients-list ", response)
        res.status(200).json(response)
    }catch(error) {
        next(error)
    }
})

//! BONUS PATCH "/api/recipes/:recipeId/likes"

module.exports = router;