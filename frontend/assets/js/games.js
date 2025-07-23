let updateValueSelects;
let updateAllValueSelects;

import { allGameGamemodes, allGameGenres, allGamePerspectives } from './datasets.js';
import { loadDevelopers, loadFranchisesSagas, loadedDevelopers, loadedFranchises, loadedSagas } from './games-page-utils.js';
import { showToast } from './toast-notification.js'

function createDeveloperOptions() {
    const gameDeveloperOptions = document.getElementById('game-developer');
    gameDeveloperOptions.innerHTML = '<option value="" disabled selected>Seleccione un desarrollador</option>';

    // Crear opciones de desarrolladores
    for (const [id, developer] of Object.entries(loadedDevelopers)) {
        const newOption = document.createElement('option');
        newOption.value = id;
        newOption.innerHTML = `${developer.name}`;
        gameDeveloperOptions.append(newOption);
    }
}

function createFranchiseOptions() {
    const gameFranchiseOptions = document.getElementById('game-franchise');
    gameFranchiseOptions.innerHTML = '<option value="" disabled selected>Seleccione una franquicia</option>';

    // Crear opciones de franquicias
    for (const [id, franchise] of Object.entries(loadedFranchises)) {
        const newOption = document.createElement('option');
        newOption.value = id;
        newOption.innerHTML = `${franchise.title}`;
        gameFranchiseOptions.append(newOption);
    }
};

function createSagaOptions() {
    const gameSagaOptions = document.getElementById('game-saga');
    gameSagaOptions.innerHTML = '<option value="" disabled selected>Seleccione una saga</option>';

    // Crear opciones de sagas
    for (const [id, saga] of Object.entries(loadedSagas)) {
        const newOption = document.createElement('option');
        newOption.value = id;
        newOption.innerHTML = `${saga.title}`;
        gameSagaOptions.append(newOption);
    }
};

export function createGameModalFixedOptions() {
    createDeveloperOptions();
    createFranchiseOptions();
    createSagaOptions();
}

async function createGameModal() {

    const gameModal = document.getElementById('game-modal');
    // Agrego opción de desarrolladores, franquicias y sagas
    createGameModalFixedOptions();

    // Agrego funcionalidad de preview de imagen
    const gameImagePreviewElement = gameModal.querySelector('#game-image-preview');
    const imageInputElement = gameModal.querySelector('#game-image');
    if (gameImagePreviewElement && imageInputElement) {
        imageInputElement.addEventListener('change', () => {
            gameImagePreviewElement.src = imageInputElement.value;
        })
    }

    //#region Option Values Methods
    function createSelect(allValues = [], selectedValues = [], selectedValue = '', typeOfValue = '') {
        // Crear wrappers para el select
        const controlWrapper = document.createElement('div');
        controlWrapper.classList.add('control', 'mb-2');
        // Estilo modifica el posicionamiento de los items para que el botón de eliminar quede centrado
        controlWrapper.style = "display: flex; align-items: center; gap: 0.5rem;";
        const selectWrapper = document.createElement('div');
        selectWrapper.classList.add('select', 'is-fullwidth');
        selectWrapper.style = "max-width: 25rem";

        // Conseguir opciones disponibles PERO agregar opción ya seleccionada si se crea un select con un valor ya seleccionado
        const availableOptions = allValues.filter(value => !selectedValues.includes(value) || (selectedValue && value === selectedValue));

        // Crear el elemento (input) select
        const select = document.createElement('select');
        // Clase para añadir scrollbar
        select.classList.add('modal-scrollable');
        // Opción default si no hay valor seleccionado
        const customString = typeOfValue === "genre" ? "Seleccione un genero" : typeOfValue === "gamemode" ? "Seleccione un modo de juego" : typeOfValue === "perspective" ? "Seleccione una perspectiva" : "";
        select.innerHTML = `<option disabled ${!selectedValue ? 'selected' : ''} value="">${customString}</option>`;
        // Solo agregar las opciones disponibles
        availableOptions.forEach(valueOption => {
            const opt = document.createElement('option');
            opt.value = valueOption;
            opt.textContent = valueOption;
            // Agregar atributo 'selected' si valor igual al seleccionado si lo hubiese
            if (valueOption === selectedValue) opt.selected = true;
            select.appendChild(opt);
        });

        // Actualizar selects cada que se cambie de valor
        select.addEventListener('change', () => {
            updateValueSelects(allValues, typeOfValue)
        });

        selectWrapper.appendChild(select);
        controlWrapper.appendChild(selectWrapper);

        // Boton para eliminar género (Solo agregado si hay un valor seleccionado)
        if (selectedValue) {
            const deleteOptionBtn = document.createElement('button');
            deleteOptionBtn.id = 'delete-option';
            deleteOptionBtn.classList.add('button', 'is-small', 'is-danger');
            deleteOptionBtn.addEventListener('click', () => {
                controlWrapper.remove();
                updateValueSelects(allValues, typeOfValue);
            });
            const spanElement = document.createElement('span');
            spanElement.classList.add('icon', 'is-small');
            const iconElement = document.createElement('i');
            iconElement.classList.add('fa-regular', 'fa-circle-xmark');
            spanElement.appendChild(iconElement)
            deleteOptionBtn.appendChild(spanElement);

            controlWrapper.appendChild(deleteOptionBtn);
        }

        document.getElementById(`${typeOfValue}-selects`).appendChild(controlWrapper);

    }

    function getCurrentValueSelections(typeOfValue) {
        const valueSelection = document.getElementById(`${typeOfValue}-selects`);

        // Selects = Elementos selects ya existentes dentro del elemento de selecciones del tipo de valor
        const selects = valueSelection.querySelectorAll('select');
        // Mapeo todos los elementos por su valor
        return Array.from(selects).map(sel => sel.value).filter(val => val); // El último filter se saltea el valor default ''
    }

    updateValueSelects = (allValues, typeOfValue, stringOfValues = '') => {

        const selected = stringOfValues ? stringOfValues.split(",").map(item => item.trim()) : getCurrentValueSelections(typeOfValue);

        // Limpiar y volver a armar selection
        document.getElementById(`${typeOfValue}-selects`).innerHTML = '';

        // Crear selects ya seleccionados
        selected.forEach((value, i) => {
            createSelect(allValues, selected, value, typeOfValue);
        });

        // Crear nuevo select si quedan generos por agregar
        if (selected.length < allValues.length) {
            createSelect(allValues, selected, undefined, typeOfValue);
        }

        // Guardar selecciones en un string oculto con los valores ordenados alfabeticamente y separados por coma
        const sorted = [...selected].sort();
        document.getElementById(`game-${typeOfValue}-string`).value = sorted.join(', ');
    }

    updateAllValueSelects = () => {
        updateValueSelects(allGameGamemodes, 'gamemode');
        updateValueSelects(allGameGenres, 'genre');
        updateValueSelects(allGamePerspectives, 'perspective');
    }

    //#endregion

    updateAllValueSelects();

    return gameModal;
}

//#region OPEN/CLOSE MODAL METHODS
function openGameModal($el, mode) {
    $el.classList.add('is-active');
    // Editar texto identificador de modal y visibilidad de botón borrar
    if (mode === 'edit') {
        $el.querySelector('.modal-card-title').innerHTML = `Editar Juego`;
        $el.querySelector('#submit-game-btn').innerHTML = `Guardar cambios`;
        $el.querySelector('#delete-game-btn').style.display = 'inline-flex';
    } else if (mode === 'add') {
        $el.querySelector('.modal-card-title').innerHTML = `Añadir Juego`;
        $el.querySelector('#submit-game-btn').innerHTML = `Añadir`;
        $el.querySelector('#delete-game-btn').style.display = 'none';
    }
    updateAllValueSelects();
}

function closeGameModal($el) {
    $el.classList.remove('is-active');

    // Resetear formulario
    $el.querySelector('#game-image-preview').src = 'https://bulma.io/assets/images/placeholders/128x128.png';
    const inputs = document.getElementById('game-form').querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });

    // Actualizar lista
    loadGames();
}

function openDeleteModal(onConfirm) {
    const modal = document.getElementById('confirm-delete-modal');
    const modalCancel = modal.querySelector('#confirm-delete-modal-cancel');
    const modalConfirm = modal.querySelector('#confirm-delete-modal-confirm');

    modal.classList.add('is-active');

    const closeModal = () => {
        modal.classList.remove('is-active');
        modalConfirm.onclick = null;
    };

    modalCancel.onclick = closeModal;

    modalConfirm.onclick = () => {
        closeModal();
        onConfirm();
    };
}
//#endregion

// Función para cargar y mostrar juegos
export async function loadGames() {
    const gameContainer = document.querySelector('.entities-container');
    try {
        const response = await fetch('http://localhost:3000/api/games');
        if (!response.ok) throw new Error('Error al cargar juegos');

        const games = await response.json();

        // Limpiar contenido existente
        const oldGrid = document.querySelector('.columns.is-multiline');
        if (oldGrid) oldGrid.remove();

        document.getElementById('no-games').style = Object.keys(games).length === 0 ? 'display: block;' : 'display: none;';

        if (Object.keys(games).length !== 0) {
            // Crear grid de juegos
            const grid = document.createElement('div');
            grid.className = 'columns is-multiline is-centered';
            grid.style.marginTop = '20px';
            grid.style.marginInline = '10px';

            // Crear tarjetas para cada juego
            for (const [id, game] of Object.entries(games)) {
                const card = document.createElement('div');
                card.className = 'column is-one-quarter';
                card.innerHTML = `
                    <div class="card game-card entity-card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src="${game.image || 'https://via.placeholder.com/300'}" alt="Portada del juego">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">${game.title}</p>
                                    <p class="subtitle is-6">${loadedDevelopers[game.id_developer].name || 'Desarrollador no especificado'}</p>
                                </div>
                            </div>
                            <div class="content">
                                <p><strong>Año:</strong> ${game.release || game.release_year}</p>
                                <p><strong>Género:</strong> ${game.genre}</p>
                                <p><strong>Modo:</strong> ${game.gamemode}</p>
                                <p><strong>Perspectiva:</strong> ${game.perspective}</p>
                            </div>
                        </div>
                    </div>
                `;
                // Añadir funcionalidad click
                (card.querySelectorAll('.card-image, .card-content') || []).forEach(($open) => {
                    $open.addEventListener('click', () => {
                        // Colocar valores de personaje seleccionado en inputs
                        document.getElementById('game-id').value = id;
                        document.getElementById('game-title').value = game.title;
                        document.getElementById('game-year').value = game.release_year;
                        updateValueSelects(allGameGamemodes, 'gamemode', game.gamemode);
                        updateValueSelects(allGameGenres, 'genre', game.genre);
                        updateValueSelects(allGamePerspectives, 'perspective', game.perspective);
                        document.getElementById('game-image').value = game.image;
                        document.getElementById('game-image-preview').src = game.image;
                        document.getElementById('game-franchise').value = game.id_franchise;
                        document.getElementById('game-saga').value = game.id_saga;
                        document.getElementById('game-developer').value = game.id_developer;

                        openGameModal(document.getElementById('game-modal'), 'edit');
                    });
                });
                grid.appendChild(card);
            }
            gameContainer.appendChild(grid);
        }
    } catch (error) {
        console.error('Error:', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Error al cargar los juegos';
        errorMessage.className = 'has-text-centered has-text-danger';
        gameContainer.appendChild(errorMessage);
    }
};

document.addEventListener("dataLoaded", async () => {
    // Creo modal para la edición de datos de juegos
    const gameModal = await createGameModal();

    // Carga inicial de juegos
    await loadGames();

    window.dispatchEvent(new Event('gamesLoaded'));

    //Agregar funcionalidad al botón
    const addButton = document.getElementById('add-button');
    const modalCreateError = document.getElementById('error-create-modal');
    if (addButton) {
        if (modalCreateError) {
            addButton.addEventListener('click', () => {
                if (Object.keys(loadedDevelopers).length === 0 || Object.keys(loadedFranchises).length === 0 || Object.keys(loadedSagas).length === 0) {
                    modalCreateError.classList.add("is-active");
                }
                else {
                    openGameModal(gameModal, 'add');
                }
            });
        }
    }

    // Manejadores de cierre del modal
    (gameModal.querySelectorAll('.modal-background, .delete, #cancel-game-btn') || []).forEach(($close) => {
        $close.addEventListener('click', () => {
            closeGameModal(gameModal);
        });
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            closeGameModal(gameModal);
        }
    });

    // Manejadores de cierre de modal de error al crear (Faltan entidades de dependencia) 
    modalCreateError.querySelector('#error-create-modal-confirm').addEventListener('click', () => {
        modalCreateError.classList.remove("is-active");
    });


    // Envío del formulario
    gameModal.querySelector('#submit-game-btn').addEventListener('click', async () => {
        const newGame = {
            title: document.getElementById('game-title').value,
            release_year: document.getElementById('game-year').value,
            gamemode: document.getElementById('game-gamemode-string').value,
            genre: document.getElementById('game-genre-string').value,
            perspective: document.getElementById('game-perspective-string').value,
            image: document.getElementById('game-image').value,
            id_franchise: document.getElementById('game-franchise').value,
            id_saga: document.getElementById('game-saga').value,
            id_developer: document.getElementById('game-developer').value
        };

        // Validación de campos requeridos
        if (!Object.values(newGame).every(value => value !== null && value !== undefined && value !== '')) {
            showToast('Faltan campos obligatorios', 'is-danger', 'fas fa-exclamation-triangle', 'ERROR!');
            return;
        }

        try {
            const game_id = document.getElementById('game-id').value;
            if (!game_id) {
                const response = await fetch('http://localhost:3000/api/games', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newGame)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    showToast(errorData.error || 'Error al crear juego', 'is-danger', 'fas fa-exclamation-triangle', 'ERROR!');
                    return;
                }
            } else {
                const response = await fetch(`http://localhost:3000/api/games/${game_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newGame)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    showToast(errorData.error || 'Error al editar juego', 'is-danger', 'fas fa-exclamation-triangle', 'ERROR!');
                    return;
                }
            }

            // Cerrar modal
            closeGameModal(gameModal);
            // Actualizar lista
            await loadGames();

        } catch (error) {
            console.error('Error:', error);
            showToast(`No se pudo agregar/editar el juego`, 'is-danger', 'fas fa-exclamation-triangle', 'ERROR!');
        }
    });

    // Eliminar juego

    async function fetchDeleteGame(id) {
        try {
            const response = await fetch(`http://localhost:3000/api/games/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                const errorData = await response.json();
                showToast(errorData.error || 'Error al eliminar juego', 'is-danger', 'fas fa-exclamation-triangle', 'ERROR!');
                return;
            }
            return true;
        } catch (error) {
            console.error('Error:', error);
            showToast(`No se pudo eliminar el juego`, 'is-danger', 'fas fa-exclamation-triangle', 'ERROR!');
        }
    }

    document.getElementById('delete-game-btn').addEventListener('click', async () => {
        document.getElementById('confirm-delete-text').innerHTML = '¿Estás seguro que quieres eliminar ésta entidad?'
        openDeleteModal(async () => {
            const game_id = document.getElementById('game-id').value;
            try {

                const response = await fetch(`http://localhost:3000/api/charactersbygame/${game_id}`);
                const data = await response.json();
                if (!response.ok) {
                    showToast(`Error al conseguir los personajes del juego`, 'is-danger', 'fas fa-exclamation-triangle', 'ERROR!');
                    return;
                }

                const characters = data;

                // Verificar cantidad de juegos nula
                if (Object.keys(characters).length !== 0) {
                    document.getElementById('confirm-delete-text').innerHTML = 'Éste juego tiene personajes asignados, si lo eliminas los personajes también resultarán eliminados!'
                    openDeleteModal(async () => {
                        if (await fetchDeleteGame(game_id)) {
                            // Cerrar modal
                            closeGameModal(gameModal);
                        }
                    });
                } else {
                    if (await fetchDeleteGame(game_id)) {
                        // Cerrar modal
                        closeGameModal(gameModal);
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                showToast(`No se pudieron conseguir los personajes del juego`, 'is-danger', 'fas fa-exclamation-triangle', 'ERROR!');
            }
        });
    });

});