function unsplashApi(country, city, travelImageDiv) {
    const accessKey = "d2ou1QiCPK19Gf6ixqmBIo59nbb6Zsgdr_n7KZxMPOc"

    fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}&query=${country}+${city}`)
        .then(res => res.json())
        .then(data => {
            console.log("API DATA",data)
            const imageUrl = data.urls.regular
            travelImageDiv.style.backgroundImage = `linear-gradient(to top, rgba(0, 0, 0, 0.6) 40%, transparent 40%), url(${imageUrl})`
        })
        .catch(error => {
            console.error('Error fetching images:', error)
        })
}

export {unsplashApi}