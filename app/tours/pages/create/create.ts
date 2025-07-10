import { TourService } from "../../service/tour.service.js";
import { Tour } from "../../model/tour.model.js";
const tourService = new TourService();
const guideId = localStorage.getItem('userId');

// Uzmi podatke iz forme
const form = document.querySelector("#newTourForm") as HTMLFormElement;
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const tourData: Tour = {
        guideId: Number(guideId),
        name: formData.get("name")!.toString(),
        description: formData.get("description")!.toString(),
        dateTime: new Date(formData.get("dateTime")!.toString()).toISOString(),
        maxGuests: Number(formData.get("maxGuests"))
    };

    // Pozovi servis za kreiranje ture
    tourService.createTour(tourData)
        .then(() => {
            alert("Tura uspešno kreirana!");
            window.location.href = "/app/tours/pages/guide-tours/guide-tours.html"; 
        })
        .catch((error) => {
            alert(`Greška: ${error.message}`);
        });
});
