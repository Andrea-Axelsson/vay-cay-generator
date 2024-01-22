/* import { destination } from "./data.js"

let uuid = self.crypto.randomUUID();
console.log("BAHAHAHAHAHSKJHDFK", uuid)

const form = document.querySelector("form")
const goBack = document.getElementById("go-back")
const myTrips = document.getElementById("my-trips")
const newVayCayBtn = document.getElementById("new-vaycay")
const travelInfo = document.getElementById("travel-info")
const myTravelList = document.getElementById("my-travel-list")
let selectedRadioOption = []
let selectedDestination = {}
let savedTrips = []
let travelHtml = ""


loadSavedTripsFromLocalStorage();
console.log("MAAAHHHHY FAKKING SAVED TRIPS IN BEGINNING", savedTrips)

loadSelectedDataFromLocalStorage()

function unsplashApi() {
    const accessKey = "d2ou1QiCPK19Gf6ixqmBIo59nbb6Zsgdr_n7KZxMPOc"

    fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}&query=${selectedDestination.country}+${selectedDestination.city}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const imageUrl = data.urls.regular
            const travelImageDiv = document.querySelector(".travel-image")
            travelImageDiv.style.backgroundImage = `linear-gradient(to top, rgba(0, 0, 0, 0.6) 40%, transparent 40%), url(${imageUrl})`
        })
        .catch(error => {
            console.error('Error fetching images:', error);
        });
}
unsplashApi()

if (goBack) {
    goBack.addEventListener("click", () => {
        localStorage.removeItem("saveSelectedDataToLocalStorage")
        window.location = "index.html"
    })
}

if (myTrips) {
    myTrips.addEventListener("click", () => {
        window.location = "my-trips.html"
    })
}


if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        getTravelChoices()
        unsplashApi()
        saveSelectedDataToLocalStorage();
        window.location = "trip-result.html"
    })
}

function getTravelChoices() {
    let radio = document.getElementsByTagName("input");


    for (let i = 0; i < radio.length; i++) {
        if (radio[i].type === "radio" && radio[i].checked) {
            selectedRadioOption.push(radio[i].value);
        }

    }

    const matchingDestinations = destination.filter(dest =>
        selectedRadioOption.some(tag => dest.locationTags.includes(tag))
    );

    if (matchingDestinations.length > 0) {
        const randomIndex = Math.floor(Math.random() * matchingDestinations.length);
        selectedDestination = matchingDestinations[randomIndex];
    }
}

if (myTravelList){
    function renderSavedTrips() {
        myTravelList.innerHTML = ''; // Clear the previous content
      
        savedTrips.forEach((trip) => {
          const tripElement = document.createElement("div");
          tripElement.innerHTML = trip.travelHtml; // Assuming "travelHtml" contains the saved trip HTML
      
          myTravelList.appendChild(tripElement);
        });
      }
      
      renderSavedTrips();
}


function loadSavedTripsFromLocalStorage() {
    const savedTripsData = localStorage.getItem("savedTrips");
    if (savedTripsData) {
        savedTrips = JSON.parse(savedTripsData);
    }
}

function saveSavedTripsToLocalStorage() {
    // Save the updated savedTrips array to localStorage
    localStorage.setItem("savedTrips", JSON.stringify(savedTrips));
}


function saveSelectedDataToLocalStorage() {
    // Save selected data to local storage
    localStorage.setItem("selectedRadioOption", JSON.stringify(selectedRadioOption))
    localStorage.setItem("selectedDestination", JSON.stringify(selectedDestination))

}

function loadSelectedDataFromLocalStorage() {
    // Load selected data from local storage
    const savedRadioOption = localStorage.getItem("selectedRadioOption")
    const savedDestination = localStorage.getItem("selectedDestination")

    if (savedRadioOption && savedDestination) {
        selectedRadioOption = JSON.parse(savedRadioOption);
        selectedDestination = JSON.parse(savedDestination);
    }
}

if (travelInfo) {

    loadSavedTripsFromLocalStorage();

    travelInfo.addEventListener("click", (event) => {
        if (event.target.id === "drop-down-btn-1") {
            const olElement = travelInfo.querySelector("ol");
            const downArrow = travelInfo.querySelector(".fa-chevron-down")
            if (olElement.style.display === "none" || olElement.style.display === "") {
                olElement.style.display = "flex";
            } else {
                olElement.style.display = "none";
            }

            if (downArrow.style.transform === "none") {
                downArrow.style.transform = "rotate(-90deg)"
            } else {
                downArrow.style.transform = "none"
            }
        }
    });

    travelInfo.addEventListener("click", (event) => {
        if (event.target.id === "like-heart") {
            const likeHeart = document.getElementById("like-heart");
            const saveTripId = likeHeart.getAttribute("data-save");
    
            const isTripSaved = savedTrips.some((trip) => trip.uuid === saveTripId);
    
            if (!isTripSaved) {
                // Save the travelHtml into the savedTrips array
                savedTrips.push({
                    uuid: saveTripId,
                    travelHtml,
                });
    
                // Save the updated savedTrips array to localStorage
                saveSavedTripsToLocalStorage();
    
                // Log the updated savedTrips array into the console
                console.log("Saved Trips:", savedTrips);
            }
    
            if (likeHeart.style.filter === "brightness(0) invert(1)") {
                likeHeart.style.filter = "invert(46%) sepia(46%) saturate(1362%) hue-rotate(332deg) brightness(108%) contrast(101%)";
            } else {
                likeHeart.style.filter = "brightness(0) invert(1)";
            }
        }
    });

    newVayCayBtn.addEventListener("click", () => {
        console.log("BTN CLICKED")
        getNewTravelDestination()
        render()
        unsplashApi()
        window.scroll({ top: 0, behavior: "smooth" })
    })

    function getNewTravelDestination() {
        // Get a new random destination
        const matchingDestinations = destination.filter(dest =>
            selectedRadioOption.some(tag => dest.locationTags.includes(tag))
        );

        if (matchingDestinations.length > 0) {
            const randomIndex = Math.floor(Math.random() * matchingDestinations.length);
            selectedDestination = matchingDestinations[randomIndex];
        }
    }

    function getTravelHtml() {


        travelHtml = `
        <div id="${uuid}">
            <div class="travel-image">
                <div class="travel-image-info">
                <p>${selectedRadioOption[1]} in</p>
                    <h3>${selectedDestination.country}</h3>
                    <h3 class="city-text">${selectedDestination.city}</h3> 
                </div>
                <img id="like-heart" data-save="${uuid}" class="like-heart" src="images/heart.png"/>
            </div>
            
            <div class="country-info">
            <h4>${selectedDestination.country} in short</h4>
                <p>${selectedDestination.countryInShort}</p>
            </div>
            
            <div class="country-info">
                <h4>Top 5 must visit!</h4>
                <i id="drop-down-btn" class="fa-solid fa-chevron-down"></i>
                <ol>
                    <li>
                        <p>
                            <strong>${selectedDestination.mustVisit[0].place1}:</strong> ${selectedDestination.mustVisit[0].description1}
                        </p>
                    </li>
                    <br>
                    <li>
                        <p>
                        <strong>${selectedDestination.mustVisit[0].place2}:</strong> ${selectedDestination.mustVisit[0].description2}
                        </p>
                    </li>
                    <br>
                    <li>
                        <p>
                        <strong>${selectedDestination.mustVisit[0].place3}:</strong> ${selectedDestination.mustVisit[0].description3}
                        </p>
                    </li>
                    <br>
                    <li>
                        <p>
                        <strong>${selectedDestination.mustVisit[0].place4}:</strong> ${selectedDestination.mustVisit[0].description4}
                        </p>
                    </li>
                    <br>
                    <li>
                        <p>
                        <strong>${selectedDestination.mustVisit[0].place5}:</strong> ${selectedDestination.mustVisit[0].description5}
                        </p>
                    </li>
                </ol>
            </div>
        </div>`

        return travelHtml;
    }

    function render() {
        travelInfo.innerHTML = getTravelHtml();
    }
    render();

}

 */