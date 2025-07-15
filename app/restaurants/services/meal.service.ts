import { Meal } from "../models/meal.model";
import { MealFormData } from "../models/mealFormData.model";


export class MealService {
    private apiUrl: string;
    private apiEndPoint: string;
    constructor() {
        this.apiUrl = 'http://localhost:5105/api/restaurants';
        this.apiEndPoint = 'meals';
    }

    create(restaurantId: string, reqBody: MealFormData): Promise<Meal> {
        return fetch(`${this.apiUrl}/${restaurantId}/${this.apiEndPoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reqBody)
        })
            .then(response => {
                if (!response.ok) {
                    throw { status: response.status, message: response.text }
                }
                return response.json();
            })
            .then((meal: Meal) => {
                return meal
            })
            .catch(error => {
                console.log(`Error:`, error.status)
                throw error;
            })
    }

    delete(restaurantId: string, mealId: string): Promise<void> {
        return fetch(`${this.apiUrl}/${restaurantId}/${this.apiEndPoint}/${mealId}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                    throw { status: response.status, message: response.text }
                }
            })
            .catch(error => {
                console.log(`Error:`, error.status)
                throw error;
            })
    }
}