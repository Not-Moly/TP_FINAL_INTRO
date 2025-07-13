document.getElementById("home-play-button").addEventListener("click", async () => {
    const sound = document.getElementById("home-play-sound");
    sound.currentTime = 0;

    // Button volume modifier
    sound.volume = 0.4;

    try {
        await sound.play();
        sound.onended = () => {
            window.location.href = "gamemodes.html";
        };
    } catch (error) {
        console.error("Error al reproducir:", error);
        window.location.href = "gamemodes.html";
    }
});