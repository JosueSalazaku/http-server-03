const express = require("express");
const recipes = require("./recipes");

const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ info: `Hello World!` });
});

app.get("/recipes", (req, res) => {
  res.json(recipes);
});

app.get("/recipes/:id", (req, res) => {
  const recipeId = parseInt(req.params.id);
  const recipe = recipes.find((recipe) => recipe.id === recipeId);
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ error: "Recipe not found bro " });
  }
});

app.post("/recipes", (req, res) => {
  const newRecipe = req.body;
  if (!newRecipe.name || !newRecipe.ingredients || !newRecipe.instructions) {
    return res.status(400).json({ error: "Invalid recipe data" });
  }
  newRecipe.id = recipes.lenght + 1;
  recipes.push(newRecipe);
  res.status(201).json({ message: "Recipe added successfully!" });
});
app.listen(PORT, () =>
  console.log(`Server Running at http://localhost:${PORT}/`)
);
