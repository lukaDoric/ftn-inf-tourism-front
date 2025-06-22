import { Tour } from "./tour.model.js";

export interface TourResponse{
   
    data: Tour[],
    totalCount: number
}
