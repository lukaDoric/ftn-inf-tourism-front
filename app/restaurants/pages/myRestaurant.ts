import { RestaurantService } from "../services/restaurant.service.js";
import { Restaurant } from "../models/restaurant.model";

const restaurantService = new RestaurantService();
const tbody = document.getElementById(
  "restaurantsBody"
) as HTMLTableSectionElement;
const ownerId = parseInt(localStorage.getItem("userId")!);
console.log("OwnerId iz localStorage:", ownerId);

restaurantService
  .getMyRestaurants(ownerId)
  .then((restaurants: Restaurant[]) => {
    console.log("Dohvaceni restorani:", restaurants);
    restaurants.forEach((restaurant) => {
      const tr = document.createElement("tr");

      const tdName = document.createElement("td");
      tdName.textContent = restaurant.name;
      tr.appendChild(tdName);

      const tdDescription = document.createElement("td");
      tdDescription.textContent = restaurant.description;
      tr.appendChild(tdDescription);

      const tdCapacity = document.createElement("td");
      tdCapacity.textContent = restaurant.capacity.toString();
      tr.appendChild(tdCapacity);

      const tdActions = document.createElement("td");

      const editBtn = document.createElement("button");
      editBtn.textContent = "Izmeni";
      tdActions.appendChild(editBtn);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Obrisi";
      tdActions.appendChild(deleteBtn);

      tr.appendChild(tdActions);
      tbody.appendChild(tr);
    });
  })
  .catch((error) => {
    console.error("Greska prilikom dobavljanja restorana:", error);
  });
