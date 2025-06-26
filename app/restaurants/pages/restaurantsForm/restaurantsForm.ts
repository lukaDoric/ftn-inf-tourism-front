import { RestaurantFormData } from "../../models/restaurantForm.data.model.js";
import { RestaurantsServices } from "../../services/restaurant.services.js";

const restaurantServices = new RestaurantsServices();

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

    } else {
        const restaurantFormTitle = document.querySelector('#form-title');
        restaurantFormTitle.textContent = "Add restaurant form ";
    }

    const button = document.querySelector('#submitBtn')
    button.addEventListener('click', submit)
}

function submit(): void {

    const name = (document.querySelector('#name') as HTMLInputElement).value;
    const description = (document.querySelector('#description') as HTMLInputElement).value;
    const capacity = (document.querySelector('#capacity') as HTMLInputElement).value;
    const imageUrl = (document.querySelector('#imageUrl') as HTMLInputElement).value;
    const latitude = parseFloat((document.querySelector('#latitude') as HTMLInputElement).value);
    const longitude = parseFloat((document.querySelector('#longitude') as HTMLInputElement).value);
    const ownerId = parseInt(localStorage.getItem('id'));

    if(!name || !description || !capacity  || !imageUrl || !latitude || !longitude || !ownerId){
        alert("All feilds are required!")
        return
    }

    const reqBody: RestaurantFormData = { name, description, capacity, imageUrl, latitude, longitude, ownerId }

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (id) {
        restaurantServices.update(id, reqBody)
            .then(() => {
                window.location.href = "../restaurants/restaurants.html";
            })
            .catch(error => {
                console.log(`Error: `, error.status);
            })

    } else {
        restaurantServices.create(reqBody)
            .then(() => {
                window.location.href = "../restaurants/restaurants.html";
            })
            .catch(error => {
                console.log(`Error: `, error.status);
            })
    }

}

const logout = document.querySelector('#logout');
function handleLogout(){
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('id');    
}

logout.addEventListener('click', function(){
    handleLogout()
    window.location.href ="../../../users/pages/login/login.html";
})

document.addEventListener('DOMContentLoaded', initializationForm)