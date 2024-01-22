import { destination } from "./data.js"
import { saveSelectedDataToLocalStorage} from "./localstorage.js";

let selectedRadioOption = []
let selectedDestination = {}


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


/* ----------------------------GENERATE VAYCAY CLICK---------------------------- */
document.getElementById("submit-btn").addEventListener("click", (e) => {
    e.preventDefault();
    getTravelChoices();
    saveSelectedDataToLocalStorage("selectedRadioOption", selectedRadioOption);
    saveSelectedDataToLocalStorage("selectedDestination", selectedDestination);
    window.location = "trip-result.html";
});