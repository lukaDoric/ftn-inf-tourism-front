import { Tour, TourResults } from "../model/tour.model";

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
        // this.apiUrl = "http://localhost:48696/api/tours";
        this.apiUrl = "http://localhost:5105/api/tours";
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
    getAllByGuide(guideId: number): Promise<TourResults> {
        const url = `${this.apiUrl}?guideId=${guideId}`;
        return fetch(url)
            .then(response => handleResponse<TourResults>(response))
            .then(result => result)
            .catch(error => {
                console.error("Error fetching tours:", error.message);
                throw error;
            });
    }

    // Izmena ture
    updateTour(tourId: number, tour: Tour): Promise<Tour> {
        const url = `${this.apiUrl}/${tourId}`;
        return fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tour)
        })
        .then(response => handleResponse<Tour>(response))
        .then(updatedTour => {
            console.log("Tour updated successfully:", updatedTour);
            return updatedTour;
        })
        .catch(error => {
            console.error("Error updating tour:", error.message);
            throw error;
        });
    }

    
    removeTourById(tourId: number): Promise<void> {
        const url = `${this.apiUrl}/${tourId}`;
        return fetch(url, {
            method: "DELETE"
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text || `Failed to delete tour. Status: ${response.status}`);
                });
            }
            console.log("Tour deleted successfully.");
        })
        .catch(error => {
            console.error("Error deleting tour:", error.message);
            throw error;
        });
    }

   
    getById(tourId: number): Promise<Tour> {
        const url = `${this.apiUrl}/${tourId}`;
        return fetch(url)
            .then(response => handleResponse<Tour>(response))
            .then(tour => tour)
            .catch(error => {
                console.error("Error fetching tour:", error.message);
                throw error;
            });
    }
}
