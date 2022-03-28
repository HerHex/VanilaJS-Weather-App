window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    

    let APIKey = 'aec6bc7797e3481c8bfe3c2422e7f41d';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={part}&appid=${APIKey}`


            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temp} = data.current;
                    const weatherDescription = data.current.weather[0].description
                    const tempconversionCelius = temp - 273.15;
                    //Set DOM Elements from the API
                    temperatureDegree.textContent =  Math.round(tempconversionCelius) + " C";
                    temperatureDescription.textContent = weatherDescription;
                    locationTimezone.textContent = data.timezone;
                    //Set Icon
                    setIcons(weatherDescription, document.querySelector('.icon'))

                    temperatureDegree.addEventListener('click', () => {
                        if (temperatureDegree.textContent == Math.round(tempconversionCelius) + " C") {
                            temperatureDegree.textContent = Math.round((tempconversionCelius * 1.8) + 32) + " F";
                        } else {
                            temperatureDegree.textContent = Math.round(tempconversionCelius) + " C"
                        }
                    })
                })
        })
    } else {
        h1.textContent = "Cant geolocate !"
    }

    let CLEAR_DAY = "CLEAR_DAY";
    let CLEAR_NIGHT = "CLEAR_NIGHT";
    let RAIN = "RAIN";
    let SNOW = "SNOW";
    let WIND = "WIND";
    let SLEET = "SLEET";
    let FOG = "FOG";
    let CLOUDY = "CLOUDY";
    let PARTLY_CLOUDY_DAY = "PARTLY_CLOUDY_DAY";
    let PARTLY_CLOUDY_NIGHT = "PARTLY_CLOUDY_NIGHT";


    function setIcons(icon, iconID) {
        const skycons = new Skycons ({color: "white"});
        console.log(icon);
        skycons.play();

        if(icon.includes("cloud")) {
            if (icon.includes("day")) {
                icon = PARTLY_CLOUDY_DAY;
            } else   
            icon = CLOUDY;
        } else if (icon.includes("rain")){
            icon = RAIN;
        } else if (icon.includes("snow")) {
            icon = SNOW;
        } else if (icon.includes("clear")) {
            if (icon.includes("day")) {
                icon = CLEAR_DAY;
            } else 
            icon = CLEAR_NIGHT;          
        } else if (icon.includes('mist')) {
            icon = FOG;
        }
        return skycons.set(iconID, Skycons[icon]);
    }
});