const router = require("express").Router();

// GET "/api/profile/search" -> shows filtered profiles



// GET "/api/profile/:userId/details" -> shows loggedin user profile by ID of req.payload
//si quiero ver el loggedin perfil, del req.payload

// GET "/api/profile/:userId/details" -> shows one profile by ID 
//si quiero ver el perfil de amigo, req.params 



// PATCH "/api/profile/:userId/add-friend" -> adds one profile as your friend


// DELETE "/api/profile/:userId/delete-friend" -> removes one profile as your friend

module.exports = router;