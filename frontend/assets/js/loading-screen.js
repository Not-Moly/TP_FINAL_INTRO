// Get loading screen element
loadingScreen = document.getElementById("loading-screen");
// Event that is going to be dispatched once the screen has loaded
const screenLoadedEvent = new Event("screenLoaded");

// Listen to the event that indicates when the background has loaded
window.addEventListener("backgroundLoaded", async () => {
    loadingScreen.style.opacity = '0';
    loadingScreen.style.visibility = 'hidden';
    document.dispatchEvent(screenLoadedEvent);
});