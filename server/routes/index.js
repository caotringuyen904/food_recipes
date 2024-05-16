const { Router } = require("express");
const recipeRoute = require("./recipe.js");

const router = Router();
router.use("/api/recipe", recipeRoute);

module.exports = router;
