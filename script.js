document.getElementById("search-button").addEventListener("click", () => {
  const query = document.getElementById("search-input").value.trim();
  if (query) {
    searchRecipes(query);
  }
});

async function searchRecipes(query) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const data = await response.json();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // Clear previous results

  if (data.meals) {
    data.meals.forEach((meal) => {
      const recipeEl = document.createElement("div");
      recipeEl.classList.add("recipe");
      recipeEl.innerHTML = `
          <h2>${meal.strMeal}</h2>
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          <p><a href="${
            meal.strSource || meal.strYoutube
          }" target="_blank">View Recipe</a></p>
        `;
      resultsDiv.appendChild(recipeEl);
    });
  } else {
    resultsDiv.innerHTML = "<p>No recipes found.</p>";
  }
}
