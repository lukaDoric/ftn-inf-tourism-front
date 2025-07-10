import { TourService } from "../../service/tour.service.js";
import { Tour } from "../../model/tour.model.js";
const tourService = new TourService();
const guideId = localStorage.getItem('userId');
const form = document.querySelector("#newTourForm") as HTMLFormElement;

const parms = new URLSearchParams(window.location.search);
const id = Number(parms.get('id'));

if(id){
    fillFormForEdit(id);
}

function fillFormForEdit(id: number){
     tourService.getById(id)
    .then(tour =>{
        (document.querySelector("#name") as HTMLInputElement).value = tour.name;
        (document.querySelector("#description") as HTMLInputElement).value = tour.description;
        (document.querySelector("#dateTime") as HTMLInputElement).value = tour.dateTime;
        (document.querySelector("#maxGuests") as HTMLInputElement).value = tour.maxGuests.toString();
    });
}

function updateTour(id: number, tourData: Tour){
    tourService.updateTour(id, tourData)
    .then(() => {
            alert("Tour successfully updated!");
            window.location.href = "/app/tours/pages/guide-tours/guide-tours.html";
        })
        .catch((error) => {
            alert(`Error occurred: ${error.message}`);
        });
}

function createTour(tourData: Tour){
    tourService.createTour(tourData)
    .then(() => {
            alert("Tour successfully created!");
            window.location.href = "/app/tours/pages/guide-tours/guide-tours.html"; 
        })
        .catch((error) => {
            alert(`Error: ${error.message}`);
        });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const tourData = getFormData();
    if(id){
        updateTour(id, tourData);
    }
    else{
       createTour(tourData)
    }
});

function getFormData(): Tour {
    const formData = new FormData(form);
    return {
        guideId: Number(guideId),
        name: formData.get("name")!.toString(),
        description: formData.get("description")!.toString(),
        dateTime: new Date(formData.get("dateTime")!.toString()).toISOString(),
        maxGuests: Number(formData.get("maxGuests"))
    };
}

