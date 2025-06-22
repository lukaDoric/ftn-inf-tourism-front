export interface Meal {
  id?: number;
  order: number;
  name: string;
  price: number;
  Ingredients: string;
  imgURL?: string;
  restaurantId: number;
}
