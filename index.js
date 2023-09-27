import { destination } from "./data.js"

const form = document.querySelector("form")
const goBack = document.getElementById("go-back")
const newVayCayBtn = document.getElementById("new-vaycay")
const travelInfo = document.getElementById("travel-info")
let selectedRadioOption = []
let selectedDestination = {}

loadSelectedDataFromLocalStorage();

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
            console.error('Error fetching images:', error)
        });
}
unsplashApi()

if (goBack) {
    goBack.addEventListener("click", () => {
        localStorage.clear()
        window.location = "index.html"
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

function saveSelectedDataToLocalStorage() {
    // Save selected data to local storage
    localStorage.setItem("selectedRadioOption", JSON.stringify(selectedRadioOption));
    localStorage.setItem("selectedDestination", JSON.stringify(selectedDestination));
}

function loadSelectedDataFromLocalStorage() {
    // Load selected data from local storage
    const savedRadioOption = localStorage.getItem("selectedRadioOption");
    const savedDestination = localStorage.getItem("selectedDestination");

    if (savedRadioOption && savedDestination) {
        selectedRadioOption = JSON.parse(savedRadioOption);
        selectedDestination = JSON.parse(savedDestination);
    }
}

if (travelInfo) {

    travelInfo.addEventListener("click", (event) => {
        if (event.target.id === "drop-down-btn") {
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

    newVayCayBtn.addEventListener("click", () => {
        console.log("BTN CLICKED");
        getNewTravelDestination();
        render();
        unsplashApi()
        window.scroll({ top: 0, behavior: "smooth" })
    });

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
        let travelHtml = ""

        travelHtml = `
            <div class="travel-image">
                <div class="travel-image-info">
                <p>${selectedRadioOption[1]} in</p>
                    <h3>${selectedDestination.country}</h3>
                    <h3 class="city-text">${selectedDestination.city}</h3> 
                </div>
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
            </div>`

        return travelHtml;
    }

    function render() {
        travelInfo.innerHTML = getTravelHtml();
    }

    render();

}


