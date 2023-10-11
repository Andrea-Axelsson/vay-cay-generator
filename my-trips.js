import { goBack } from "./buttons.js";
import {loadSelectedDataFromLocalStorage} from "./localstorage.js";


const goBackBtn = document.getElementById("go-back-btn")
const myTravelList = document.getElementById("my-travel-list")
const savedTrips = loadSelectedDataFromLocalStorage("savedTrips")

/* -----------------------------RENDER SAVED TRIPS---------------------------------- */


function renderSavedTrips(savedTrips) {
  myTravelList.innerHTML = ''

  savedTrips.forEach((trip) => {
    const tripElement = document.createElement("div")
    tripElement.innerHTML = trip.travelHtml
    myTravelList.appendChild(tripElement)

    const separator = document.createElement("hr")
    myTravelList.appendChild(separator)
  })


}



renderSavedTrips(savedTrips)

/* -----------------------------CLICK BUTTON---------------------------------- */


goBackBtn.addEventListener("click", goBack)