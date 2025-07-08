import { Tour } from "../model/tour.model";

// Pomoćna funkcija za obradu response objekta
function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        return response.text().then(text => {
            throw new Error(text || `Request failed. Status: ${response.status}`);
        });
    }
    return response.json();
}

export class TourService {
    private apiUrl: string;

    constructor() {
        this.apiUrl = "http://localhost:48696/api/tours";
        // this.apiUrl = "http://localhost:5105/api/tours";
    }

    // Kreiranje ture
    createTour(tour: Tour): Promise<Tour> {
        return fetch(this.apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tour)
        })
        .then(response => handleResponse<Tour>(response))
        .then(tour => {
            console.log("Successfully created tour:", tour);
            return tour;
        })
        .catch(error => {
            console.error("Error creating tour:", error.message);
            throw error;
        });
    }

    // Dobavljanje tura za vodiča
    // getAllByGuide(guideId: number): Promise<TourResults> {
    //     const url = `${this.apiUrl}?guideId=${guideId}`;
    //     return fetch(url)
    //         .then(response => handleResponse<TourResults>(response))
    //         .then(result => result)
    //         .catch(error => {
    //             console.error("Error fetching tours:", error.message);
    //             throw error;
    //         });
    // }

    getAllByGuide(guideId: number): Promise<Tour[]> {
    const url = `${this.apiUrl}?guideId=${guideId}`;
    return fetch(url)
        .then(response => handleResponse<Tour[]>(response))
        .catch(error => {
            console.error("Error fetching tours:", error.message);
            throw error;
        });
}

}