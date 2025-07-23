import { charGenders } from './datasets.js';

let loadedGames = {};
let updateAllValueSelects;
let updateValueSelects;

async function createCharacterModal() {

    const characterModal = document.getElementById('character-modal');
    // Agrego opción de videojuego al que pertenece
    const charGameOptions = document.getElementById('games-selects');

    async function loadGames() {
        try {
            // Conseguir conexión con la base de datos de los juegos
            const response = await fetch('http://localhost:3000/api/games');
            if (!response.ok) throw new Error('Error al cargar juegos');

            const games = await response.json();

            // Verificar cantidad de juegos nula
            if (Object.keys(games).length !== 0) {
                // Agrego juegos a lista global de juegos
                for (const [id, game] of Object.entries(games)) {
                    loadedGames[id] = game;
                }
            }

        } catch (error) {
            console.error('Error:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Error al cargar los juegos';
            errorMessage.className = 'has-text-centered has-text-danger';
            charGameOptions.appendChild(errorMessage);
        }
    };
    await loadGames();

    // Agrego funcionalidad de preview de imagen
    const characterImagePreviewElement = characterModal.querySelector('#char-image-preview');
    const imageInputElement = characterModal.querySelector('#char-image');
    if (characterImagePreviewElement && imageInputElement) {
        imageInputElement.addEventListener('change', () => {
            characterImagePreviewElement.src = imageInputElement.value;
        })
    }

    // Creo opciones de género
    const characterGenderSelectInput = characterModal.querySelector('#char-gender');
    if (characterGenderSelectInput) {
        charGenders.forEach((gender) => {
            const genderOption = document.createElement('option');
            genderOption.value = gender;
            genderOption.innerHTML = gender;
            characterGenderSelectInput.appendChild(genderOption);
        });
    }

    //#region Option Values Methods For Games
    function createSelect(allValues = [], selectedValues = [], selectedValue = '', typeOfValue = '') {
        // Crear wrappers para el select
        const controlWrapper = document.createElement('div');
        controlWrapper.classList.add('control', 'mb-2');
        // Estilo modifica el posicionamiento de los items para que el botón de eliminar quede centrado
        controlWrapper.style = "display: flex; align-items: center; gap: 0.5rem;";
        const selectWrapper = document.createElement('div');
        selectWrapper.classList.add('select', 'is-fullwidth');
        selectWrapper.style = "max-width: 25rem";

        // Conseguir valores de opciones disponibles PERO agregar opción ya seleccionada si se crea un select con un valor ya seleccionado
        const availableValueOptions = allValues.filter(value => !selectedValues.includes(value) || (selectedValue && value === selectedValue));


        // Crear el elemento (input) select
        const select = document.createElement('select');
        // Clase para añadir scrollbar
        select.classList.add('modal-scrollable');
        // Opción default si no hay valor seleccionado
        select.innerHTML = `<option disabled ${!selectedValue ? 'selected' : ''} value="">Selecciona un juego</option>`;
        // Solo agregar las opciones disponibles
        availableValueOptions.forEach(valueOption => {
            const opt = document.createElement('option');
            opt.value = valueOption;
            opt.textContent = loadedGames[valueOption].title;
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

        document.getElementById(`${typeOfValue}s-selects`).appendChild(controlWrapper);

    }

    function getCurrentValueSelections(typeOfValue) {
        const valueSelection = document.getElementById(`${typeOfValue}s-selects`);

        // Selects = Elementos selects ya existentes dentro del elemento de selecciones del tipo de valor
        const selects = valueSelection.querySelectorAll('select');
        // Mapeo todos los elementos por su valor
        return Array.from(selects).map(sel => sel.value).filter(val => val); // El último filter se saltea el valor default ''
    }

    updateValueSelects = (allValues, typeOfValue, stringOfValues = '') => {

        const selected = stringOfValues ? stringOfValues.split(",").map(item => item.trim()) : getCurrentValueSelections(typeOfValue);

        // Limpiar y volver a armar selection
        document.getElementById(`${typeOfValue}s-selects`).innerHTML = '';

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
        document.getElementById(`char-${typeOfValue}s-string`).value = sorted.join(', ');
    }

    updateAllValueSelects = () => {
        updateValueSelects(Object.keys(loadedGames), 'game');
    }

    //#endregion

    updateValueSelects(Object.keys(loadedGames), 'game');
    return characterModal;
}

function openCharacterModal($el, mode) {
    $el.classList.add('is-active');
    // Editar texto identificador de modal y visibilidad de botón borrar
    if (mode === 'edit') {
        $el.querySelector('.modal-card-title').innerHTML = `Editar Personaje`;
        document.getElementById('submit-char-btn').innerHTML = `Guardar cambios`;
        document.getElementById('delete-char-btn').style.display = 'inline-flex';
    } else if (mode === 'add') {
        $el.querySelector('.modal-card-title').innerHTML = `Añadir Personaje`;
        document.getElementById('submit-char-btn').innerHTML = `Añadir`;
        document.getElementById('delete-char-btn').style.display = 'none';
    }
    updateAllValueSelects();
}

function closeModal($el) {
    $el.classList.remove('is-active');

    // Resetear formulario
    $el.querySelector('#char-image-preview').src = 'https://bulma.io/assets/images/placeholders/128x128.png';

    const inputs = document.getElementById('char-form').querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });

    // Actualizar lista
    loadCharacters();
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

// Función para cargar y mostrar personajes
export async function loadCharacters() {
    const container = document.querySelector('.entities-container');
    try {
        // Conseguir conexión con la base de datos de los personajes
        const response = await fetch('http://localhost:3000/api/characters');
        if (!response.ok) throw new Error('Error al cargar personajes');

        const characters = await response.json();

        // Limpiar contenido existente (si lo hay)
        const oldGrid = document.querySelector('.columns.is-multiline');
        if (oldGrid) oldGrid.remove();

        document.getElementById('no-chars').style = Object.keys(characters).length === 0 ? 'display: block;' : 'display: none;';

        // Verificar cantidad de personajes nula
        if (Object.keys(characters).length !== 0) {
            // Crear grid de personajes
            const grid = document.createElement('div');
            grid.className = 'columns is-multiline is-centered';
            grid.style.marginTop = '20px';
            grid.style.marginInline = '10px';

            // Crear tarjetas para cada personaje y agregar al grid
            for (const [id, character] of Object.entries(characters)) {

                // Crear string de juegos a los que pertenece el personaje
                const gamesOfCharacter = character.games.map(game_id => game_id.toString()).filter(string_id => loadedGames[string_id]).map(string_id => loadedGames[string_id].title).sort().join(', ');

                const card = document.createElement('div');
                card.className = 'column is-one-quarter';
                card.innerHTML = `
                    <div class="card character-card entity-card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src="${character.image || 'https://via.placeholder.com/300'}" alt="Imagen de ${character.name}">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">${character.name}</p>
                                    <p class="subtitle is-6">${gamesOfCharacter}</p>
                                </div>
                            </div>
                            <div class="content">
                                <p><strong>Género:</strong> ${character.gender}</p>
                                <p><strong>Especie:</strong> ${character.species}</p>
                                <p><strong>Habilidad principal:</strong> ${character.skill}</p>
                                <p>${character.description}</p>
                            </div>
                        </div>
                    </div>
                `;

                // Añadir funcionalidad click
                (card.querySelectorAll('.card-image, .card-content') || []).forEach(($open) => {
                    $open.addEventListener('click', () => {
                        // Colocar valores de personaje seleccionado en inputs
                        document.getElementById('char-id').value = id;
                        document.getElementById('char-name').value = character.name;
                        document.getElementById('char-image').value = character.image;
                        document.getElementById('char-image-preview').src = character.image;
                        document.getElementById('char-gender').value = character.gender;
                        document.getElementById('char-species').value = character.species;
                        document.getElementById('char-description').value = character.description;
                        document.getElementById('char-skill').value = character.skill;
                        updateValueSelects(Object.keys(loadedGames), 'game', character.games.join(','));
                        openCharacterModal(document.getElementById('character-modal'), 'edit');
                    });
                });
                grid.appendChild(card);
            }
            container.appendChild(grid);

        }



    } catch (error) {
        console.error('Error:', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Error al cargar los personajes';
        errorMessage.className = 'has-text-centered has-text-danger';
        container.appendChild(errorMessage);
    }
};

document.addEventListener("DOMContentLoaded", async () => {

    // Creo modal para la edición de datos de personajes
    const characterModal = await createCharacterModal();

    // Carga inicial
    await loadCharacters();


    //Agregar funcionalidad al botón
    const addButton = document.getElementById('add-button');
    const modalCreateError = document.getElementById('error-create-modal');
    if (addButton) {
        if (modalCreateError) {
            addButton.addEventListener('click', () => {
                if (Object.keys(loadedGames).length === 0) {
                    modalCreateError.classList.add("is-active");
                }
                else {
                    openCharacterModal(characterModal, 'add');
                }
            });
        }
    }

    // Manejadores de cierre del modal
    (characterModal.querySelectorAll('.modal-background, .delete, #cancel-char-btn') || []).forEach(($close) => {
        $close.addEventListener('click', () => {
            closeModal(characterModal);
        });
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            closeModal(characterModal);
        }
    });

    // Manejadores de cierre de modal de error al crear (Faltan entidades de dependencia) 
    modalCreateError.querySelector('#error-create-modal-confirm').addEventListener('click', () => {
        modalCreateError.classList.remove("is-active");
    });

    // Envío formulario
    document.getElementById('submit-char-btn').addEventListener('click', async () => {
        const newCharacter = {
            character_name: document.getElementById('char-name').value,
            image: document.getElementById('char-image').value,
            gender: document.getElementById('char-gender').value,
            species: document.getElementById('char-species').value,
            description: document.getElementById('char-description').value,
            main_skill: document.getElementById('char-skill').value,

            games_ids: document.getElementById('char-games-string').value.split(',').map(g_id => parseInt(g_id.trim()))
        };

        // Validación de campos requeridos
        if (
            !Object.values(newCharacter).every(val => val !== null && val !== undefined && val !== '' && !(typeof val === 'number' && Number.isNaN(val))) ||
            (newCharacter.games_ids.length === 1 && Number.isNaN(newCharacter.games_ids[0]))
        ) {
            alert('Por favor complete todos los campos requeridos');
            return;
        }

        try {

            const character_id = document.getElementById('char-id').value;
            if (!character_id) {
                const response = await fetch('http://localhost:3000/api/characters', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newCharacter)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Error al crear personaje');
                }
            } else {
                const response = await fetch(`http://localhost:3000/api/characters/${character_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newCharacter)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Error al editar personaje');
                }
            }

            // Cerrar modal
            closeModal(characterModal);
        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        }
    });


    document.getElementById('delete-char-btn').addEventListener('click', async () => {
        openDeleteModal(async () => {
            try {
                const character_id = document.getElementById('char-id').value;

                const response = await fetch(`http://localhost:3000/api/characters/${character_id}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Error al eliminar personaje');
                }

                // Cerrar modal
                closeModal(characterModal);
                // Actualizar lista
                await loadCharacters();
            } catch (error) {
                console.error('Error:', error);
                alert(`Error: ${error.message}`);
            }
        });
    });
});
