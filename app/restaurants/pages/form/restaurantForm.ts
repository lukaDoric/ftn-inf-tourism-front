import { Restaurant } from "../../models/restaurant.model";
import { RestaurantService } from "../../services/restaurant.service.js";
import { checkLoginStatus, handleLogout } from "../../../users/service/auth.js";

checkLoginStatus();

const logoutElement = document.querySelector("#logout");
if (logoutElement) {
  logoutElement.addEventListener("click", handleLogout);
}

const username = localStorage.getItem("username");
if (!username) {
  alert("Morate biti ulogovani da biste dodali restoran.");
  window.location.href = "../../../index.html";
}

const restaurantService = new RestaurantService();
const form = document.getElementById("restaurantForm") as HTMLFormElement;

function getRestaurantIdFromUrl(): number | null {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  return id ? parseInt(id) : null;
}

function populateFormFields(restaurant: Restaurant): void {
  (document.getElementById("name") as HTMLInputElement).value = restaurant.name;
  (document.getElementById("description") as HTMLTextAreaElement).value =
    restaurant.description;
  (document.getElementById("capacity") as HTMLInputElement).value =
    restaurant.capacity.toString();
  (document.getElementById("images") as HTMLInputElement).value =
    restaurant.imageUrl;
  (document.getElementById("latitude") as HTMLInputElement).value =
    restaurant.latitude.toString();
  (document.getElementById("longitude") as HTMLInputElement).value =
    restaurant.longitude.toString();

  (document.querySelector("h1") as HTMLElement).textContent = "Izmeni restoran";
  (
    document.querySelector("button[type='submit']") as HTMLButtonElement
  ).textContent = "Sacuvaj izmene";
}

function buildRestaurantFromForm(id: number | null): Restaurant {
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const description = (
    document.getElementById("description") as HTMLTextAreaElement
  ).value;
  const capacity = parseInt(
    (document.getElementById("capacity") as HTMLInputElement).value
  );
  const imageUrl = (document.getElementById("images") as HTMLInputElement)
    .value;
  const latitude = parseFloat(
    (document.getElementById("latitude") as HTMLInputElement).value
  );
  const longitude = parseFloat(
    (document.getElementById("longitude") as HTMLInputElement).value
  );
  const ownerId = parseInt(localStorage.getItem("userId")!);

  return {
    id: id ?? 0,
    name,
    description,
    capacity,
    imageUrl,
    latitude,
    longitude,
    ownerId,
    status: "u pripremi",
  };
}

function loadRestaurantForEdit(id: number): void {
  restaurantService
    .getById(id)
    .then((restaurant: Restaurant) => populateFormFields(restaurant))
    .catch((error) => {
      console.error("Greska prilikom dobavljanja restorana:", error);
      alert("Neuspesno dobavljanje podataka restorana.");
    });
}

function handleFormSubmit(e: Event): void {
  e.preventDefault();
  const id = getRestaurantIdFromUrl();
  const restaurant = buildRestaurantFromForm(id);

  if (id) {
    restaurantService
      .updateRestaurant(restaurant)
      .then(() => {
        alert("Restoran uspesno izmenjen!");
        window.location.href = "../list/myRestaurant.html";
      })
      .catch((error) => {
        alert("Greska prilikom izmene restorana: " + error.message);
      });
  } else {
    restaurantService
      .createRestaurant(restaurant)
      .then(() => {
        alert("Restoran uspesno dodat!");
        window.location.href = "../list/myRestaurant.html";
      })
      .catch((error) => {
        alert("Greska prilikom dodavanja restorana: " + error.message);
      });
  }
}

function init(): void {
  const id = getRestaurantIdFromUrl();
  if (id) {
    loadRestaurantForEdit(id);
  }
  form.addEventListener("submit", handleFormSubmit);
}

init();

//////////////////////////
// if (restaurantId) {
//   restaurantService
//     .getById(parseInt(restaurantId))
//     .then((restaurant: Restaurant) => {
//       (document.getElementById("name") as HTMLInputElement).value =
//         restaurant.name;
//       (document.getElementById("description") as HTMLTextAreaElement).value =
//         restaurant.description;
//       (document.getElementById("capacity") as HTMLInputElement).value =
//         restaurant.capacity.toString();
//       (document.querySelector("h1") as HTMLElement).textContent =
//         "Izmeni restoran";
//       (
//         document.querySelector("button[type='submit']") as HTMLButtonElement
//       ).textContent = "Sačuvaj izmene";
//     })
//     .catch((error) => {
//       console.error("Greška prilikom dobavljanja restorana:", error);
//       alert("Neuspešno dobavljanje podataka restorana.");
//     });
// }

// form.addEventListener("submit", function (e) {
//   e.preventDefault();

//   const name = (document.getElementById("name") as HTMLInputElement).value;
//   const description = (
//     document.getElementById("description") as HTMLTextAreaElement
//   ).value;
//   const capacity = parseInt(
//     (document.getElementById("capacity") as HTMLInputElement).value
//   );
//   const imageUrl = (document.getElementById("images") as HTMLInputElement)
//     .value;
//   const latitude = parseFloat(
//     (document.getElementById("latitude") as HTMLInputElement).value
//   );
//   const longitude = parseFloat(
//     (document.getElementById("longitude") as HTMLInputElement).value
//   );
//   const ownerId = parseInt(localStorage.getItem("userId")!);

//   const newRestaurant: Restaurant = {
//     id: restaurantId ? parseInt(restaurantId) : 0,
//     name,
//     description,
//     capacity,
//     imageUrl,
//     latitude,
//     longitude,
//     ownerId,
//     status: "u pripremi",
//   };

//   if (restaurantId) {
//     restaurantService
//       .updateRestaurant(newRestaurant)
//       .then(() => {
//         alert("Resotoran uspesno izmenjen!");
//         window.location.href = "../list/myRestaurant.html";
//       })
//       .catch((error) => {
//         alert("Greska prilikom izmene restorana:" + error.message);
//       });
//   } else {
//     restaurantService
//       .createRestaurant(newRestaurant)
//       .then(() => {
//         alert("Restoran uspesno dodat!");
//         form.reset();
//       })
//       .catch((error) => {
//         alert("Greska prilikom dodavanja restorana: " + error.message);
//       });
//   }
// });
