// Defino listas de Desarrolladores, Franquicias y Sagas (Se llenan al llamar las funciones anteriormente definidas)
export let loadedFranchises = {};
export let loadedSagas = {};
export let loadedDevelopers = {};

import { BACKEND_URL } from './env_variables.js';

export async function loadDevelopers() {
    try {
        // Conseguir conexión con la base de datos de los desarrolladores
        const response = await fetch(`${ BACKEND_URL }/api/developers`);
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

export async function loadFranchisesSagas() {
    // Limpiar diccionarios
    loadedFranchises = {};
    loadedSagas = {};
    async function loadFranchise () {
        try {
            // Conseguir conexión con la base de datos de las franquicias
            const response = await fetch(`${ BACKEND_URL }/api/franchises`);
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
    async function loadSaga () {
        try {
            // Conseguir conexión con la base de datos de las sagas
            const response = await fetch(`${ BACKEND_URL }/api/sagas`);
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
    const dataLoadedEvent = new Event('dataLoaded');
    document.dispatchEvent(dataLoadedEvent);
})