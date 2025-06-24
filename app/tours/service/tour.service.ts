import { Tour } from "../model/tour.model";
import { TourFormData } from "../model/tourFormData.model";

export class TourService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = "http://localhost:5105/api/tours";
  }

  getAllWithId(userId: number): Promise<Tour[]> {
    return fetch(`${this.apiUrl}?guideId=${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw { status: response.status, message: response.text };
        }

        return response.json();
      })
      .then(tours => {
        return tours;
      })
      .catch((error) => {
        console.error("Error:", error.status);
        throw error;
      });
  }

  getById(tourId: number): Promise<Tour> {
    return fetch(`${this.apiUrl}/${tourId}`)
      .then((response) => {
        if (!response.ok) {
          throw { status: response.status, message: response.text };
        }
        return response.json();
      })
      .catch((error) => {
        console.error(
          "Error occured while trying to get tour. Please try again."
        );
        console.error(`Error: ${error.message}  Status: ${error.status}`);
        throw error;
      });
  }

  add(formData: TourFormData): Promise<Tour> {
    return fetch(this.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw { status: response.status, message: response.text };
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error: " + error.status);

        if (error.status && error.status === 400) {
          console.error("Data is invalid");
        } else {
          console.error(
            "An error occured while creating user. Please try again"
          );
        }
      });
  }

  update(tourId: number, formData: TourFormData): Promise<Tour> {
    return fetch(`${this.apiUrl}/${tourId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw { status: response.status, message: response.text };
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error: " + error.status);

        if (error.status && error.status === 400) {
          console.error("Data is invalid");
        } else {
          console.error(
            "An error occured while updating user. Please try again."
          );
        }
      });
  }

  delete(tourId: number): Promise<void> {
    return fetch(`${this.apiUrl}/${tourId}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw { status: response.status, message: response.text };
        }
      })
      .catch((error) => {
        console.error(
          "An error occured while deleting user. Please try again."
        );
        console.error(`Error: ${error.message}  Status: ${error.status}`);
      });
  }
}
