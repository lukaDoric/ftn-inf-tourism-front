import { Restaurant } from "../models/restaurant.model";

const API_URL = "http://localhost:48696/api/restaurants";

export class RestaurantService {
  createRestaurant(restaurant: Restaurant): Promise<Restaurant> {
    return fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restaurant),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Greska prilikom kreiranja restorana.");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Greska u createRestaurant:", error);
        throw error;
      });
  }
  getMyRestaurants(ownerId: number): Promise<Restaurant[]> {
    return fetch(`${API_URL}?ownerId=${ownerId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Greska prilikom dobavljanja restorana.");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Greska u getMyRestaurants:", error);
        throw error;
      });
  }
  updateRestaurant(restaurant: Restaurant): Promise<Restaurant> {
    return fetch(`${API_URL}/${restaurant.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restaurant),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Greska prilikom izmene restorana.");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Greska u updateRestaurant:", error);
        throw error;
      });
  }
  deleteRestaurant(id: number): Promise<void> {
    return fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Greska prilikom brisanja restorana.");
        }
      })
      .catch((error) => {
        console.error("Greska u deleteRestaurant:", error);
        throw error;
      });
  }
}
