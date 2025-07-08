import { checkLoginStatus, handleLogout } from "./users/service/auth.js";

checkLoginStatus();

const logoutElement = document.getElementById("logout");
if (logoutElement) {
  logoutElement.addEventListener("click", handleLogout);
}

const addRestaurantLink = document.querySelector(
  "#addRestaurant"
) as HTMLElement;

function handleAddRestaurantClick(event: Event) {
  const username = localStorage.getItem("username");
  if (!username) {
    event.preventDefault();
    alert("Morate biti ulogovani da biste dodali novi restoran.");
  }
}

if (addRestaurantLink) {
  addRestaurantLink.addEventListener("click", handleAddRestaurantClick);
}
