const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});


const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const recipesRoutes = require("./recipes/recipes.routes")
router.use("/recipes", recipesRoutes)

module.exports = router;
