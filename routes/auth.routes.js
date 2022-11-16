const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const isLogged = require("../middlewares/auth");

// Authentication routes

// POST "/api/auth/signup" -> User registration with username, email and password
router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ errorMessage: "Debes rellenar todos los campos" });
    return;
  }

  // check the password strength
  const passwordRegex = /^(?=.*\d)(?=.*[a-z]).{6,}$/gm;
  if (passwordRegex.test(password) === false) {
    res
      .status(400)
      .json({
        errorMessage:
          "La contraseña tiene que tener almenos 6 caracteres, con al menos un número",
      });
    return;
  }

  // check the email structure
  if (!email.includes("@")) {
    res
      .status(400)
      .json({ errorMessage: "Introduce un correo electrónico válido" });
    return;
  }

  try {
    // check if email is already registered
    const userEmail = await User.findOne({ email });
    if (userEmail !== null) {
      res
        .status(400)
        .json({ errorMessage: "Introduce un correo electrónico válido" });
      return;
    }

    // passowrd codification
    const salt = await bcrypt.genSalt(8);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = {
      username: username,
      email: email,
      password: hashPassword,
    };

    // create new user and send OK message to FE
    await User.create(newUser);
    res.status(201).json("Usuario registrado con éxito");
  } catch (error) {
    next(error);
  }
});

// POST "/api/auth/login" -> validete user credentials
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ errorMessage: "Debes rellenar todos los campos" });
    return;
  }

  try {
    const foundUser = await User.findOne({email: email});
    // check if user exist
    if (foundUser === null) {
      res.status(400).json({ errorMessage: "Credenciales no validas" });
      return;
    }

    //check if password is valid
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (isPasswordValid === false) {
      res.status(400).json({ errorMessage: "Credenciales no validas" }); // buena practica (privacidad de usuarios) misma respuesta que anterior clausula de guardia
      return;
    }

    // info of the user stored in the Token
    const payload = {
      _id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
      role: foundUser.role,
      tag: foundUser.tag,
    };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "1d",
    });

    res.status(200).json({ authToken });
  } catch (error) {
    next(error);
  }
});

// GET "/api/auth/verify" -> send to FE if the user is already validate
router.get("/verify", isLogged, (req, res, next) => {

  
  res.status(200).json( req.payload );
});

module.exports = router;
