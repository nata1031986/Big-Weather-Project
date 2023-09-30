
const shareButton = document.getElementById("share-button");

// Add a click event listener to the button
shareButton.addEventListener("click", () => {
    // Check if the Web Share API is available in the browser
    if (navigator.share) {
        // Use the Web Share API to share content
        navigator.share({
            title: "Share Title",
            text: "Share Text",
            url: "https://example.com", // Replace with the URL you want to share
        })
        .then(() => {
            console.log("Sharing successful");
        })
        .catch((error) => {
            console.error("Error sharing:", error);
        });
    } else {
        // Fallback for browsers that don't support the Web Share API
        alert("Your browser does not support sharing.");
    }
});

// Define a mapping of weather descriptions to background image URLs
const backgroundImages = {
    "rain": "url('src/weather-animations/rain.gif')",
    "cloud": "url('src/weather-animations/clouds.gif')",
    "thunder": "url('src/weather-animations/thunderstorm.gif')",
    "clear": "url('src/weather-animations/clear.gif')",
};

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("cityForm");
    const cityInput = document.getElementById("cityInput");
    const cityName = document.getElementById("cityName");
    const country = document.getElementById("country");
    const dateTime = document.getElementById("date");
    const weatherDescription = document.getElementById("weatherDescription");
    const temperatureC = document.getElementById("celsiusTemperature");
    const temperatureF = document.getElementById("fahrenheitTemperature");
    const precipitation = document.getElementById("precipitation");
    const humidity = document.getElementById("humidity");
    const windSpeed = document.getElementById("wind");
    const iconElement = document.getElementById("icon");
    const card = document.querySelector(".card");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const city = cityInput.value;
        fetchWeatherData(city);
    });

    async function fetchWeatherData(city) {
        try {
            const apiKey = "a07978a76ca14182d51d7e6e988f8ebd";
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            const response = await fetch(apiUrl);
            const data = await response.json();

            cityName.textContent = `${data.name}, ${data.sys.country}`;
            country.textContent = data.sys.country;
            const timestamp = data.dt * 1000; // Convert timestamp to milliseconds
            dateTime.textContent = formatDate(timestamp);
            weatherDescription.textContent = data.weather[0].description;
            temperatureC.textContent = Math.round(data.main.temp) + "°C";
            temperatureF.textContent = convertCelsiusToFahrenheit(data.main.temp) + "°F";
            precipitation.textContent = `Precipitation: ${data.clouds.all}%`;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
            windSpeed.textContent = `Wind: ${data.wind.speed} km/h`;

            // Call updateBackgroundImage here after fetching data
            updateBackgroundImage(data.weather[0].description.toLowerCase());
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const options = { weekday: "short", hour: "numeric", minute: "numeric" };
        return date.toLocaleDateString("en-US", options);
    }

    function convertCelsiusToFahrenheit(celsius) {
        return Math.round((celsius * 9) / 5 + 32);
    }

    function updateBackgroundImage(weatherCondition) {
        // Check if the weather condition contains specific keywords
        for (const keyword in backgroundImages) {
            if (weatherCondition.includes(keyword)) {
                card.style.backgroundImage = backgroundImages[keyword];
                return; // Exit the loop once a match is found
            }
        }

        // Default background for unknown conditions
        card.style.backgroundImage = backgroundImages["default"];
    }
});