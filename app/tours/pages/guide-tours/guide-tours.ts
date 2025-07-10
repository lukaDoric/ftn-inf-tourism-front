import { TourService } from "../../service/tour.service.js";
import { Tour } from "../../model/tour.model.js";

const tourService = new TourService();
const toursList = document.getElementById("toursList")!;
const guideId = Number(localStorage.getItem("userId"));

document.getElementById("createTourBtn").addEventListener("click", () => {
    window.location.href = "/app/tours/pages/create/create.html";
});

function renderTours(tours: Tour[]) {
    if (tours.length === 0) {
        toursList.innerHTML = "<p>No tours found.</p>";
        return;
    }

    toursList.innerHTML = tours.map(t => `
        <div class="tour-card">
            <h3>${t.name}</h3>
            <p>${t.description}</p>
            <p><strong>Date:</strong> ${new Date(t.dateTime).toLocaleString()}</p>
            <p><strong>Max guests:</strong> ${t.maxGuests}</p>
            <p><strong>Status:</strong> ${t.status}</p>
            <div class="actions">
                <button class="edit-btn" data-id="${t.id}">Edit</button>
                <button class="delete-btn" data-id="${t.id}">Delete</button>
            </div>
        </div>
    `).join("");
}

function loadTours() {
    tourService.getAllByGuide(guideId)
        .then(result => {
            renderTours(result);
        })
        .catch(err => {
            toursList.innerHTML = `<p class="error">Error loading tours: ${err.message}</p>`;
        });
}

loadTours();
