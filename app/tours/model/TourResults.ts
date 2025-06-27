import { Tour } from "./tour.model";

export interface TourResults {
    data: Tour[];
    totalCount: number;
}