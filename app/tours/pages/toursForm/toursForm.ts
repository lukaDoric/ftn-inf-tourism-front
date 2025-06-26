import { TourService } from "../../service/tour.service.js";
import { TourFormData } from "../../model/tourFormData.model.js";
import { Tour } from "../../model/tour.model.js";

const tourService = new TourService();

function Initialize(): void {
  const logoutElement = document.querySelector("#logout");
  if (logoutElement) {
    logoutElement.addEventListener("click", function () {
      localStorage.removeItem("id");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      window.location.href = "/app/users/pages/login/login.html";
    });
  }
  //End of logout function

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = parseInt(urlParams.get("id"));

  const submitBtn = document.querySelector("#submitBtn");

  if (id) {
    tourService.getById(id).then((tour: Tour) => {
      FillForm(tour);
      submitBtn.addEventListener("click", function (e) {
        e.preventDefault();
        tourService.update(id, InitializeForm()).then(() => {
          window.location.href = "../userTours/userTours.html";
        });
      });

      submitBtn.textContent = "Update";
    });
  } else {
    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();
      tourService.add(InitializeForm()).then(() => {
        window.location.href = "../userTours/userTours.html";
      });
    });
  }
}

function InitializeForm(): TourFormData {
  try {
    const tourName = (document.querySelector("#nameInput") as HTMLInputElement)
      .value;

    const tourDescription = (
      document.querySelector("#descriptionInput") as HTMLInputElement
    ).value;

    const tourStartDate = new Date(
      (document.querySelector("#startDateInput") as HTMLInputElement).value
    );
    tourStartDate.setHours(tourStartDate.getHours() + 2);

    const tourMaxGuests = (
      document.querySelector("#maxGuestsInput") as HTMLInputElement
    ).value;
    if (
      tourName.toString().trim() == "" ||
      tourDescription.toString().trim() == "" ||
      tourMaxGuests.toString().trim() == "" ||
      tourStartDate.toString().trim() == "Invalid Date"
    ) {
      alert("All fields are required.");
      return;
    }

    const formData: TourFormData = {
      name: tourName,
      description: tourDescription,
      dateTime: tourStartDate,
      maxGuests: tourMaxGuests,
      guideId: localStorage.getItem("id"),
    };
    return formData;
  } catch (error) {
    console.error("An error occured while validating data: " + error.message);
  }
}

function FillForm(tour: Tour): void {
  (document.querySelector("#nameInput") as HTMLInputElement).value = tour.name;

  (document.querySelector("#descriptionInput") as HTMLInputElement).value =
    tour.description;

  (document.querySelector("#startDateInput") as HTMLInputElement).value =
    tour.dateTime.toString();

  (document.querySelector("#maxGuestsInput") as HTMLInputElement).value =
    tour.maxGuests.toString();
}

document.addEventListener("DOMContentLoaded", Initialize);
