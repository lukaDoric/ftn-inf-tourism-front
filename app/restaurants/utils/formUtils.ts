import { Restaurant } from "../models/restaurant.model";

export function getRestaurantIdFromUrl(): number | null {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  return id ? parseInt(id) : null;
}
export function populateFormFields(restaurant: Restaurant): void {
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
export function buildRestaurantFromForm(id: number | null): Restaurant {
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
  const ownerIdRaw = localStorage.getItem("userId");
  const ownerId = ownerIdRaw ? parseInt(ownerIdRaw) : 0;

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
