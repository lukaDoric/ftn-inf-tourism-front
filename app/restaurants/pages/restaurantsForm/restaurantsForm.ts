import { Meal } from "../../models/meal.model.js";
import { MealFormData } from "../../models/mealFormData.model.js";
import { Restaurant } from "../../models/restaurant.model.js";
import { RestaurantFormData } from "../../models/restaurantForm.data.model.js";
import { MealService } from "../../services/meal.service.js";
import { RestaurantsServices } from "../../services/restaurant.services.js";

const restaurantServices = new RestaurantsServices();
const mealService = new MealService();

const tabs = Array.from(document.querySelectorAll('.tab')) as HTMLElement[];
const step = Array.from(document.querySelectorAll('.step')) as HTMLElement[];
const probgresBar = document.querySelector('.progress') as HTMLElement;

const saveBtnRestaurant = document.querySelector('#saveBtnRestaurant') as HTMLButtonElement;
const saveBtnMeal = document.querySelector('#saveBtnMeal') as HTMLButtonElement;

const nextBtnRestaurant = document.querySelector('#nextBtnRestaurant') as HTMLButtonElement;
const nextBtnMeal = document.querySelector('#nextBtnMeal') as HTMLButtonElement;

const publishBtn = document.querySelector('#publishBtn') as HTMLButtonElement;
const cancelBtn = document.querySelector('#cancelBtn') as HTMLButtonElement;
const backBtn = document.querySelector('#backBtn') as HTMLButtonElement;

const tableDiv = document.querySelector('#meals-table-container') as HTMLDivElement;
const addMealFormElement = document.querySelector('#meal-form-container') as HTMLDivElement;

const restaurantFormHeadings = document.querySelector('#restaurant-headings');
const formTitle = document.querySelector('#form-title');

function initializationForm(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id')
    if (id) {
        const restaurantFormTitle = document.querySelector('#form-title');
        restaurantFormTitle.textContent = "Update restaurant form ";
        restaurantServices.getById(id)
            .then(restaurant => {
                (document.querySelector('#name') as HTMLInputElement).value = restaurant.name;
                (document.querySelector('#description') as HTMLInputElement).value = restaurant.description;
                (document.querySelector('#capacity') as HTMLInputElement).value = restaurant.capacity.toString();
                (document.querySelector('#imageUrl') as HTMLInputElement).value = restaurant.imageUrl;
                (document.querySelector('#latitude') as HTMLInputElement).value = restaurant.latitude.toString();
                (document.querySelector('#longitude') as HTMLInputElement).value = restaurant.longitude.toString();
            })
        initializationUpdateRestaurantForm()

    } else {

        initializationAddRestaurantForm()
    }
}

function initializationAddRestaurantForm(): void {

    formTitle.textContent = "Restaurant";
    tabs[0].style.display = "flex";
    probgresBar.style.width = "0%";
    step[0].classList.add('active');
    restaurantFormHeadings.textContent = "Enter new restaurant data";
    nextBtnRestaurant.addEventListener('click', function () {
        submitRestaurant();
        tabs[0].style.display = 'none';
        mealFormHandler()
    })
    saveBtnRestaurant.addEventListener('click', function () {
        submitRestaurant();
        window.location.href = '../restaurants/restaurants.html';
    })
    console.log(saveBtnRestaurant)
    cancelBtn.addEventListener('click', function () {
        window.location.href = "../restaurants/restaurants.html";
    })
}

function initializationUpdateRestaurantForm(): void {
    formTitle.textContent = "Restaurant";
    tabs[0].style.display = "flex";
    probgresBar.style.width = "0%";
    step[0].classList.add('active');
    restaurantFormHeadings.textContent = "Update restaurant data"
    nextBtnRestaurant.onclick = function () {
        submitRestaurant();
        tabs[0].style.display = 'none';
        mealFormHandler()
    }
    saveBtnRestaurant.addEventListener('click', function () {
        submitRestaurant();
        window.location.href = '../restaurants/restaurants.html';
    })
    cancelBtn.addEventListener('click', function () {
        window.location.href = "../restaurants/restaurants.html";
    })
}


function initializationMealForm(): void {

    formTitle.textContent = "Meal";
    tabs[1].style.display = "flex";
    probgresBar.style.width = "50%";
    step[0].classList.add('active');
    step[1].classList.add('active');
    restaurantFormHeadings.textContent = "Enter new meal data";
    nextBtnMeal.onclick = function () {
        tabs[1].style.display = 'none';
        publishingFromHandler()
    }
    saveBtnMeal.onclick = function () {
        submitMeal()
        const mealForm = tabs[1] as HTMLFormElement;
        mealForm.reset()
    }
    backBtn.onclick = function () {
        tabs[1].style.display = 'none';
        tabs[0].style.display = 'flex';
    }
    const addBtn = document.querySelector('#addBtn') as HTMLButtonElement;
    addBtn.onclick = function () {
        addMealFormElement.style.display = 'flex';
    }
}

function initializationPublishForm(): void {

    formTitle.textContent = "Publishing";
    tabs[2].style.display = "flex";
    probgresBar.style.width = "100%";
    step[0].classList.add('active');
    step[1].classList.add('active');
    step[2].classList.add('active');
    restaurantFormHeadings.textContent = "";

}

function submitRestaurant(): void {

    const name = (document.querySelector('#name') as HTMLInputElement).value;
    const description = (document.querySelector('#description') as HTMLInputElement).value;
    const capacity = (document.querySelector('#capacity') as HTMLInputElement).value;
    const imageUrl = (document.querySelector('#imageUrl') as HTMLInputElement).value;
    const latitude = parseFloat((document.querySelector('#latitude') as HTMLInputElement).value);
    const longitude = parseFloat((document.querySelector('#longitude') as HTMLInputElement).value);
    const ownerId = parseInt(localStorage.getItem('id'));

    if (!name || !description || !capacity || !imageUrl || !latitude || !longitude || !ownerId) {
        alert("All feilds are required!")
        return
    }

    const reqBody: RestaurantFormData = { name, description, capacity, imageUrl, latitude, longitude, ownerId }

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id')

    if (id) {
        restaurantServices.update(id, reqBody)
            .then(() => {

            })
            .catch(error => {
                console.log(`Error: `, error.status);
            })

    } else {
        restaurantServices.create(reqBody)
            .then((restaurant) => {
                localStorage.setItem('restaurantId', restaurant.id.toString())
            })
            .catch(error => {
                console.log(`Error: `, error.status);
            })
    }
}

// function restaurantValidation() {
//     const name = document.querySelector('#name') as HTMLInputElement;
//     const description = document.querySelector('#description') as HTMLInputElement;
//     const capacity = document.querySelector('#capacity') as HTMLInputElement;
//     const imageUrl = document.querySelector('#imageUrl') as HTMLInputElement;
//     const latitude = document.querySelector('#latitude') as HTMLInputElement;
//     const longitude = document.querySelector('#longitude') as HTMLInputElement;

//     function isNameValid(name: HTMLInputElement): boolean {
//         return name.value.trim().length >= 2;
//     }
//     function isDescriptionValid(description: HTMLInputElement): boolean {
//         return description.value.trim().length >= 2;
//     }

//     function isCapacityValid(capacity: HTMLInputElement): boolean {
//         return capacity.value.trim().length > 0;
//     }
//     function isRestaurantImageUrlValid(imageUrl: HTMLInputElement): boolean {
//         return imageUrl.value.trim().length >= 5;
//     }
//     function isLatitudeValid(latitude: HTMLInputElement): boolean {
//         return latitude.value.trim().length > 0;
//     }
//     function isLongitudeValid(longitude: HTMLInputElement): boolean {
//         return longitude.value.trim().length > 0;
//     }

//     function checkValidity() {
//         if (isNameValid(name) && isDescriptionValid(description) && isCapacityValid(capacity)
//             && isRestaurantImageUrlValid(imageUrl) && isLatitudeValid(latitude) && isLongitudeValid(longitude)) {
//             saveBtnRestaurant.disabled = false;
//             nextBtnRestaurant.disabled = false;
//         } else {
//             saveBtnRestaurant.disabled = true;
//             nextBtnRestaurant.disabled = true;
//         }
//     }
//     name.addEventListener('blur', () => {
//         if (!isNameValid(name)) {
//             const nameErrorMessage = document.querySelector('#name-errorMessage') as HTMLSpanElement;
//             nameErrorMessage.textContent = 
// }
//     })
// }






    function submitMeal(): void {
        const name = (document.querySelector('#meal-name') as HTMLInputElement).value;
        const price = parseFloat((document.querySelector('#price') as HTMLInputElement).value);
        const ingredients = (document.querySelector('#ingredients') as HTMLInputElement).value;
        const imageUrl = (document.querySelector('#meal-imageUrl') as HTMLInputElement).value ?? '';

        // TO DO: treba postaviti validaciju u CSS da ne moze biti 
        // razno polje pri povlacenju iz frome.

        const reqBody: MealFormData = { name, price, ingredients, imageUrl }

        const urlParams = new URLSearchParams(window.location.search);
        let id = urlParams.get('id');
        if (id) {
            mealService.create(id, reqBody)
                .then(() => {
                    mealFormHandler()
                })
                .catch(error => {
                    console.log(`Error:`, error.status)
                })
        } else {
            id = localStorage.getItem('restaurantId');
            mealService.create(id, reqBody)
                .then(() => {
                    mealFormHandler()
                })
                .catch(error => {
                    console.log(`Error:`, error.status)
                })
        }
    }

    function mealFormHandler(): void {
        initializationMealForm()

        const urlParams = new URLSearchParams(window.location.search)
        let id = urlParams.get('id')
        if (!id) {
            id = localStorage.getItem('restaurantId')
        }

        restaurantServices.getById(id)
            .then((restaurant: Restaurant) => {
                if (!restaurant.meals || restaurant.meals.length === 0) {
                    showMealAddFrom();
                } else {
                    hideMealAddForm();
                    renderMeals(restaurant.meals, restaurant)
                }
            })
    }

    function hideMealAddForm() {
        tableDiv.style.display = 'block';
        addMealFormElement.style.display = 'none';
    }

    function showMealAddFrom() {
        tableDiv.style.display = 'none';
        addMealFormElement.style.display = 'flex';
    }

    function renderMeals(meals: Meal[], restaurant: Restaurant) {
        const table = document.querySelector('table tbody');
        table.innerHTML = '';
        restaurant.meals.forEach(meal => {
            const tableRow = document.createElement('tr')

            const name = document.createElement('td')
            name.textContent = meal.name;
            tableRow.appendChild(name);


            const price = document.createElement('td')
            price.textContent = meal.price.toString();
            tableRow.appendChild(price);

            const ingredients = document.createElement('td')
            ingredients.textContent = meal.ingredients;
            tableRow.appendChild(ingredients);

            const imageUrl = document.createElement('td')
            imageUrl.textContent = meal.imageUrl;
            tableRow.appendChild(imageUrl);

            const buttonCell1 = document.createElement('td')
            const deleteBtn = document.createElement('td')
            deleteBtn.classList.add("deleteBtn")
            deleteBtn.textContent = "Delete";
            deleteBtn.onclick = function () {
                deleteMeal(restaurant, meal);
            }
            buttonCell1.appendChild(deleteBtn)
            tableRow.appendChild(buttonCell1)


            table.appendChild(tableRow);
        })

    }


    function deleteMeal(restaurant: Restaurant, meal: Meal) {
        mealService.delete(restaurant.id.toString(), meal.id.toString())
            .then(() => {
                mealFormHandler();
            })
            .catch(error => {
                console.log(`Error:`, error.status);
            });
    }

    function publishingFromHandler() {
        initializationPublishForm()
    }


    const logout = document.querySelector('#logout');
    function handleLogout() {
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('id');
    }

    logout.addEventListener('click', function () {
        handleLogout()
        window.location.href = "../../../users/pages/login/login.html";
    })


    document.addEventListener('DOMContentLoaded', function () {
        initializationForm()

    })
