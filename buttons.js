import { destination } from "./data.js"
import { loadSelectedDataFromLocalStorage, saveSelectedDataToLocalStorage } from "./localstorage.js"

function goBack(){

    localStorage.removeItem("selectedRadioOption")
    localStorage.removeItem("selectedDestination")
    window.location = "index.html"
}

function myTrips(){
    window.location = "my-trips.html"
}

function getNewTravelDestination(selectedRadioOption, selectedDestination) {
    console.log("FUNCTION USED")
    const matchingDestinations = destination.filter(dest =>
        selectedRadioOption.some(tag => dest.locationTags.includes(tag))
    )

    if (matchingDestinations.length > 0) {
        const randomIndex = Math.floor(Math.random() * matchingDestinations.length);
        selectedDestination = matchingDestinations[randomIndex];
    }
    return selectedDestination
}

function expandInfo(olElement, downArrow) {

    if (olElement.style.display === "none" || olElement.style.display === "") {
        olElement.style.display = "flex";
        downArrow.style.transform = "rotate(-90deg)";
    } else {
        olElement.style.display = "none";
        downArrow.style.transform = "none";
    }
}


function saveTrip(savedTrips, saveTripId, travelHtml, likeHeartBtn) {
    const index = savedTrips.findIndex((trip) => trip.uuid === saveTripId);

    if (index !== -1) {
        // The trip is already saved, so do nothing
        return savedTrips;
    } else {
        // The trip is not saved, so add it
        savedTrips.push({
            uuid: saveTripId,
            travelHtml,
        });

        // Save the updated savedTrips array to localStorage
        saveSelectedDataToLocalStorage("savedTrips", savedTrips);

        // Toggle the "liked" class
        likeHeartBtn.classList.toggle("liked");

        // Log the updated savedTrips array
        console.log("Saved Trips:", savedTrips);

        return savedTrips;
    }
}

function removeTrip(savedTrips, saveTripId){
    const tripToRemove = savedTrips.findIndex(trip => trip.uuid === saveTripId)

    if (tripToRemove !==-1){
        savedTrips.splice(tripToRemove, 1)
    }
    saveSelectedDataToLocalStorage("savedTrips", savedTrips)
}


export {goBack, myTrips, expandInfo, getNewTravelDestination, saveTrip, removeTrip}



/* likeHeartBtn.classList.toggle("liked") */