let loadGames;
let loadedDevelopers = {};

const allGameGamemodes = [
    "Cooperativo",
    "Multijugador",
    "Pantalla dividida",
    "Un jugador"
]
const allGameGenres = [
    "Acción",
    "Aventura",
    "Battle Royale",
    "Carreras",
    "Cartas coleccionables",
    "Construcción y gestión",
    "Deportes",
    "Disparos",
    "Educativo",
    "Estrategia en tiempo real (RTS)",
    "Estrategia por turnos (TBS)",
    "Fighting / Peleas",
    "Hack and Slash",
    "Horror de supervivencia",
    "Idle / Incremental",
    "JRPG (Juego de rol japonés)",
    "Metroidvania",
    "MOBA (Multiplayer Online Battle Arena)",
    "Mundo abierto",
    "Multijugador masivo en línea (MMO)",
    "Musical / Ritmo",
    "Narrativo / Visual Novel",
    "Party / Fiesta",
    "Plataformas",
    "Point and Click",
    "Puzle / Rompecabezas",
    "Roguelike / Roguelite",
    "Rol (RPG)",
    "Sandbox",
    "Simulación",
    "Sigilo",
    "Sobrevivencia / Supervivencia",
    "Soulslike",
    "Terror",
    "Terror psicológico",
    "Táctico",
    "Tower Defense",
    "Vehículos de combate",
]
const allGamePerspectives = [
    "Primera persona",
    "Realidad virtual",
    "Tercera persona",
    "Vista de pájaro / Isométrica",
    "Vista lateral"
]

let updateValueSelects;
let updateAllValueSelects;

async function createGameModal() {

    const gameModal = document.getElementById('game-modal');
    // Agrego opción de desarrolladores al que pertenece
    let loadDeveloperOptions;
    let loadFranchiseOptions;
    let loadSagaOptions;

    //#region Database Load
    loadDeveloperOptions = async () => {
        const gameDeveloperOptions = document.getElementById('game-developer');
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

            // Crear opciones de desarrolladores
            for (const [id, developer] of Object.entries(developers)) {
                const newOption = document.createElement('option');
                newOption.value = id;
                newOption.innerHTML = `${developer.name}`;
                gameDeveloperOptions.append(newOption);

                // Agregar a lista de developers global
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
    await loadDeveloperOptions();


    loadFranchiseOptions = async () => {
        const gameFranchiseOptions = document.getElementById('game-franchise');
        try {
            // Conseguir conexión con la base de datos de los franquicias
            const response = await fetch('http://localhost:3000/api/franchises');
            if (!response.ok) throw new Error('Error al cargar franquicias');

            const franchises = await response.json();

            // Verificar cantidad de franquicias nula
            if (Object.keys(franchises).length === 0) {
                const emptyMessage = document.createElement('p');
                emptyMessage.textContent = 'No hay franquicias registrados';
                emptyMessage.className = 'has-text-centered';
                gameFranchiseOptions.appendChild(emptyMessage);
                return;
            }

            // Crear opciones de franquicias
            for (const [id, franchise] of Object.entries(franchises)) {
                const newOption = document.createElement('option');
                newOption.value = id;
                newOption.innerHTML = `${franchise.title}`;
                gameFranchiseOptions.append(newOption);

                // Agregar a lista de franchises global
                loadedFranchises[id] = franchise;
            }

        } catch (error) {
            console.error('Error:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Error al cargar los franquicias';
            errorMessage.className = 'has-text-centered has-text-danger';
            gameFranchiseOptions.appendChild(errorMessage);
        }
    };
    await loadFranchiseOptions();

    loadSagaOptions = async () => {
        const gameSagaOptions = document.getElementById('game-saga');
        try {
            // Conseguir conexión con la base de datos de los sagas
            const response = await fetch('http://localhost:3000/api/sagas');
            if (!response.ok) throw new Error('Error al cargar sagas');

            const sagas = await response.json();

            // Verificar cantidad de sagas nula
            if (Object.keys(sagas).length === 0) {
                const emptyMessage = document.createElement('p');
                emptyMessage.textContent = 'No hay sagas registrados';
                emptyMessage.className = 'has-text-centered';
                gameSagaOptions.appendChild(emptyMessage);
                return;
            }

            // Crear opciones de sagas
            for (const [id, saga] of Object.entries(sagas)) {
                const newOption = document.createElement('option');
                newOption.value = id;
                newOption.innerHTML = `${saga.title}`;
                gameSagaOptions.append(newOption);

                // Agregar a lista de sagas global
                loadedSagas[id] = saga;
            }

        } catch (error) {
            console.error('Error:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Error al cargar los sagas';
            errorMessage.className = 'has-text-centered has-text-danger';
            gameSagaOptions.appendChild(errorMessage);
        }
    };
    await loadSagaOptions();
    //#endregion
    // ------------------------------------------------------------

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
        select.innerHTML = `<option disabled ${!selectedValue ? 'selected' : ''} value="">Select a ${typeOfValue}</option>`;
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

    updateValueSelects(allGameGamemodes, 'gamemode');
    updateValueSelects(allGameGenres, 'genre');
    updateValueSelects(allGamePerspectives, 'perspective');


    return gameModal;
}

function openGameModal($el, mode) {
    $el.classList.add('is-active');
    // Editar texto identificador de modal y visibilidad de botón borrar
    if (mode === 'edit') {
        $el.querySelector('.modal-card-title').innerHTML = `Editar Juego`;
        $el.querySelector('#submit-btn').innerHTML = `Guardar cambios`;
        $el.querySelector('#delete-btn').style.display = 'inline-flex';
    } else if (mode === 'add') {
        $el.querySelector('.modal-card-title').innerHTML = `Añadir Juego`;
        $el.querySelector('#submit-btn').innerHTML = `Añadir`;
        $el.querySelector('#delete-btn').style.display = 'none';
    }
    updateAllValueSelects();
}

function closeGameModal($el) {
    $el.classList.remove('is-active');

    // Resetear formulario
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
    const modalCancel = modal.querySelector('#modal-cancel');
    const modalConfirm = modal.querySelector('#modal-confirm');

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


document.addEventListener("DOMContentLoaded", async () => {
    // Creo modal para la edición de datos de juegos
    // Lo llamo al principio para tener la referencia al elemento y poder agregarlo a la función de abrir modal al clickear en un juego
    const gameModal = await createGameModal();

    // Conseguir contenedor de las entidades
    const container = document.querySelector('.entities-container');

    // Función para cargar y mostrar juegos
    loadGames = async () => {
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
                    card.addEventListener('click', () => {
                        // Colocar valores de personaje seleccionado en inputs
                        document.getElementById('game-id').value = id;
                        document.getElementById('game-title').value = game.title;
                        document.getElementById('game-year').value = game.release_year;
                        updateValueSelects(allGameGamemodes, 'gamemode', game.gamemode);
                        updateValueSelects(allGameGenres, 'genre', game.genre);
                        updateValueSelects(allGamePerspectives, 'perspective', game.perspective);
                        document.getElementById('game-image').value = game.image;
                        document.getElementById('game-franchise').value = game.id_franchise;
                        document.getElementById('game-saga').value = game.id_saga;
                        document.getElementById('game-developer').value = game.id_developer;

                        openGameModal(gameModal, 'edit');
                    })
                    grid.appendChild(card);
                }
                return;
            }



            container.appendChild(grid);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Error al cargar los juegos';
            errorMessage.className = 'has-text-centered has-text-danger';
            container.appendChild(errorMessage);
        }
    };

    // Carga inicial de juegos
    await loadGames();

    //Agregar funcionalidad al botón
    const addButton = document.getElementById('add-button');
    if (addButton) {
        addButton.addEventListener('click', () => {
            openGameModal(gameModal, 'add');
        });
    }

    // Manejadores de cierre del modal
    (gameModal.querySelectorAll('.modal-background, .delete, #cancel-btn') || []).forEach(($close) => {
        $close.addEventListener('click', () => {
            closeGameModal(gameModal);
        });
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            closeGameModal(gameModal);
        }
    });

    // Envío del formulario
    gameModal.querySelector('#submit-btn').addEventListener('click', async () => {
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
            alert('Por favor complete todos los campos requeridos');
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
                    throw new Error(errorData.error || 'Error al crear juego');
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
                    throw new Error(errorData.error || 'Error al editar juego');
                }
            }

            // Cerrar modal
            closeGameModal(gameModal);
            // Actualizar lista
            await loadGames();

        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
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
                throw new Error(errorData.error || 'Error al eliminar juego');
            }
            return true;
        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        }
    }

    document.getElementById('delete-btn').addEventListener('click', async () => {
        document.getElementById('confirm-delete-text').innerHTML = '¿Estás seguro que quieres eliminar ésta entidad?'
        openDeleteModal(async () => {
            const game_id = document.getElementById('game-id').value;
            try {

                const response = await fetch(`http://localhost:3000/api/charactersbygame/${game_id}`);
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(errorData.error || 'Error al conseguir personajes por juego');
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
                alert(`Error: ${error.message}`);
            }
        });
    });

});