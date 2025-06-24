import { Restaurant } from "./restaurant.model";

export interface ResturantsResult{
    data: Restaurant[],
    totalCount: number
}