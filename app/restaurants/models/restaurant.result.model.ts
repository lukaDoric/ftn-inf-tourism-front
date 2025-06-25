import { Restaurant } from "./restaurant.model";

export interface RestaurantsResult{
    data: Restaurant[],
    totalCount: number
}