import { Keypoint } from "./keyPoint.model";

export interface Tour {
    id?: number;
    name: string;
    description: string;
    dateTime: Date;
    maxGuests: number;
    status?: string;
    guideId: string;
    keyPoints: Keypoint[];
}