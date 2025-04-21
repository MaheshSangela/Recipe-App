let searchBox = document.querySelector("#searchBox");
const searchBtn = document.querySelector(".btn");
const container = document.querySelector(".container-xl");
const recipeContainer = document.querySelector("#recipeContainer");
const mealContant = document.querySelector("#mealContent");
const closeRecipe = document.querySelector("#closeRecipe");

// Fetching meal data from API
const fetchRecipies = async (query) => {
    container.innerHTML = "<h2>fetching meal...</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    // Check if the response contains meals
    if (!response.meals) {
        container.innerHTML = "<p>No recipes found!</p>";
        return;
    }

    container.innerHTML = "";

    //Display meals
    response.meals.forEach(meal => {
        const recipiDiv = document.createElement('div');
        recipiDiv.classList.add("card", "p-3", "m-4");
        recipiDiv.style.maxWidth = "350px";

        recipiDiv.innerHTML = `
            <img src="${meal.strMealThumb}" class="img-fluid rounded">
            <h3  style="margin-top: 10px";>${meal.strMeal}</h3>
            <p style="margin-bottom:0"><strong>${meal.strArea}</strong> Dish</p>
            <p>Belongs to <strong> ${meal.strCategory}</strong> Category</p>
        `;

        //Display recipe on click
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        button.classList.add("btn", "btn-primary", "mt-2");
        recipiDiv.appendChild(button);


        // Display recipe details and ingredients
        const fetchIngredient = (meal) => {
            let IngredientList = "";
            for (let i = 1; i <= 20; i++) {
                const Ingredient = meal[`strIngredient${i}`]
                if (Ingredient && Ingredient.trim() !== "") {
                    const measure = meal[`strMeasure${i}`]
                    IngredientList += `<li>${Ingredient} - ${measure}</li>`
                } else {
                    break;
                }

            }
            return IngredientList;
        }

        //Display recipe container
        button.addEventListener("click", () => {
            recipeContainer.classList.remove("d-none");
            container.style.opacity = "0.5";

            mealContant.innerHTML = `
            <h2>${meal.strMeal}</h2>
            <h5>Ingredent:</h5>
            <ul>${fetchIngredient(meal)}</ul>
            <div>
                <h5>Instructions:</h5>
                <p>${meal.strInstructions}</p>
            </div>
            `
        });
        container.appendChild(recipiDiv);
    });
}

// Close recipe container
closeRecipe.addEventListener("click", () => {
    recipeContainer.classList.add("d-none");
    container.style.opacity = "1";
});


//input session
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();

    if (searchInput) {
        fetchRecipies(searchInput);
    } else {
        container.innerHTML = "<p>Please enter a search term!</p>";
    }
});
