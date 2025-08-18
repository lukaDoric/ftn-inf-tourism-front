import { Meal } from "../models/meal.model";

export class MealService {
  private baseUrl = "http://localhost:5105/api";

  getByRestaurant(restaurantId: number): Promise<Meal[]> {
    return fetch(`${this.baseUrl}/restaurants/${restaurantId}/meals`).then(
      (response) => {
        if (!response.ok) throw new Error("Neuspesno dobavljanje jela");
        return response.json();
      }
    );
  }

  create(restaurantId: number, meal: Meal): Promise<Meal> {
    return fetch(`${this.baseUrl}/restaurants/${restaurantId}/meals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meal),
    }).then((response) => {
      if (!response.ok) {
        return response.text().then((msg) => {
          throw new Error(msg || "Greska prilikom dodavanja jela");
        });
      }
      return response.json(); // jer tvoj kontroler vraća `Meal` objekat
    });
  }

  delete(restaurantId: number, mealId: number): Promise<void> {
    return fetch(
      `${this.baseUrl}/restaurants/${restaurantId}/meals/${mealId}`,
      {
        method: "DELETE",
      }
    ).then((response) => {
      if (!response.ok && response.status !== 204) {
        return response.text().then((msg) => {
          throw new Error(msg || "Greska prilikom brisanja jela");
        });
      }
    });
  }
}
