const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const router = require("express").Router();


// Authentication routes

// POST "/api/auth/signup" -> User registration with username, email and password
router.post("/signup", async (req, res, next) => {

    const { username, email, password } = req.body

    if (!username || !email, !password) {
        res.status(400).json({ errorMessage: "Debes rellenar todos los campos"})
    }

    //if extras


    try {
        // passowrd codification
        const salt = await bcrypt.genSalt(8)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = { 
            username: username, 
            email: email,
            password: hashPassword 
        }

        // create new user and send OK message to FE
        await User.create(newUser)
        res.status(201).json("Usuario registrado con éxito")

    } catch (error) {
        next(error)
    }


})

// POST "/api/auth/login" -> validete user credentials



// GET "/api/auth/verify" -> send to FE if the user is already validate



module.exports = router;