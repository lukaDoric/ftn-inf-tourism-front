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
const backBtn = document.querySelector('#backBtn') as HTMLButtonElement;

const tableDiv = document.querySelector('#meals-table-container') as HTMLDivElement;
const table = document.querySelector('#meals') as HTMLElement;

const restaurantFormHeadings = document.querySelector('#restaurant-headings');
const formTitle = document.querySelector('#form-title');

function initializationForm(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id')
    if (id) {
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

    tabs[0].style.display = "flex";
    probgresBar.style.width = "0%";
    step[0].classList.add('active');
    restaurantFormHeadings.textContent = "Enter new restaurant data";
    restaurantValidation()
    nextBtnRestaurant.addEventListener('click', function () {
        submitRestaurant();
        tabs[0].style.display = 'none';
        mealFormHandler()
    })
    saveBtnRestaurant.addEventListener('click', function () {
        submitRestaurant();
        window.location.href = '../restaurants/restaurants.html';
    })
}

function initializationUpdateRestaurantForm(): void {

    tabs[0].style.display = "flex";
    probgresBar.style.width = "0%";
    step[0].classList.add('active');
    restaurantFormHeadings.textContent = "Update restaurant data"
    restaurantValidation()
    nextBtnRestaurant.onclick = function () {
        submitRestaurant();
        tabs[0].style.display = 'none';
        mealFormHandler()
    }
    saveBtnRestaurant.addEventListener('click', function () {
        submitRestaurant();
        window.location.href = '../restaurants/restaurants.html';
    })
}


function initializationMealForm(): void {

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
    const restaurantImageUrl = (document.querySelector('#restaurnatImageUrl') as HTMLInputElement).value;
    const latitude = parseFloat((document.querySelector('#latitude') as HTMLInputElement).value);
    const longitude = parseFloat((document.querySelector('#longitude') as HTMLInputElement).value);
    const ownerId = parseInt(localStorage.getItem('id'));

    // if (!name || !description || !capacity || !imageUrl || !latitude || !longitude || !ownerId) {
    //     alert("All feilds are required!")
    //     return
    // }

    restaurantValidation()

    const reqBody: RestaurantFormData = { name, description, capacity, imageUrl: restaurantImageUrl, latitude, longitude, ownerId }

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
                const paht: string = `http://127.0.0.1:5500/app/restaurants/pages/restaurantsForm/restaurantsForm.html?id=${restaurant.id}`
                window.history.pushState({}, "", paht);
            })
            .catch(error => {
                console.log(`Error: `, error.status);
            })
    }
}

function restaurantValidation() {
    const nameInputElement = (document.querySelector('#name') as HTMLInputElement)
const descriptionInputElement  = (document.querySelector('#description') as HTMLInputElement)
const capacityInputElement  = (document.querySelector('#capacity') as HTMLInputElement)
const restaurantImageUrlInputElement  = (document.querySelector('#restaurnatImageUrl') as HTMLInputElement)
const latitudeInputElement  = (document.querySelector('#latitude') as HTMLInputElement)
const longitudeInputElement  = (document.querySelector('#longitude') as HTMLInputElement)

    
    function isNameValid(nameInputElement: HTMLInputElement): boolean {
        return nameInputElement.value.trim().length >= 2;
    }
    function isDescriptionValid(descriptionInputElement: HTMLInputElement): boolean {
        return descriptionInputElement.value.trim().length >= 2;
    }

    function isCapacityValid(capacityInputElement: HTMLInputElement): boolean {
        return capacityInputElement.value.trim().length > 0;
    }
    function isRestaurantImageUrlValid(restaurantImageUrlInputElement: HTMLInputElement): boolean {
        return restaurantImageUrlInputElement.value.trim().length >= 5;
    }
    function isLatitudeValid(latitudeInputElement: HTMLInputElement): boolean {
        return latitudeInputElement.value.trim().length > 0;
    }
    function isLongitudeValid(longitudeInputElement: HTMLInputElement): boolean {
        return longitudeInputElement.value.trim().length > 0;
    }

    function checkValidity() {
        if (isNameValid(nameInputElement) && isDescriptionValid(descriptionInputElement) && isCapacityValid(capacityInputElement)
            && isRestaurantImageUrlValid(restaurantImageUrlInputElement) && isLatitudeValid(latitudeInputElement) && isLongitudeValid(longitudeInputElement)) {
            saveBtnRestaurant.disabled = false;
            nextBtnRestaurant.disabled = false;
        } else {
            saveBtnRestaurant.disabled = true;
            nextBtnRestaurant.disabled = true;
        }
    }
    const warnColor = '#d9534f';
    nameInputElement.addEventListener('blur', () => {
        if (!isNameValid(nameInputElement)) {
            const nameErrorMessage = document.querySelector('#name-errorMessage') as HTMLSpanElement;
            nameErrorMessage.textContent = 'Field is required.';
            nameErrorMessage.style.color = warnColor;
            nameInputElement.classList.add('error')
            checkValidity()
        }else{
            const nameErrorMessage = document.querySelector('#name-errorMessage') as HTMLSpanElement;
            nameErrorMessage.textContent = '';
            nameInputElement.classList.remove('error')
        }
    })
    descriptionInputElement.addEventListener('blur', () => {
        if (!isDescriptionValid(descriptionInputElement)) {
            const descriptionErrorMessage = document.querySelector('#description-errorMessage') as HTMLSpanElement;
            descriptionErrorMessage.textContent = 'Field is required.';
            descriptionErrorMessage.style.color = warnColor;
            descriptionInputElement.style.borderColor = warnColor
            checkValidity()
        }
    })
    capacityInputElement.addEventListener('blur', () => {
        if (!isCapacityValid(capacityInputElement)) {
            capacityInputElement.style.borderColor = warnColor;
            const capacityErrorMessage = document.querySelector('#capacity-errorMessage') as HTMLSpanElement;
            capacityErrorMessage.textContent = 'Field is required.';
            capacityErrorMessage.style.color = warnColor;
            checkValidity()

        }
    })
    restaurantImageUrlInputElement.addEventListener('blur', () => {
        if (!isRestaurantImageUrlValid(restaurantImageUrlInputElement)) {
            restaurantImageUrlInputElement.style.borderColor = warnColor;
            const restaurantImageUrlErrorMessage = document.querySelector('#restaurnatImageUrl') as HTMLSpanElement;
            restaurantImageUrlErrorMessage.textContent = 'Field is required.';
            restaurantImageUrlErrorMessage.style.color = warnColor;
            checkValidity()

        }
    })
    latitudeInputElement.addEventListener('blur', () => {
        if (!isLatitudeValid(latitudeInputElement)) {
            latitudeInputElement.style.borderColor = warnColor;
            const latitudeUrlErrorMessage = document.querySelector('#latitude-errorMessage') as HTMLSpanElement;
            latitudeUrlErrorMessage.textContent = 'Field is required.';
            latitudeUrlErrorMessage.style.color = warnColor;
            checkValidity()
        }
    })
    longitudeInputElement.addEventListener('blur', () => {
        if (!isLatitudeValid(longitudeInputElement)) {
            longitudeInputElement.style.borderColor = warnColor;
            const longitudeUrlErrorMessage = document.querySelector('#longitude-errorMessage') as HTMLSpanElement;
            longitudeUrlErrorMessage.textContent = 'Field is required.';
            longitudeUrlErrorMessage.style.color = warnColor;
            checkValidity()
        }
    })


}






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
    const id = urlParams.get('id')

    restaurantServices.getById(id)
        .then((restaurant: Restaurant) => {
            if (!restaurant.meals || restaurant.meals.length === 0) {
                //    const mealsTableContainer = document.querySelector('#meals-table-container') as HTMLDivElement;
                //    mealsTableContainer.textContent= "NO DATA TO DISPLAY";
                createNoDataMessage()
            } else {
                renderMeals(restaurant.meals, restaurant)
            }
        })
}

function createNoDataMessage(): void {
    const table = document.querySelector('table tbody');
    const tableRow = document.createElement('tr')
    const tableCell = document.createElement('td')
    tableCell.colSpan = 5;
    tableCell.textContent = 'Restaurant doesen\'t have any meals yet';
    tableCell.style.textAlign = 'center';
    tableRow.appendChild(tableCell);
    table.appendChild(tableRow);
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
        deleteBtn.innerHTML = "<i class=\"fa-solid fa-trash-can\">";
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
