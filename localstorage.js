function saveSelectedDataToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}


function loadSelectedDataFromLocalStorage(key){
    const savedData = localStorage.getItem(key)

    if (savedData){
        return JSON.parse(savedData)
    }
}




export {saveSelectedDataToLocalStorage, loadSelectedDataFromLocalStorage}