import { RestaurantService } from "../../services/restaurant.service.js";
import { Restaurant } from "../../models/restaurant.model.js";
import { checkLoginStatus, handleLogout } from "../../../users/service/auth.js";

checkLoginStatus();

const logoutLink = document.getElementById("logout");
if (logoutLink) {
  logoutLink.addEventListener("click", handleLogout);
}

const restaurantService = new RestaurantService();
const tbody = document.getElementById(
  "restaurantsBody"
) as HTMLTableSectionElement;
const ownerId = parseInt(localStorage.getItem("userId")!);
console.log("OwnerId iz localStorage:", ownerId);

restaurantService
  .getByOwner(ownerId)
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

      editBtn.addEventListener("click", () => {
        window.location.href =
          "../../../restaurants/pages/form/restaurantForm.html?id=" +
          restaurant.id;
      });

      tdActions.appendChild(editBtn);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Obrisi";
      deleteBtn.addEventListener("click", () => {
        if (
          confirm(
            `Da li ste sigurni da zelite da obrisete restoran ${restaurant.name}?`
          )
        ) {
          restaurantService
            .deleteRestaurant(restaurant.id)
            .then(() => {
              alert("Restoran uspesno obrisan.");
              tr.remove(); // uklanja red iz tabele bez reload
            })
            .catch((error) => {
              alert("Greska prilikom brisanja restorana: " + error.message);
            });
        }
      });
      tdActions.appendChild(deleteBtn);

      tr.appendChild(tdActions);
      tbody.appendChild(tr);
    });
  })
  .catch((error) => {
    console.error("Greska prilikom dobavljanja restorana:", error);
  });
