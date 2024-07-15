// ===============Fetch meals from API=============
async function getAllMeals() {
    try {
        let res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        let data = await res.json();
        displayMeals(data.meals);
        console.log(data.meals);
    } catch (error) {
        console.error('Errore durante il recupero dei pasti:', error);
    }
}

getAllMeals();

// =================Display meals in cards==============
function displayMeals(meals) {
    let box = '';
    let rowData = document.getElementById('rowData');

    meals.forEach(meal => {
        box += `
            <div class="col-sm-12 col-md-4 col-lg-2">
                <div class="card meal-card" data-meal-id="${meal.idMeal}">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <div class="card-layer">
                        <h2>${meal.strMeal}</h2>
                    </div>
                </div>
            </div>`;
    });

    rowData.innerHTML = box;
}

// ============ Fetch and display meal details in modal================
async function showMealDetails(mealId) {
    try {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        let data = await res.json();
        let meal = data.meals[0];

        let ingredients = '';
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                ingredients += `<li>${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}</li>`;
            }
        }

        let modalContent = `
            <div class="modal fade" id="mealModal">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="mealModalLabel">${meal.strMeal}</h5>
                            <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body d-flex flex-column">
                            <div class="d-flex mb-3">
                                <div class="meal-img-container me-3">
                                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid">
                                </div>
                                <div class="meal-details">
                                    <p><strong>Category:</strong> ${meal.strCategory}</p>
                                    <p><strong>Area:</strong> ${meal.strArea}</p>
                                    <h4>Recipe</h4>
                                    <ul>${ingredients}</ul>
                                </div>
                            </div>
                            <div>
                                <h4>Instructions</h4>
                                <p>${meal.strInstructions}</p>
                                <div class="d-flex flex-column">
                                    <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger mb-2">Watch on YouTube</a>
                                    <a href="${meal.strSource}" target="_blank" class="btn btn-primary">Recipe Source</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

        document.getElementById('modalContainer').innerHTML = modalContent;
        let mealModal = new bootstrap.Modal(document.getElementById('mealModal'));
        mealModal.show();
    } catch (error) {
        console.error('Errore durante il recupero dei dettagli del pasto:', error);
    }
}

// ===============Fetch categories from API======================
async function getCategories() {
    try {
        let res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        let data = await res.json();
        displayCategories(data.categories);
        console.log(data.categories);
    } catch (error) {
        console.error('Errore durante il recupero delle categorie:', error);
    }
}

// ====================Display categories in cards=====================
function displayCategories(categories) {
    let box = '';
    let rowData = document.getElementById('rowData');

    categories.forEach(category => {
        box += `
            <div class="col-sm-12 col-md-4 col-lg-2">
                <div class="card bg-transparent category-card" data-category-name="${category.strCategory}">
                    <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
                    <div class="card-layer">
                        <h4>${category.strCategory}</h4>
                    </div>
                </div>
            </div>`;
    });

    rowData.innerHTML = box;
}

// =================Fetch meals by category=================
async function getMealsByCategory(categoryName) {
    try {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
        let data = await res.json();
        displayMeals(data.meals);
        console.log(data.meals);
    } catch (error) {
        console.error('Errore durante il recupero dei pasti della categoria:', error);
    }
}

// ================Fetch ingredients from API===============
async function getIngredients() {
    try {
        let res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
        let data = await res.json();
        displayIngredients(data.meals.slice(0, 20)); // Mostra solo i primi 20 ingredienti
        console.log(data.meals);
    } catch (error) {
        console.error('Errore durante il recupero degli ingredienti:', error);
    }
}

// ===============Display ingredients in cards===================
function displayIngredients(ingredients) {
    let box = '';
    let rowData = document.getElementById('rowData');

    ingredients.forEach(ingredient => {
        box += `
            <div class="card bg-transparent col-sm-12 col-md-4 col-lg-3 ingredient-card" data-ingredient-name="${ingredient.strIngredient}">
                <div class="meal text-center" style="max-height: 200px; cursor: pointer;">
                <i class="fa-solid fa-utensils fa-4x text-white"></i>
                    <h5 class="text-white">${ingredient.strIngredient}</h5>
                    <small class="text-white">${ingredient.strDescription ? ingredient.strDescription.split(" ").slice(0, 20).join(" ") : ''}</small>
                </div>
            </div>`;
    });

    rowData.innerHTML = box;
}

//=================== Fetch meals by ingredient===================
async function getMealsByIngredient(ingredientName) {
    try {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`);
        let data = await res.json();
        displayMeals(data.meals);
        console.log(data.meals);
    } catch (error) {
        console.error('Errore durante il recupero dei pasti per ingrediente:', error);
    }
}

// ===================Fetch areas from API===================
async function getAreas() {
    try {
        let res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        let data = await res.json();
        displayAreas(data.meals.slice(0, 20)); // Mostra solo le prime 20 aree
        console.log(data.meals);
    } catch (error) {
        console.error('Errore durante il recupero delle aree:', error);
    }
}

// ===================Fetch meals by area===================
async function getMealsByArea(areaName) {
    try {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
        let data = await res.json();
        displayMeals(data.meals);
        console.log(data.meals);
    } catch (error) {
        console.error('Errore durante il recupero dei pasti per area:', error);
    }
}
// ===================Display areas in cards===================
function displayAreas(areas) {
    let box = '';
    let rowData = document.getElementById('rowData');

    areas.forEach(area => {
        box += `
            <div class="card bg-transparent g-4 col-sm-12 col-md-4 col-lg-3 area-card" data-area-name="${area.strArea}">
                <div class="meal text-center" style="max-height: 200px; cursor: pointer;">
                <i class="text-white fa-solid fa-plane-departure fa-4x"></i>
                    <h5 class="text-white">${area.strArea}</h5>
                </div>
            </div>`;
    });

    rowData.innerHTML = box;
}

// ===================Function to search meals by name===================
async function searchByName(name) {
    try {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        let data = await res.json();
        displayMeals(data.meals);
        console.log(data.meals);
    } catch (error) {
        console.error('Errore durante la ricerca dei pasti per nome:', error);
    }
}

// ===================Function to search meals by first letter===================
async function searchByFirstLetter(letter) {
    try {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        let data = await res.json();
        displayMeals(data.meals);
        console.log(data.meals);
    } catch (error) {
        console.error('Errore durante la ricerca dei pasti per lettera:', error);
    }
}

//==========search ui=========
function goToSearch() {
    let searchInputs = '';
    let rowData = document.getElementById('rowData');
    
    searchInputs = `
        <div class="search-container">
            <input type="text" id="name" class="form-control mb-3" placeholder="Search Meal by Name">
            <input type="text" id="letter" class="form-control mb-3" placeholder="Search Meal by First Letter">
            <button id="searchButton" class="btn btn-primary">Search</button>
        </div>`;
    
    rowData.innerHTML = searchInputs;

    //=======event listener for search btn=========
    document.getElementById('searchButton').addEventListener('click', async () => {
        let searchMeal = document.getElementById('name').value;
        let searchLetter = document.getElementById('letter').value;

        if (searchMeal) {
            await searchByName(searchMeal);
        }
        if (searchLetter) {
            await searchByFirstLetter(searchLetter);
        }
    });
}

// ========jQuery to handle events========
$(document).ready(function () {
    $('.nav-top').click(function () {
        getAllMeals();
    });
    $('#all').click(function () {
        getAllMeals();
    });
    // =====Toggle hidden navigation menu=====
    $('.nav-center .bi-list').click(function () {
        $('#hidden-nav').toggleClass('d-none d-block');
    });

    // =====Show meal details in modal on meal card click=====
    $('#rowData').on('click', '.meal-card', function () {
        let mealId = $(this).data('meal-id');
        showMealDetails(mealId);
    });

    // =====Fetch and display categories on Categories click=====
    $('#categories').click(function () {
        getCategories();
    });

    // =====Fetch and display meals by category on category card click=====
    $('#rowData').on('click', '.category-card', function () {
        let categoryName = $(this).data('category-name');
        getMealsByCategory(categoryName);
    });

    // =====Fetch and display ingredients on Ingredients click=====
    $('#ingredients').click(function () {
        getIngredients();
    });

    // ===== Fetch and display meals by ingredient on ingredient card click=====
    $('#rowData').on('click', '.ingredient-card', function () {
        let ingredientName = $(this).data('ingredient-name');
        getMealsByIngredient(ingredientName);
    });

    // =====Fetch and display areas on 'Area' click=====
    $('#area').click(function () {
        getAreas();
    });

    // =====Fetch and display meals by area on area card click=====
    $('#rowData').on('click', '.area-card', function () {
        let areaName = $(this).data('area-name');
        getMealsByArea(areaName);
    });

    // =====Handle search by name and first letter on Search click=====
    $('#search').click(function () {
        goToSearch();
    });
});
