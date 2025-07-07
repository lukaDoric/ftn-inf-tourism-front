import { TourService } from "../../services/tour.service";
const tourService = new TourService();
const form = document.querySelector("#newTourForm") as HTMLFormElement;
const submitBtn = document.querySelector("#submitBtn") as HTMLButtonElement;

form.addEventListener("input", () => {
    const isValid = validateForm();
    submitBtn.disabled = !isValid;
});


submitBtn.addEventListener("click", (event: Event) => {
    event.preventDefault();

    const result = getFormData();
    if (!result) return;

    const tourData = {
        ...result,
        dateTime: new Date(result.dateTime)
    };

    tourService.createTour(tourData)
        .then(() => {
            alert("Tour created!");
            // window.location.href = DOPUNITI PREBACIVANJE NA STRANICU SA SVIM TURAMA
        })
        .catch(err => {
            alert("Error: " + err.message);
        });
});

function getFormData(){
    const formData = new FormData(form);

    return{
        name: (formData.get('name') || "").toString().trim(),
        description: (formData.get('description') || "").toString().trim(),
        dateTime: (formData.get('dateTime') || "").toString(),
        maxGuests: Number(formData.get('maxGuests'))
    };
}

function validateForm(){
    clearErrors();

    const {name, description, dateTime, maxGuests} = getFormData();
    let isValid = true;

    if(!name){
        document.getElementById("nameError")!.textContent = "Name is required!";
        isValid = false;
    }
    if(!description || description.length < 10){
        document.getElementById("descriptionError")!.textContent = "Description is required!";
        isValid= false;
    }
   
    if (!dateTime) {
        document.getElementById('dateTimeError')!.textContent = 'Date and time are required.';
        isValid = false;
    } else {
        const inputDate = new Date(dateTime);
        const now = new Date();
        if (isNaN(inputDate.getTime())) {
            document.getElementById('dateTimeError')!.textContent = 'Invalid date and time.';
            isValid = false;
        } else if (inputDate <= now) {
            document.getElementById('dateTimeError')!.textContent = 'Date and time must be in the future.';
            isValid = false;
        }
    }
  

  if (!maxGuests || maxGuests < 1) {
    document.getElementById('maxGuestsError')!.textContent = 'Max guests must be at least 1.';
    isValid = false;
  }

  return isValid;
}

function clearErrors() {
    document.querySelectorAll(".error-message").forEach(el => el.textContent = '');
}



