loadingScreen = document.getElementById("loading-screen");
window.addEventListener("background-loaded", async () => {
    loadingScreen.style.opacity = '0';
    loadingScreen.style.visibility = 'hidden';
});