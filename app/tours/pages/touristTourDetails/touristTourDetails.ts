import { Keypoint } from "../../model/keyPoint.model.js";
import { Tour } from "../../model/tour.model.js";
import { TourService } from "../../service/tour.service.js";

const tourService = new TourService();

function Initialize(): void {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = parseInt(urlParams.get("id"));
  let tourData: Tour = null;
  tourService.getById(id).then((tour: Tour) => {
    tourData = tour;
    InitializeLogout();
    RenderDetails(tourData);
  })
}

function InitializeLogout(): void {
  const logoutElement = document.querySelector("#logout");
  if (logoutElement) {
    logoutElement.addEventListener("click", function () {
      localStorage.removeItem("id");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
    });
  }
}

function RenderDetails(tourData: Tour): void {
  DisplayTourDetails(tourData);
  DisplayKeyPointDetails(tourData.keyPoints);
}

function DisplayTourDetails(tourData: Tour): void {

  const tourHeader = document.querySelector('.tour-header');
  const tourName = document.createElement('h1');
  tourName.textContent = tourData.name;
  tourHeader.appendChild(tourName);

  const startAndMaxDiv = document.querySelector('.startTime-maxGuests');

  const startText = document.createElement('h3');
  startText.innerHTML = `<i class="fa-solid fa-clock"></i>  ${new Date(tourData.dateTime).toLocaleString("sv-SE")}`;
  startAndMaxDiv.appendChild(startText);

  const maxGuestsText = document.createElement('h3');
  maxGuestsText.innerHTML = `<i class="fa-solid fa-person"></i>  ${tourData.maxGuests.toString()}`;
  startAndMaxDiv.appendChild(maxGuestsText);
  tourHeader.appendChild(startAndMaxDiv);

  const tourDescription = document.querySelector('.tour-description');
  const descriptionText = document.createElement('p');
  descriptionText.textContent = tourData.description;
  tourDescription.appendChild(descriptionText);
}

function DisplayKeyPointDetails(keyPoints: Keypoint[]): void {
  const keyPointsDiv = document.querySelector('.keypoint-details');
  for (const keypoint of keyPoints) {
    const card = document.createElement('div');
    card.className = 'keypoint-card';
    
    const image = document.createElement('img') as HTMLImageElement;
    image.src = 'https://bookaweb.s3.eu-central-1.amazonaws.com/media/33111/beograd-feature.jpg'
    card.appendChild(image);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'keypoint-desc-container';
    const description = document.createElement('p');
    description.textContent = keypoint.description;
    descriptionDiv.appendChild(description);
    card.appendChild(descriptionDiv);

    keyPointsDiv.appendChild(card);
  }
}


document.addEventListener('DOMContentLoaded', Initialize);