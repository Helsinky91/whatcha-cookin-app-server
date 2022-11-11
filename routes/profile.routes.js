const User = require("../models/User.model");
const router = require("express").Router();
const  isLogged = require("../middlewares/auth.middlewares");



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
        console.log("req.payload._id", req.payload._id)
        console.log("response", response)
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
router.patch("/:userId/edit", isLogged, async (req, res, next) => {
    
    const { userId }= req.params
    const { username, role, photo, email, tags, friends, favourites } = req.body

    //get the changes to edit the user
    const userUpdates = {
        username, 
        role, 
        photo: req.file?.path,
        email, 
        tags, 
        friends, 
        favourites
    }

    try {
        await User.findByIdAndUpdate(req.params.userId, userUpdates);
        res.status(200).json("User updated successfully")

    }catch(error){
        next(error)
    }

})



// PATCH "/api/profile/:userId/add-friend" -> adds one profile as your friend
router.patch("/:userId/add-friend", async (req, res, next) => {
    const addFriend = {
        friends: req.body.addFriend
    }

    try {
        await User.findByIdAndUpdate(req.payload._id, addFriend)
    } catch (error) {
        next(error)
    }
    res.status(200).json("Amigo añadido correctamente")
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

    if (req.payload.role !== "admin" || req.payload._id !== userId) {
        next  //!return?
    }

    try {
        await User.findByIdAndDelete(req.payload._id)
        res.status(200).json("Perfil eliminado correctamente")

    } catch (error) {
        next(error)
    }
})


module.exports = router;