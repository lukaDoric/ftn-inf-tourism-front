import { KeyPoint } from "../../model/tour.model.js";
import { TourService } from "../../service/tour.service.js";

export function KeyPointCode(tourId: number) {

    const tourService = new TourService();
    const form = document.querySelector("#keypoint-form") as HTMLFormElement;
    const list = document.querySelector("#keypoint-list") as HTMLDListElement;

    // Select input elements from the DOM
    const titleInput = document.querySelector("#keypoint-title") as HTMLInputElement;
    const descInput = document.querySelector("#keypoint-description") as HTMLInputElement;
    const imageInput = document.querySelector("#keypoint-image") as HTMLInputElement;
    const latInput = document.querySelector("#keypoint-lat") as HTMLInputElement;
    const lngInput = document.querySelector("#keypoint-lng") as HTMLInputElement;
    const nextButton = document.querySelector("#next-button") as HTMLButtonElement;
    const warning = document.querySelector("#keypoint-warning") as HTMLElement;

    const keyPoints: KeyPoint[] = [];

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const kp: KeyPoint = {
        order: keyPoints.length + 1,
        name: titleInput.value.trim(),
        description: descInput.value.trim(),
        imageUrl: imageInput.value.trim(),
        latitude: parseFloat(latInput.value),
        longitude: parseFloat(lngInput.value),
        tourId: tourId
        };

        tourService.createKeyPoint(tourId,kp)
        .then(function (created) {
            keyPoints.push(created);
            form.reset();
            renderKeyPoints();
        })
        .catch(error => {
            alert("Error: " + error.message);
        });
    });

    function renderKeyPoints() {
        list.innerHTML = "";

        keyPoints.forEach(function (kp, index) {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${kp.name}</strong>: ${kp.description}
            <button data-index="${index}" data-id="${kp.id}">Obriši</button>
        `;
        list.appendChild(li);
        });

        const valid = keyPoints.length >= 2;
        nextButton.disabled = !valid;
        warning.style.display = valid ? "none" : "block";
    }

    list.addEventListener("click", function (e) {
        const target = e.target as HTMLElement;
        if (target.tagName === "BUTTON") {
        const index = parseInt(target.dataset.index || "-1");
        const id = parseInt(target.dataset.id || "-1");
        if (index >= 0 && id >= 0) {
            tourService.deleteKeyPoint(tourId, id)
            .then(function () {
                keyPoints.splice(index, 1);
                renderKeyPoints();
            })
            .catch(error => {
                alert("Error while deleting key-point: " + error.message);
            });
        }
        }
    });

    renderKeyPoints();
}