// Get the Home card
const homeCard = document.querySelector('.home-card');

// Add neon effect flicker once the screen has loaded
document.addEventListener("screenLoaded", () => {
    console.log("loaded");
    homeCard.classList.add('flicker-box-start');
});