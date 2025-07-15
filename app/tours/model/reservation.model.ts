import { Tour } from "./tour.model";
export interface Reservation {
    id: number;
    touristId: number;
    tourId: number;
    tour?: Tour;
}