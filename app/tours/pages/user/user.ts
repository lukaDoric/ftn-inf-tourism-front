import { TourService } from "../../service/tour.service.js";
const tourService = new TourService();
const sortDropdown = document.getElementById("sortDropdown") as HTMLSelectElement;
const orderDropdown = document.getElementById("orderDropdown") as HTMLSelectElement;

const imageUrl = "https://unbredbombers.ca/wp-content/uploads/2018/05/no-image-1.jpg";

sortDropdown.addEventListener("change", () => {
    renderData(sortDropdown.value, orderDropdown.value);
});

orderDropdown.addEventListener("change", () => {
    renderData(sortDropdown.value, orderDropdown.value);
});

function renderData(orderBy: string = "Name", orderDirection: string = "ASC"): void {

    tourService.getAll(orderBy,orderDirection)
    .then(result => {

        const cardGrid = document.querySelector(".card-grid");
        if (!cardGrid) return;

        cardGrid.innerHTML = "";

        if (result.data.length === 0) {
            cardGrid.innerHTML = "<p>No tours available.</p>";
            return;
        }

        result.data.forEach(tour => {
            const tourEl = document.createElement("div");
            tourEl.className = "tour-card";
            tourEl.innerHTML = `
            <div class='tour-cardFront'>
                <img src="${imageUrl}" alt=${tour.name} />
                <div class='info'>
                    <h4>${tour.name}</h4>
                    <p>${new Date(tour.dateTime).toLocaleString("sr-SR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                    <p>Available spots: ${tour.maxGuests}</p> 
                </div>
            </div>
            <div class='tour-cardBack'>
                <h1>${tour.name}</h1>
                <p>${tour.description}</p>
            </div> `;

            cardGrid.appendChild(tourEl)
        })
    })
    .catch(error => {
        console.error("Greška:", error);
        alert("Došlo je do greške prilikom učitavanja podataka.");
    });
}

window.addEventListener("DOMContentLoaded", () => {
    renderData(); 
});



