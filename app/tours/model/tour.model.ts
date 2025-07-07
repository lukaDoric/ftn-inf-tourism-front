export interface Tour{
    id?: number
    name: string
    description: string
    dateTime: Date
    maxGuests: number
    status?: string
    guideId?: number
}

export interface TourResults {
  data: Tour[];
  totalCount: number;
}