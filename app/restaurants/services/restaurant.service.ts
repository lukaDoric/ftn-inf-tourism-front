import { Restaurant } from "../models/restaurant.model";

const API_URL = "http://localhost:5105/api/restaurants";

export class RestaurantService {
  create(restaurant: Restaurant): Promise<Restaurant> {
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
  getByOwner(ownerId: number): Promise<Restaurant[]> {
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
  update(restaurant: Restaurant): Promise<Restaurant> {
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
      .then((data) => {
        console.log("Backend vratio:", data);
        return data;
      })
      .catch((error) => {
        console.error("Greska u updateRestaurant:", error);
        throw error;
      });
  }
  delete(id: number): Promise<void> {
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

  getById(id: number): Promise<Restaurant> {
    return fetch(`${API_URL}/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Greska prilikom dobavljanja restorana.");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Greska u getById:", error);
        throw error;
      });
  }
}
