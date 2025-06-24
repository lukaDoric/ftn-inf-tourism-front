import { TourService } from "../../service/tour.service.js";

const tourService = new TourService();

function Initialize(): void {
    const addTourBtn = document.querySelector('#addTourBtn');
    addTourBtn.addEventListener('click', function() {
        window.location.href = '../toursForm/toursForm.html'
    })
    renderData();
}

function renderData(): void {
    const id = parseInt(localStorage.getItem("userId")) as number;
    tourService.getAllWithId(id)
        .then(tours => {
            for (let i = 0; i < tours.length; i++) {
                const toursContainer = document.querySelector('.tours-container');

                const tourCard = document.createElement('div');
                tourCard.classList.add('tour-card');

                const p1 = document.createElement('p');
                const strong1 = document.createElement('strong');
                strong1.textContent = 'Name: ';
                p1.appendChild(strong1);
                p1.innerHTML += tours[i].name;
                tourCard.appendChild(p1);


                const p2 = document.createElement('p');
                const strong2 = document.createElement('strong');
                strong2.textContent = 'Description: ';
                p2.appendChild(strong2);
                p2.innerHTML += tours[i].description;
                tourCard.appendChild(p2)


                const p3 = document.createElement('p');
                const strong3 = document.createElement('strong');
                strong3.textContent = 'Departure date: ';
                p3.appendChild(strong3);
                p3.innerHTML += new Date(tours[i].dateTime).toLocaleString('sv-SE')
                tourCard.appendChild(p3);

                const p4 = document.createElement('p');
                const strong4 = document.createElement('strong');
                strong4.textContent = 'Capacity: ';
                p4.appendChild(strong4);
                p4.innerHTML += tours[i].maxGuests;
                tourCard.appendChild(p4);

                const p5 = document.createElement('p');
                const strong5 = document.createElement('strong');
                strong5.textContent = 'Status: ';
                p5.appendChild(strong5);
                p5.innerHTML += tours[i].status;
                tourCard.appendChild(p5);

                const buttonDiv = document.createElement('div');
                buttonDiv.id = 'button-container';

                const editBtn = document.createElement('button');
                editBtn.textContent = "Edit";
                editBtn.classList.add("button");
                editBtn.id = ("editBtn");

                editBtn.onclick = function(){
                    window.location.href= `../toursForm/toursForm.html?id=${tours[i].id}`;
                }
                buttonDiv.appendChild(editBtn);


                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = "Delete";
                deleteBtn.classList.add("button");
                deleteBtn.id = ("deleteBtn");
                deleteBtn.onclick = function(){
                    tourService.delete(tours[i].id);
                    window.location.reload();
                }
                buttonDiv.appendChild(deleteBtn);

                tourCard.appendChild(buttonDiv);
                toursContainer.appendChild(tourCard);

            }
        })
}

document.addEventListener('DOMContentLoaded', Initialize)