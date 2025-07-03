import { Restaurant } from "../models/restaurant.model";
import { RestaurantService } from "../services/restaurant.service";

const restaurantService = new RestaurantService();
const form = document.getElementById("restaurantForm") as HTMLFormElement;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = (document.getElementById("name") as HTMLInputElement).value;
  const description = (
    document.getElementById("description") as HTMLTextAreaElement
  ).value;
  const capacity = parseInt(
    (document.getElementById("capacity") as HTMLInputElement).value
  );
  const imagesInput = (document.getElementById("images") as HTMLInputElement)
    .value;
  const images = imagesInput.split(",").map((s) => s.trim());
  const latitude = parseFloat(
    (document.getElementById("latitude") as HTMLInputElement).value
  );
  const longitude = parseFloat(
    (document.getElementById("longitude") as HTMLInputElement).value
  );
  const ownerId = parseInt(localStorage.getItem("userId")!);

  const newRestaurant: Restaurant = {
    id: 0,
    name,
    description,
    capacity,
    images,
    latitude,
    longitude,
    ownerId,
    status: "u pripremi",
  };

  restaurantService
    .createRestaurant(newRestaurant)
    .then(() => {
      alert("Restoran uspesno dodat!");
      form.reset();
    })
    .catch((error) => {
      alert("Greska prilikom dodavanja restorana: " + error.message);
    });
});
