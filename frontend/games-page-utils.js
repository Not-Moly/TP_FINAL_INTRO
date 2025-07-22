// Defino listas de Desarrolladores, Franquicias y Sagas (Se llenan al llamar las funciones anteriormente definidas)
let loadedFranchises = {};
let loadedSagas = {};
let loadedDevelopers = {};


//#region Developer/Franchise/Saga Load
async function loadDevelopers() {
    try {
        // Conseguir conexión con la base de datos de los desarrolladores
        const response = await fetch('http://localhost:3000/api/developers');
        if (!response.ok) throw new Error('Error al cargar desarrolladores');

        const developers = await response.json();



        // Verificar cantidad de desarrolladores nula
        if (Object.keys(developers).length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = 'No hay desarrolladores registrados';
            emptyMessage.className = 'has-text-centered';
            gameDeveloperOptions.appendChild(emptyMessage);
            return;
        }

        for (const [id, developer] of Object.entries(developers)) {
            loadedDevelopers[id] = developer;
        }

    } catch (error) {
        console.error('Error:', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Error al cargar los desarrolladores';
        errorMessage.className = 'has-text-centered has-text-danger';
        gameDeveloperOptions.appendChild(errorMessage);
    }
};

async function loadFranchisesSagas() {
    // Limpiar diccionarios
    loadedFranchises = {};
    loadedSagas = {};
    loadFranchise = async () => {
        try {
            // Conseguir conexión con la base de datos de las franquicias
            const response = await fetch('http://localhost:3000/api/franchises');
            if (!response.ok) throw new Error('Error al cargar franquicias');

            const franchises = await response.json();

            // Verificar cantidad de franquicias nula
            if (Object.keys(franchises).length != 0) {
                // Crear opciones de franquicias
                for (const [id, franchise] of Object.entries(franchises)) {
                    // Agregar a lista de franchises global
                    loadedFranchises[id] = franchise;
                }
            } else {
                console.error("No hay franquicias creadas");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    await loadFranchise();
    loadSaga = async () => {
        try {
            // Conseguir conexión con la base de datos de las sagas
            const response = await fetch('http://localhost:3000/api/sagas');
            if (!response.ok) throw new Error('Error al cargar sagas');

            const sagas = await response.json();

            // Verificar cantidad de sagas nula
            if (Object.keys(sagas).length != 0) {
                // Crear opciones de sagas
                for (const [id, saga] of Object.entries(sagas)) {
                    // Agregar a lista de sagas global
                    loadedSagas[id] = saga;
                }
            } else {
                console.error("No hay sagas creadas");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    await loadSaga();
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadFranchisesSagas();
    await loadDevelopers();
    // Crear y despachar evento de cargado cuando terminen de cargar todos los datos
    const dataLoadedEvent = new CustomEvent('dataLoaded');
    document.dispatchEvent(dataLoadedEvent);

})


//#endregion
// ------------------------------------------------------------



