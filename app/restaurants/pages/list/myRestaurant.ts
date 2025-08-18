import { RestaurantService } from "../../services/restaurant.service.js";
import { Restaurant } from "../../models/restaurant.model.js";
import { checkLoginStatus, handleLogout } from "../../../users/service/auth.js";

checkLoginStatus();

const logoutLink = document.getElementById("logout");
if (logoutLink) {
  logoutLink.addEventListener("click", handleLogout);
}

const restaurantService = new RestaurantService();
const container = document.getElementById(
  "restaurantsContainer"
) as HTMLDivElement;
const ownerId = parseInt(localStorage.getItem("userId")!);

restaurantService
  .getByOwner(ownerId)
  .then((restaurants: Restaurant[]) => {
    console.log("Dohvaceni restorani:", restaurants);
    restaurants.forEach((restaurant) => {
      console.log("📦 RESTORAN:", restaurant);
      const card = document.createElement("div");
      card.className = "restaurant-card";

      card.innerHTML = `
        <img src="${
          restaurant.imageUrl || "https://via.placeholder.com/300"
        }" alt="Slika restorana" />
        <div class="card-header">${restaurant.name}</div>
        <p>${restaurant.description}</p>
        <div class="card-status ${
          restaurant.status === "objavljen"
            ? "status-objavljen"
            : "status-priprema"
        }">
          ${
            restaurant.status?.toLowerCase() === "objavljen"
              ? "Objavljen"
              : "U pripremi"
          }
        </div>
        <div class="card-buttons">
          <button class="edit-btn">Izmeni</button>
          <button class="delete-btn">Obriši</button>
        </div>
      `;

      const editBtn = card.querySelector(".edit-btn")!;
      editBtn.addEventListener("click", () => {
        window.location.href = `../../../restaurants/pages/form/restaurantForm.html?id=${restaurant.id}`;
      });

      const deleteBtn = card.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", () => {
        if (
          confirm(
            `Da li ste sigurni da zelite da obrisete restoran ${restaurant.name}?`
          )
        ) {
          restaurantService
            .delete(restaurant.id)
            .then(() => {
              alert("Restoran uspesno obrisan.");
              card.remove(); // uklanja red iz tabele bez reload
            })
            .catch((error) => {
              alert("Greska prilikom brisanja restorana: " + error.message);
            });
        }
      });
      container.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("Greska prilikom dobavljanja restorana:", error);
  });
