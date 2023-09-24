
function shareWeather() {
    // Check if the Web Share API is supported
    if (navigator.share) {
        navigator.share({
            title: 'Check out the weather',
            text: 'Current weather in Denver, USA: 21°C, Cloudy',
            url: 'https://example.com/weather' // Replace with your app's URL
        })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Sharing failed', error));
    } else {
        // Fallback behavior for browsers that do not support the Web Share API
        alert('Sharing is not supported in this browser.');
    }
}

// Add a click event listener to the share button
document.getElementById('share-button').addEventListener('click', shareWeather);

