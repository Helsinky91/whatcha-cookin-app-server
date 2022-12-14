const router = require("express").Router();
const isLogged = require("../middlewares/auth");
const isAdmin = require("../middlewares/admin");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//set up for auth.routes.js to start "/auth/..."
const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

//set up for profile.routes.js to start "/profile/..."
const profileRoutes = require("./profile.routes");
router.use("/profile", isLogged, profileRoutes);


//set up for recipes.routes.js to start "/recipes/..."
const recipesRoutes = require("./recipes.routes");
router.use("/recipes", recipesRoutes);

//set up for recipes.routes.js to start "/recipes/..."
const commentRoutes = require("./comment.routes");
router.use("/comment", commentRoutes);

const uploadRoutes = require("./upload.routes");
router.use("/uploader", uploadRoutes);

module.exports = router;
