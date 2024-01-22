import { loadSelectedDataFromLocalStorage } from "./localstorage.js"
import { unsplashApi } from "./fetch.js"
import { goBack, myTrips, expandInfo, getNewTravelDestination, saveTrip} from "./buttons.js";

  const travelInfo = document.getElementById("travel-info")
  const goBackBtn = document.getElementById("go-back-btn")
  const myTripsBtn = document.getElementById("my-trips-btn")
  const newVayCayBtn = document.getElementById("new-vaycay-btn")
  let selectedDestination = loadSelectedDataFromLocalStorage("selectedDestination")
  const selectedRadioOption = loadSelectedDataFromLocalStorage("selectedRadioOption")
  let savedTrips = loadSelectedDataFromLocalStorage("savedTrips") || [];
  let travelHtml = ""

  console.log("SAVED TRIPS TEST", savedTrips)
  /* ---------------------------------GET TRAVEL HTML------------------------------- */
  function getTravelHtml() {
    let uuid = self.crypto.randomUUID()
    
    travelHtml = `
    <div id="${uuid}">
        <div class="travel-image">
            <div class="travel-image-info">
            <p>${selectedRadioOption[1]} in</p>
                <h3>${selectedDestination.country}</h3>
                <h3 class="city-text">${selectedDestination.city}</h3> 
            </div>
            <img id="like-heart-btn" data-save="${uuid}" class="like-heart" src="images/heart.png"/>
        </div>
        
        <div class="country-info">
        <h4>${selectedDestination.country} in short</h4>
            <p>${selectedDestination.countryInShort}</p>
        </div>
        
        <div class="country-info">
            <div id="drop-down-btn-1">
                <h4>Top 5 must visit!</h4>
                <i class="fa-solid fa-chevron-down"></i>
            </div>
            
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
    return travelHtml
  }

/* ---------------------------------RENDER------------------------------- */

function render() {
    travelInfo.innerHTML = getTravelHtml();
    const travelImageDiv = document.querySelector(".travel-image")
    const dropDownBtn1 = document.getElementById("drop-down-btn-1")
    const olElement = dropDownBtn1.nextElementSibling
    const downArrow = dropDownBtn1.querySelector(".fa-chevron-down")
    const likeHeartBtn = document.getElementById("like-heart-btn");

/* ---------------------------------BUTTON CLICKS------------------------------- */
    
goBackBtn.addEventListener("click", goBack)

myTripsBtn.addEventListener("click", myTrips)

dropDownBtn1.addEventListener("click", function() {
      expandInfo(olElement, downArrow)
    })

    likeHeartBtn.addEventListener("click", function () {
        const saveTripId = likeHeartBtn.getAttribute("data-save");
        savedTrips = saveTrip(savedTrips, saveTripId, travelHtml, likeHeartBtn);
    });

newVayCayBtn.addEventListener("click", function() {
        console.log("BTN CLICKED")
        selectedDestination = getNewTravelDestination(selectedRadioOption, selectedDestination)
        render()
        unsplashApi()
        window.scroll({ top: 0, behavior: "smooth" })
      })
/* ---------------------------------LOAD UNSPLASH API------------------------------- */
    unsplashApi(selectedDestination.country, selectedDestination.city, travelImageDiv)
     
  } 

  console.log("test")
  render();

  export { savedTrips, travelHtml };