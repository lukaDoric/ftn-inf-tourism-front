import { Restaurant } from "../model/restaurant.model";

export class RestaurantService {
  private apiURL: string;

  constructor() {
    this.apiURL = "http://localhost:48696/api/restaurants";
  }

  getAll(): Promise<Restaurant[]> {
    return fetch(this.apiURL)
      .then((response) => {
        if (!response.ok) {
          throw { status: response.status, message: response.text };
        }
        return response.json();
      })
      .then((restaurants: Restaurant[]) => {
        return restaurants;
      })
      .catch((error) => {
        console.error(`Error:`, error.status);
        throw error;
      });
  }

  getById(id: string): Promise<Restaurant> {
    return fetch(`${this.apiURL}/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw { status: response.status, message: response.text };
        }
        return response.json();
      })
      .then((restaurants: Restaurant) => {
        return restaurants;
      })
      .catch((error) => {
        console.error(`Error:`, error.status);
        throw error;
      });
  }
}
