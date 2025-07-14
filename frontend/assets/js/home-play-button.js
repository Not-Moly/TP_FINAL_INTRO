document.getElementById("home-play-button").addEventListener("click", async () => {
    const sound = document.getElementById("home-play-sound");
    sound.currentTime = 0;

    // Button volume modifier
    sound.volume = 0.4;
    const gamemodes_url = "/gamemodes";
    try {
        await sound.play();
        sound.onended = () => {
            window.location.href = gamemodes_url;
        };
    } catch (error) {
        console.error("Error al reproducir:", error);
        window.location.href = gamemodes_url;
    }
});