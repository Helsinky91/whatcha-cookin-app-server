const router = require("express").Router();
const  isLogged  = require("../middlewares/auth.middlewares");
const isAdmin = require("../middlewares/admin.middleware");


router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//set up for auth.routes.js to start "/auth/..."
const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

//set up for profile.routes.js to start "/profile/..."
const profileRoutes = require("./profile.routes")
router.use("/profile", isLogged, profileRoutes)

//set up for admin.routes.js to start "/admin/..."
const adminRoutes = require("./admin.routes");
router.use("/admin", isLogged, isAdmin, adminRoutes)

//set up for recipes.routes.js to start "/recipes/..."
const recipesRoutes = require("./recipes.routes")
router.use("/recipes", recipesRoutes)

//set up for ingredients.routes.js to start "/ingredients/..."
const ingredientsRoutes = require("./ingredients.routes");
router.use("/ingredient", ingredientsRoutes)

const uploadRoutes = require("./upload.routes")
router.use("/uploader", uploadRoutes)

module.exports = router;
