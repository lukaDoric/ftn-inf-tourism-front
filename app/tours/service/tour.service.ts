import { Tour } from "../models/tour.model.js";

export class TourService {
    private apiUrl: string;

    constructor() {
        this.apiUrl = '/data/tours.json';
    }

    getToursByAuthor(id: string): Promise<Tour[]> {
        return fetch(`${this.apiUrl}?authorId=${id}`)
            .then(async response => {
                if (!response.ok) {
                    const msg = await response.text();
                    throw {status: response.status, message: msg}
                }
                return response.json();
            }).catch(error => {
                console.error('Error: ', error.status)
                throw error;
            })
    }

    createTour(tour: Tour): Promise<Tour> {
        return fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify(tour)
        })
        .then (async response => {
            if (!response.ok) {
                const msg = await response.text();
                throw {status: response.status, message: msg}
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error: ', error.status)
            throw error
        })
    }

    getTourById(id: string): Promise<Tour> {
        return fetch(`${this.apiUrl}/${id}`)
            .then(async response => {
                if (!response.ok) {
                    const msg = await response.text();
                    throw {status: response.status, message: msg}
                }
                return response.json();
            }).catch(error => {
                console.error('Error: ', error.status)
                throw error
            });
    }

    updateTour(id: string, formData: Tour): Promise<void> {
        return fetch(`${this.apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id, ...formData})
        })
        .then(async response => {
            if (!response.ok) {
                const msg = await response.text();
                throw {status: response.status, message: msg}
            }
        }).catch((error) => {
            console.error('Error: ', error.status)
            throw error
        });
    }

    deleteTour(id: string): Promise<void> {
        return fetch(`${this.apiUrl}/${id}`, {
            method: 'DELETE'
        })
        .then(async response => {
            if (!response.ok) {
                const msg = await response.text();
                throw {status: response.status, message: msg}
            }
        }).catch(error => {
            console.error('Error: ', error.message)
            throw error
        });
    }
}
