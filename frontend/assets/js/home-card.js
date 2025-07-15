// Get the Home card
const homeCard = document.querySelector('.home-card');

// Once the screen has loaded
document.addEventListener("screenLoaded", () => {
    // Adds neon effect flicker 
    homeCard.classList.add('flicker-box-start');

    // Adds type effect
    let writeInText = document.querySelector(".write-in");
    const fullText = writeInText.textContent;
    writeInText.textContent = '';
    let i = 0;
    const time_between_letters = 35;
    function type() {
        if (i < fullText.length) {
            writeInText.textContent += fullText.charAt(i);
            i++;
            setTimeout(type, time_between_letters);
        }
    }
    type();
});
