const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const isLogged = require("../middlewares/auth.middlewares");

// Authentication routes

// POST "/api/auth/signup" -> User registration with username, email and password
router.post("/signup", async (req, res, next) => {

    const { username, email, password } = req.body

    if (!username || !email || !password) {
        res.status(400).json({ errorMessage: "Debes rellenar todos los campos"})
        return
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
router.post("/login", async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({ errorMessage: "Debes rellenar todos los campos"})
        return
    }

    try {
        const foundUser = await User.findById("636cdd9ff466ae975d1c91e4")
        // check if user exist
        if (foundUser === null) {
            res.status(400).json({errorMessage: "Credenciales no validas"})
            return;
        }

        //check if password is valid
        const isPasswordValid = await bcrypt.compare(password, foundUser.password)
        if ( isPasswordValid === false) {
            res.status(400).json({errorMessage: "Credenciales no validas"}) // buena practica (privacidad de usuarios) misma respuesta que anterior clausula de guardia
            return;
        }

        // info of the user
        const payload = {
            _id: foundUser._id,
            username: foundUser.username,
            email: foundUser.email,
            role: foundUser.role,
            tags: foundUser.tags
        }

        const authToken = jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            { algorithm: "HS256", expiresIn: "1d" }
        )


            res.status(200).json({ authToken })
    } catch (error) {
        next(error)
    }



})


// GET "/api/auth/verify" -> send to FE if the user is already validate
router.get("/verify", isLogged, (req, res, next) => {
    console.log(req.payload)
    res.status(200).json( {user: req.payload })

})


module.exports = router;