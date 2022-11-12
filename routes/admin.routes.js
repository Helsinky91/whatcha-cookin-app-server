const router = require("express").Router();
const  isLogged  = require("../middlewares/auth.middlewares");
const Recipe = require("../models/Recipe.model");

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
        res.status(200).json("User updated successfully")

    }catch(error){
        next(error)
    }
})

// DELETE "/api/admin/profile/:userId/delete-profile" -> removes one profile as your friend
router.delete("/profile/:userId/delete-profile", async (req, res,next) => {
    const { userId } = req.params

    try {
    if (req.payload._id === userId) {
        await User.findByIdAndDelete(userId)
        res.status(200).json("Perfil eliminado correctamente")        
    }

    } catch (error) {
        next(error)
    }
})




// DELETE "/api/admin/recipes/:recipeId/delete" -> delete specific recipe		
router.delete("/recipes/:recipeId/delete", isLogged, async (req, res, next) => {
    const { recipeId } = req.params
    
    try {
            await Recipe.findByIdAndDelete(recipeId)
            res.status(200).json("Recipe deleted")

    } catch (error) {
        next(error)
    }
})


module.exports = router;