function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const MAX_WAIT_TIME = 5000; // In ms

document.addEventListener('DOMContentLoaded', function () {
    // List of images filenames
    const imageNames = [
        "AgeOfEmpires2.jpg",
        "AlanWake2.jpg",
        "AnimalCrossing.jpg",
        "Balatro.jpg",
        "BaldursGate3.jpg",
        "BioshockTheCollection.jpg",
        "CallOfDutyBlackOps3.jpg",
        "CallOfDutyModernWarfare3.jpg",
        "CounterStrike2.jpg",
        "CrashBandicoot.jpg",
        "Cuphead.jpg",
        "Cyberpunk2077.jpg",
        "DeadByDaylight.jpg",
        "DeadSpaceRemake.jpg",
        "Deltarun.jpg",
        "Destiny2.jpg",
        "DetroitBecomeHuman.jpg",
        "Dishonored.jpg",
        "DyingLight.jpg",
        "EldenRing.jpg",
        "Fallout4.jpg",
        "Firewatch.jpg",
        "FiveNightsAtFreddys.jpg",
        "ForzaHorizon5.jpg",
        "GeometryDash.jpg",
        "GodOfWar.jpg",
        "GrandTheftAutoSanAndreas.jpg",
        "GrandTheftAutoV.jpg",
        "Half-Life.jpg",
        "HaloInfinite.jpg",
        "HorizonZeroDawn.jpg",
        "LeagueOfLegends.jpg",
        "Left4Dead2.jpg",
        "Metro2033.jpg",
        "Minecraft.jpg",
        "NierAutomata.jpg",
        "Outlast.jpg",
        "Overwatch.jpg",
        "Payday2.jpg",
        "Portal2.jpg",
        "ProjectZomboid.jpg",
        "Rachet&Clank.jpg",
        "RainbowSixSiege.jpg",
        "RedDeadRedemption2.jpg",
        "ResidenEvil2Remake.jpg",
        "Rust.jpg",
        "Satisfactory.jpg",
        "SilentHill.jpg",
        "SilentHill2Remake.jpg",
        "Skyrim.jpg",
        "STALKER2.jpg",
        "StarWarsBattlefront2.jpg",
        "Subnautica.jpg",
        "Terraria.jpg",
        "TheLastOfUs.jpg",
        "TheLegendOfZeldaBreathOfTheWild.jpg",
        "TheWitcher3.jpg",
        "Titanfall2.jpg",
        "Uncharted4.jpg",
        "Undertale.jpg"
    ];

    // Reference to the grid container (background)
    const backgroundGrid = document.getElementById("ul-background-grid");

    // Refill wih repetitions
    // const repetitions = 3;
    // const repeatedImages = Array.from({ length: repetitions * imageNames.length }, (_, i) =>
    //     imageNames[i % imageNames.length]
    // );

    shuffle(imageNames);

    // Start creating each elemment of the grid
    const loadedImagesPromises = [];
    imageNames.forEach((name) => {
        const li = document.createElement("li");
        const img = document.createElement("img");
        img.src = `assets/images/background/${name}`;

        // img.loading = "lazy";
        const loadImagePromise = new Promise((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => reject();
        })
        loadedImagesPromises.push(loadImagePromise);

        // Append the elements
        li.appendChild(img);
        backgroundGrid.appendChild(li);
    });
    // Add mouse move effect for 3D rotation
    document.addEventListener('mousemove', (e) => {
        const rotationForce = 50;
        const x = (window.innerWidth / 2 - e.pageX) / rotationForce;
        const y = (window.innerHeight / 2 - e.pageY) / rotationForce;

        backgroundGrid.style.transform = `rotateX(${10 + y}deg) rotateY(${5 + x}deg) rotateZ(${3 - x / 5}deg)`;
    });

    // Add parallax effect to header on scroll
    // window.addEventListener('scroll', () => {
    //     const scrollY = window.scrollY;
    //     document.querySelector('.header').style.transform = `translateY(${scrollY * 0.4}px)`;
    //     document.querySelector('.header').style.opacity = `${1 - scrollY / 400}`;
    // });

    // Set timeout to handle images that take too long to load
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error('Timeout loading images'));
        }, MAX_WAIT_TIME);
    });
    // Promise to dispatch 'background-loaded' event
    const imageLoadPromise = Promise.all(loadedImagesPromises);
    // Race for timeout
    Promise.race([imageLoadPromise, timeoutPromise])
        .then(() => {
            window.dispatchEvent(new Event('background-loaded'));
        })
        .catch(() => {
            window.dispatchEvent(new Event('background-loaded'));
        });
});