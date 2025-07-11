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

const saveRestaurantBtn = document.querySelector('#saveBtnRestaurant') as HTMLButtonElement;
const saveMealBtn = document.querySelector('#saveBtnMeal') as HTMLButtonElement;

const nextRestaurantBtn = document.querySelector('#nextBtnRestaurant') as HTMLButtonElement;
const nextMealBtn = document.querySelector('#nextBtnMeal') as HTMLButtonElement;

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
                (document.querySelector('#restaurantImageUrl') as HTMLInputElement).value = restaurant.imageUrl;
                (document.querySelector('#latitude') as HTMLInputElement).value = restaurant.latitude.toString();
                (document.querySelector('#longitude') as HTMLInputElement).value = restaurant.longitude.toString();

                initializationUpdateRestaurantForm()
            })


    } else {

        initializationAddRestaurantForm()
    }
}

function initializationAddRestaurantForm(): void {
    restaurantValidation()
    tabs[0].style.display = "flex";
    probgresBar.style.width = "0%";
    step[0].classList.add('active');
    restaurantFormHeadings.textContent = "Enter new restaurant data";
    nextRestaurantBtn.addEventListener('click', function () {
        submitRestaurant();
        tabs[0].style.display = 'none';
        mealFormHandler()
    })
    saveRestaurantBtn.addEventListener('click', function () {
        submitRestaurant();
        window.location.href = '../restaurants/restaurants.html';
    })
}

function initializationUpdateRestaurantForm(): void {
    restaurantValidation()
    tabs[0].style.display = "flex";
    probgresBar.style.width = "0%";
    step[0].classList.add('active');
    restaurantFormHeadings.textContent = "Update restaurant data"
    nextRestaurantBtn.onclick = function () {
        submitRestaurant();
        tabs[0].style.display = 'none';
        mealFormHandler()
    }
    saveRestaurantBtn.addEventListener('click', function () {
        submitRestaurant();
        window.location.href = '../restaurants/restaurants.html';
    })
}


function initializationMealForm(): void {

    mealValidation()
    tabs[1].style.display = "flex";
    probgresBar.style.width = "50%";
    step[0].classList.add('active');
    step[1].classList.add('active');
    restaurantFormHeadings.textContent = "Enter new meal data";
    nextMealBtn.onclick = function () {
        tabs[1].style.display = 'none';
        publishingFromHandler()
    }
    saveMealBtn.onclick = function () {
        mealValidation()
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
    const restaurantImageUrl = (document.querySelector('#restaurantImageUrl') as HTMLInputElement).value;
    const latitude = parseFloat((document.querySelector('#latitude') as HTMLInputElement).value);
    const longitude = parseFloat((document.querySelector('#longitude') as HTMLInputElement).value);
    const ownerId = parseInt(localStorage.getItem('id'));


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


function restaurantValidation(): void {

    const nameInputElement = (document.querySelector('#name') as HTMLInputElement)
    const descriptionInputElement = (document.querySelector('#description') as HTMLInputElement)
    const capacityInputElement = (document.querySelector('#capacity') as HTMLInputElement)
    const restaurantImageUrlInputElement = (document.querySelector('#restaurantImageUrl') as HTMLInputElement)
    const latitudeInputElement = (document.querySelector('#latitude') as HTMLInputElement)
    const longitudeInputElement = (document.querySelector('#longitude') as HTMLInputElement)

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

    const inputFields: HTMLInputElement[] = [nameInputElement, descriptionInputElement, capacityInputElement, latitudeInputElement, longitudeInputElement, restaurantImageUrlInputElement]
    inputFields.forEach(input => {
        input.addEventListener('input', checkValidity)
    })

    function checkValidity() {
        if (isNameValid(nameInputElement) && isDescriptionValid(descriptionInputElement) && isCapacityValid(capacityInputElement)
            && isRestaurantImageUrlValid(restaurantImageUrlInputElement) && isLatitudeValid(latitudeInputElement) && isLongitudeValid(longitudeInputElement)) {
            saveRestaurantBtn.disabled = false;
            nextRestaurantBtn.disabled = false;
        } else {
            saveRestaurantBtn.disabled = true;
            nextRestaurantBtn.disabled = true;
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
        } else {
            const nameErrorMessage = document.querySelector('#name-errorMessage') as HTMLSpanElement;
            nameErrorMessage.textContent = '';
            nameInputElement.classList.remove('error')
            checkValidity()
        }
    })
    descriptionInputElement.addEventListener('blur', () => {
        if (!isDescriptionValid(descriptionInputElement)) {
            const descriptionErrorMessage = document.querySelector('#description-errorMessage') as HTMLSpanElement;
            descriptionErrorMessage.textContent = 'Field is required.';
            descriptionErrorMessage.style.color = warnColor;
            descriptionInputElement.classList.add('error')
            checkValidity()
        } else {
            const descriptionErrorMessage = document.querySelector('#description-errorMessage') as HTMLSpanElement;
            descriptionErrorMessage.textContent = '';
            descriptionInputElement.classList.remove('error')
            checkValidity()
        }
    })
    capacityInputElement.addEventListener('blur', () => {
        if (!isCapacityValid(capacityInputElement)) {
            const capacityErrorMessage = document.querySelector('#capacity-errorMessage') as HTMLSpanElement;
            capacityErrorMessage.textContent = 'Field is required.';
            capacityErrorMessage.style.color = warnColor;
            capacityInputElement.classList.add('error')
            checkValidity()

        } else {
            const capacityErrorMessage = document.querySelector('#capacity-errorMessage') as HTMLSpanElement;
            capacityErrorMessage.textContent = '';
            capacityInputElement.classList.remove('error')
            checkValidity()
        }
    })
    restaurantImageUrlInputElement.addEventListener('blur', () => {
        if (!isRestaurantImageUrlValid(restaurantImageUrlInputElement)) {
            const restaurantImageUrlErrorMessage = document.querySelector('#restaurantImageUrl-errorMessage') as HTMLSpanElement;
            restaurantImageUrlErrorMessage.textContent = 'Field is required.';
            restaurantImageUrlErrorMessage.style.color = warnColor;
            restaurantImageUrlInputElement.classList.add('error')
            checkValidity()

        } else {
            const restaurantImageUrlErrorMessage = document.querySelector('#restaurantImageUrl-errorMessage') as HTMLSpanElement;
            restaurantImageUrlErrorMessage.textContent = '';
            restaurantImageUrlInputElement.classList.remove('error')
            checkValidity()
        }
    })
    latitudeInputElement.addEventListener('blur', () => {
        if (!isLatitudeValid(latitudeInputElement)) {
            const latitudeUrlErrorMessage = document.querySelector('#latitude-errorMessage') as HTMLSpanElement;
            latitudeUrlErrorMessage.textContent = 'Field is required.';
            latitudeUrlErrorMessage.style.color = warnColor;
            latitudeInputElement.classList.add('error')
            checkValidity()

        } else {
            const latitudeImageUrlErrorMessage = document.querySelector('#latitude-errorMessage') as HTMLSpanElement;
            latitudeImageUrlErrorMessage.textContent = '';
            latitudeInputElement.classList.remove('error')
            checkValidity()
        }
    })
    longitudeInputElement.addEventListener('blur', () => {
        if (!isLongitudeValid(longitudeInputElement)) {
            const longitudeUrlErrorMessage = document.querySelector('#longitude-errorMessage') as HTMLSpanElement;
            longitudeUrlErrorMessage.textContent = 'Field is required.';
            longitudeUrlErrorMessage.style.color = warnColor;
            longitudeInputElement.classList.add('error')
            checkValidity()

        } else {
            const longitudeImageUrlErrorMessage = document.querySelector('#longitude-errorMessage') as HTMLSpanElement;
            longitudeImageUrlErrorMessage.textContent = '';
            longitudeInputElement.classList.remove('error')
            checkValidity()
        }
    })
    checkValidity()
}

function createMealFormData(): MealFormData {
    const name = (document.querySelector('#meal-name') as HTMLInputElement).value;
    const price = parseFloat((document.querySelector('#price') as HTMLInputElement).value);
    const ingredients = (document.querySelector('#ingredients') as HTMLInputElement).value;
    const imageUrl = (document.querySelector('#meal-imageUrl') as HTMLInputElement).value ?? '';

    const reqBody: MealFormData = { name, price, ingredients, imageUrl }
    return reqBody
}

function submitMeal(): void {

    const reqBody: MealFormData = createMealFormData()

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    mealService.create(id, reqBody)
        .then(() => {
            mealFormHandler()
            mealValidation()
        })
        .catch(error => {
            console.log(`Error:`, error.status)
        })
}

function mealFormHandler(): void {
    initializationMealForm()

    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')

    restaurantServices.getById(id)
        .then((restaurant: Restaurant) => {
            if (!restaurant.meals || restaurant.meals.length === 0) {
                createNoDataMessage()
                mealValidation()
            } else {
                renderMeals(restaurant.meals, restaurant)
            }
        })
        .catch(error => {
            console.log(`Error: `, error.status)
        });
}
function counterMeals(): number {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    let mealCount = 0;
    restaurantServices.getById(id)
        .then((restaurantData: Restaurant) => {
            mealCount = restaurantData.meals.length
        })
    console.log(mealCount)
    return mealCount

}
console.log(counterMeals())

function mealValidation(): void {
    const mealNameInputElement = (document.querySelector('#meal-name') as HTMLInputElement);
    const priceInputElement = (document.querySelector('#price') as HTMLInputElement);
    const ingredientsInputElement = (document.querySelector('#ingredients') as HTMLInputElement);


    function isMealNameValid(mealNameInputElement: HTMLInputElement): boolean {
        return mealNameInputElement.value.trim().length >= 2;
    }
    function isPriceValid(priceInputElement: HTMLInputElement): boolean {
        return priceInputElement.value.trim().length > 0;
    }

    function isingredientsValid(ingredientsInputElement: HTMLInputElement): boolean {
        return ingredientsInputElement.value.trim().length > 0;
    }

    function checkValidity() {
        const isValid = isMealNameValid(mealNameInputElement) &&
            isPriceValid(priceInputElement) &&
            isingredientsValid(ingredientsInputElement);

        if (isValid) {
            saveMealBtn.disabled = false;
            const mealCount = counterMeals();
            nextMealBtn.disabled = !(mealCount >= 5);

        } else {
            saveMealBtn.disabled = true;
            nextMealBtn.disabled = true;
        }
    }
    console.log(nextMealBtn.disabled)


    const warnColor = '#d9534f';
    mealNameInputElement.addEventListener('blur', () => {
        if (!isMealNameValid(mealNameInputElement)) {
            const mealNameErrorMessage = document.querySelector('#meal-name-errorMessage') as HTMLSpanElement;
            mealNameErrorMessage.textContent = 'Name must be atleast 2 caracter log.';
            mealNameErrorMessage.style.color = warnColor;
            mealNameInputElement.classList.add('error')
            checkValidity()
        } else {
            const mealNameErrorMessage = document.querySelector('#meal-name-errorMessage') as HTMLSpanElement;
            mealNameErrorMessage.textContent = '';
            mealNameInputElement.classList.remove('error')
            checkValidity()
        }
    })
    priceInputElement.addEventListener('blur', () => {
        if (!isPriceValid(priceInputElement)) {
            const priceErrorMessage = document.querySelector('#price-errorMessage') as HTMLSpanElement;
            priceErrorMessage.textContent = 'Field is required.';
            priceErrorMessage.style.color = warnColor;
            priceInputElement.classList.add('error')
            checkValidity()
        } else {
            const priceErrorMessage = document.querySelector('#price-errorMessage') as HTMLSpanElement;
            priceErrorMessage.textContent = '';
            priceInputElement.classList.remove('error')
            checkValidity()
        }
    })
    ingredientsInputElement.addEventListener('blur', () => {
        if (!isingredientsValid(ingredientsInputElement)) {
            const ingredientsErrorMessage = document.querySelector('#ingredients-errorMessage') as HTMLTextAreaElement;
            ingredientsErrorMessage.textContent = 'Field is required.';
            ingredientsErrorMessage.style.color = warnColor;
            ingredientsInputElement.classList.add('error')
            checkValidity()
        } else {
            const ingredientsErrorMessage = document.querySelector('#ingredients-errorMessage') as HTMLTextAreaElement;
            ingredientsErrorMessage.textContent = '';
            ingredientsInputElement.classList.remove('error')
            checkValidity()
        }
    })
}

function createNoDataMessage(): void {
    const table = document.querySelector('table tbody');
    table.innerHTML = "";
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
