// Definir eventos que ocultarán la pantalla de carga
const loadingStopEvents = ["backgroundLoaded","gamesLoaded","charactersLoaded","developersLoaded"];

// Crear el HTML de la pantalla de carga
function createLoadingScreen() {
    const loader = document.createElement('link');
    loader.rel = "stylesheet";
    loader.href = "assets/css/loader.css";
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.className = 'has-background-black-bis';
    loadingScreen.innerHTML = `
        <div class="hexagon-loader">
            <div class="row">
                <div class="arrow up outer outer-18"></div>
                <div class="arrow down outer outer-17"></div>
                <div class="arrow up outer outer-16"></div>
                <div class="arrow down outer outer-15"></div>
                <div class="arrow up outer outer-14"></div>
            </div>
            <div class="row">
                <div class="arrow up outer outer-1"></div>
                <div class="arrow down outer outer-2"></div>
                <div class="arrow up inner inner-6"></div>
                <div class="arrow down inner inner-5"></div>
                <div class="arrow up inner inner-4"></div>
                <div class="arrow down outer outer-13"></div>
                <div class="arrow up outer outer-12"></div>
            </div>
            <div class="row">
                <div class="arrow down outer outer-3"></div>
                <div class="arrow up outer outer-4"></div>
                <div class="arrow down inner inner-1"></div>
                <div class="arrow up inner inner-2"></div>
                <div class="arrow down inner inner-3"></div>
                <div class="arrow up outer outer-11"></div>
                <div class="arrow down outer outer-10"></div>
            </div>
            <div class="row">
                <div class="arrow down outer outer-5"></div>
                <div class="arrow up outer outer-6"></div>
                <div class="arrow down outer outer-7"></div>
                <div class="arrow up outer outer-8"></div>
                <div class="arrow down outer outer-9"></div>
            </div>
        </div>
    `;
    document.head.appendChild(loader);
    document.body.appendChild(loadingScreen);
    
    return loadingScreen;
}

// Ocultar la pantalla de carga
function hideLoadingScreen(loadingScreen) {
    loadingScreen.style.opacity = '0';
    loadingScreen.style.visibility = 'hidden';

    const screenLoadedEvent = new Event('screenLoaded');
    document.dispatchEvent(screenLoadedEvent);
}

// Crear e insertar pantalla de carga
const loadingScreen = createLoadingScreen();

// Asociar eventos para ocultarla
loadingStopEvents.forEach(eventName => {
    window.addEventListener(eventName, () => {
        hideLoadingScreen(loadingScreen);
    }, { once: true });
});
