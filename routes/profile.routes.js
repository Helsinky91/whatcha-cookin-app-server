const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");
const tag = require("../utils/tag");
const router = require("express").Router();


// GET "/api/profile/list" -> shows filtered profiles
router.get("/list", async (req, res, next) => {
    try {
        const response = await User.find()
        res.status(200).json(response)
        
    } catch (error) {
        next(error)
    }
})


// GET "/api/profile/my-profile" -> shows loggedin user profile by ID of req.payload
//si quiero ver el loggedin perfil, del req.payload
router.get("/my-profile", async (req, res, next) => {
    
    try {
        const response = await User.findById(req.payload._id)
 
        res.status(200).json(response)

    } catch (error) {
        next(error)
    }
})

// GET "/api/profile/search-friend" -> searh profiles
router.get("/search-friends", async (req, res, next) => {
    try {
        const response = await User.find()
        res.status(200).json(response)
    } catch (error) {
        next(error)
        
    }
})


// GET "/api/profile/:userId/details" -> shows one profile by ID 
//si quiero ver el perfil de amigo, req.params 
router.get("/:userId/details", async (req, res,next) => {
    const { userId }= req.params
try {
    const response = await User.findById(userId)
    res.status(200).json(response)
} catch (error) {
    next(error)
}
})

//PATCH "/api/profile/:userId/edit "  => edits and updates profile
router.patch("/:userId/edit", async (req, res, next) => {
    
    const { username, email, tag, friends, favourites } = req.body
    const { _id, role } = req.payload

    if( username === "" ) {
        res.status(400).json({ errorMessage: "Please fill username" })
        return
    } else if( email === "" ) {
        res.status(400).json({ errorMessage: "Please fill email" })
        return
    } 

    //get the changes to edit the user
    const userUpdates = {
        username, 
        image: req.body.image,
        email, 
        tag,  
        friends, 
        favourites
    }
    try {
        if (req.payload._id == userId || role === "admin"){
        await User.findByIdAndUpdate(req.params.userId, userUpdates);
        res.status(200).json("User updated successfully")
        console.log("userUpdates in profile edit" ,userUpdates)
        }

    }catch(error){
        next(error)
    }

})



// PATCH "/api/profile/:userId/add-friend" -> adds one profile as your friend
router.patch("/:userId/add-friend", async (req, res, next) => {
    const { userId }= req.params

    try {
        await User.findByIdAndUpdate(req.payload._id, {
            $addToSet: { friends: userId } 
        })
        res.status(200).json("Amigo añadido correctamente")
    } catch (error) {
        next(error)
    }
})

// PATCH"/api/profile/:userId/un-friend" -> removes one profile as your friend
router.patch("/:userId/un-friend", async (req, res,next) => {

    const { userId }= req.params

    try {
        await User.findByIdAndUpdate(req.payload._id, {
            $pull: {friends: userId}
        })

    res.status(200).json("Amigo eliminado correctamente")

    } catch (error) {
        next(error)
    }
})


// DELETE "/api/profile/:userId/delete-profile" -> removes one profile as your friend
router.delete("/:userId/delete-profile", async (req, res,next) => {
    const { userId } = req.params
    const { _id, role } = req.payload

    try {
    if (req.payload._id == userId || role === "admin") {
        await User.findByIdAndDelete(userId)
        res.status(200).json("Perfil eliminado correctamente")
        
    }


    } catch (error) {
        next(error)
    }
})

//GET "api/profile/friends" -> populate friends of one user
router.get("/friends", async (req, res, next) => {

  
    try {
        const response = await User.findById(req.payload._id).populate("friends")
        res.status(200).json(response)
       
      } catch (error) {
        next(error);
      }
})

//GET "api/profile/my-recipes" -> populate recipes of the user
router.get("/my-recipes", async (req, res, next) => {

    try {
        const response = await Recipe.find({createdBy: `${req.payload._id}` }).populate('createdBy')

        res.status(200).json(response)
       
      } catch (error) {
        next(error);
      }
})


//GET "api/profile/my-fav-recipes" -> populate favourite recipes of user
router.get("/my-fav-recipes", async (req, res, next) => {
  
    try {
        const response = await User.findById(req.payload._id).populate("favourites")
        res.status(200).json(response)
       
      } catch (error) {
        next(error);
      }
})

//GET "/api/profile/:friendId/fav-recipes"
router.get("/:friendId/fav-recipes", async (req, res,next) => {
    const { friendId }= req.params
try {
    const response = await User.findById(friendId).populate("favourites")
    res.status(200).json(response)
} catch (error) {
    next(error)
}
})

// GET "/api/profile/tag" -> shows tag in recipes
router.get("/tag", async (req, res, next) => {
    // console.log("tag", tag)
    res.status(200).json(tag)
})


module.exports = router;