
import { RestaurantsServices } from "../../services/restaurant.services.js"

const restaurantsServices = new RestaurantsServices();

const logout = document.querySelector('#logout') as HTMLElement;
function handleLogout() {
    localStorage.removeItem("username");
    localStorage.removeItem('role');
    localStorage.removeItem('id');
}

logout.addEventListener('click', function () {
    handleLogout();
    window.location.href = "../../../users/pages/login/login.html";
})

function renderData(): void {
    const id = localStorage.getItem("id");
    restaurantsServices.getAll(id)
        .then(restaurants => {
            for (let i = 0; i < restaurants.length; i++) {
                const resturantContainer = document.querySelector('.restaurant-container');

                const restaurantCard = document.createElement('div');
                restaurantCard.classList.add('restaurant-card');

                const pictureDiv = document.createElement('div');
                pictureDiv.id = 'card-pictureSection';

                const imgElement = document.createElement('img');
                imgElement.src = `${restaurants[i]["imageUrl"]}`;
                imgElement.alt = 'slika restorana';
                pictureDiv.appendChild(imgElement);
                restaurantCard.appendChild(pictureDiv);

                const mainSectionDiv = document.createElement('div');
                mainSectionDiv.id = 'card-mainSection';

                const p1 = document.createElement('p');
                p1.id = 'restaurantName';
                const strong1 = document.createElement('strong');
                strong1.textContent = 'Name: ';
                p1.appendChild(strong1);
                p1.innerHTML += restaurants[i]['name'];
                mainSectionDiv.appendChild(p1);

                const p2 = document.createElement('p');
                const strong2 = document.createElement('strong');
                strong2.textContent = 'Description: ';
                p2.appendChild(strong2);
                p2.innerHTML += restaurants[i]['description'];
                mainSectionDiv.appendChild(p2);


                const p3 = document.createElement('p');
                const strong3 = document.createElement('strong');
                strong3.textContent = 'Capacity: ';
                p3.appendChild(strong3);
                p3.innerHTML += restaurants[i]['capacity'];
                mainSectionDiv.appendChild(p3);

                const p4 = document.createElement('p');
                const strong4 = document.createElement('strong');
                strong4.textContent = 'Latitude: ';
                p4.appendChild(strong4);
                p4.innerHTML += restaurants[i]['latitude'];
                mainSectionDiv.appendChild(p4);

                const p5 = document.createElement('p');
                const strong5 = document.createElement('strong');
                strong5.textContent = 'Longitude: ';
                p5.appendChild(strong5);
                p5.innerHTML += restaurants[i]['longitude'];
                mainSectionDiv.appendChild(p5);

                const p6 = document.createElement('p');
                const strong6 = document.createElement('strong');
                strong6.textContent = 'Status: ';
                p6.appendChild(strong6);
                p6.innerHTML += restaurants[i]['status'];
                mainSectionDiv.appendChild(p6);

                const buttonDiv = document.createElement('div');
                buttonDiv.id = 'button-container';

                const editBtn = document.createElement('button');
                editBtn.textContent = "Edit";
                editBtn.classList.add("button");
                editBtn.id = ("editBtn");

                editBtn.onclick = function () {
                    window.location.href = `../restaurantsForm/restaurantsForm.html?id=${restaurants[i]["id"]}`;
                }
                buttonDiv.appendChild(editBtn);

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = "Delete";
                deleteBtn.classList.add("button");
                deleteBtn.id = ("deleteBtn");
                deleteBtn.onclick = function () {
                    restaurantsServices.delete(restaurants[i]['id'].toString())
                        .then(() => {
                            window.location.reload()
                        })
                        .catch(error => {
                            console.log(`Error: `, error.status);
                        })
                }

                buttonDiv.appendChild(deleteBtn);

                mainSectionDiv.appendChild(buttonDiv);
                restaurantCard.appendChild(mainSectionDiv);
                resturantContainer.appendChild(restaurantCard);
            }
        })
}

document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.querySelector('#addBtn')
    addBtn.addEventListener('click', function () {
        window.location.href = "../restaurantsForm/restaurantsForm.html"
    });    
    renderData();
    const restaurantMainPageTitle = document.querySelector('#restaurantMainPage-title');
    restaurantMainPageTitle.textContent = `Restaurants preview for the admin: ${localStorage.getItem('username')}`
})