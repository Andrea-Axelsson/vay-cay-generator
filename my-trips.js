import { goBack } from "./buttons.js";
import {loadSelectedDataFromLocalStorage} from "./localstorage.js";
import { expandInfo, removeTrip } from "./buttons.js";
import { unsplashApi } from "./fetch.js";

const goBackBtn = document.getElementById("go-back-btn")
const myTravelList = document.getElementById("my-travel-list")
const savedTrips = loadSelectedDataFromLocalStorage("savedTrips")
const selectedDestination = loadSelectedDataFromLocalStorage("selectedDestination");

/* -----------------------------RENDER SAVED TRIPS---------------------------------- */


function renderSavedTrips(savedTrips) {
  myTravelList.innerHTML = ''

  savedTrips.forEach((trip) => {
    const tripElement = document.createElement("div")
    tripElement.innerHTML = trip.travelHtml
    myTravelList.appendChild(tripElement)

    const separator = document.createElement("hr")
    myTravelList.appendChild(separator)

    const dropDownBtn = tripElement.querySelector("#drop-down-btn-1")
    const downArrow = dropDownBtn.querySelector(".fa-chevron-down")
    const olElement = dropDownBtn.nextElementSibling
    const likeHeartBtn = tripElement.querySelector("#like-heart-btn");
    const travelImageDiv = tripElement.querySelector(".travel-image")
  
    dropDownBtn.addEventListener("click", function() {
    expandInfo(olElement, downArrow)


    })

    likeHeartBtn.addEventListener("click", function(){
      const saveTripId = likeHeartBtn.getAttribute("data-save")
      removeTrip(savedTrips, saveTripId)
      location.reload()
    })

    likeHeartBtn.classList.add("liked");
    unsplashApi(selectedDestination.country, selectedDestination.city, travelImageDiv)

  })

}

renderSavedTrips(savedTrips)

/* -----------------------------CLICK BUTTON---------------------------------- */


goBackBtn.addEventListener("click", goBack)

