// characters.js

let loadedGames = {};

async function createCharacterModal() {

    const modal = document.querySelector('.modal');
    // Agrego opción de videojuego al que pertenece
    const charGameOptions = document.getElementById('char-game');
    let loadGameOptions;

    loadGameOptions = async () => {
        try {
            // Conseguir conexión con la base de datos de los juegos
            const response = await fetch('http://localhost:3000/api/games');
            if (!response.ok) throw new Error('Error al cargar juegos');

            const games = await response.json();

            // Verificar cantidad de juegos nula
            if (Object.keys(games).length === 0) {
                const emptyMessage = document.createElement('p');
                emptyMessage.textContent = 'No hay juegos registrados';
                emptyMessage.className = 'has-text-centered';
                charGameOptions.appendChild(emptyMessage);
                return;
            }

            // Crear opciones de juegos
            for (const [id, game] of Object.entries(games)) {
                const newOption = document.createElement('option');
                newOption.value = id;
                newOption.innerHTML = `${game.title}`;
                charGameOptions.append(newOption);
                // Agrego juego a lista global de juegos
                loadedGames[id] = game;
            }

        } catch (error) {
            console.error('Error:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Error al cargar los juegos';
            errorMessage.className = 'has-text-centered has-text-danger';
            charGameOptions.appendChild(errorMessage);
        }
    };
    await loadGameOptions();

    return modal;
}

function openModal($el, mode) {
    $el.classList.add('is-active');
    // Editar texto identificador de modal y visibilidad de botón borrar
    if (mode === 'edit') {
        document.querySelector('.modal-card-title').innerHTML = `Editar Personaje`;
        document.getElementById('submit-btn').innerHTML = `Guardar cambios`;
        document.getElementById('delete-btn').style.display = 'inline-flex';
    } else if (mode === 'add') {
        document.querySelector('.modal-card-title').innerHTML = `Añadir Personaje`;
        document.getElementById('submit-btn').innerHTML = `Añadir`;
        document.getElementById('delete-btn').style.display = 'none';
    }
}

function closeModal($el) {
    $el.classList.remove('is-active');

    // Resetear formulario
    const inputs = document.getElementById('char-form').querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
}

function openDeleteModal(onConfirm) {
    const modal = document.getElementById('confirm-delete-modal');
    const modalClose = modal.querySelector('#modal-close');
    const modalCancel = modal.querySelector('#modal-cancel');
    const modalConfirm = modal.querySelector('#modal-confirm');

    modal.classList.add('is-active');

    const closeModal = () => {
        modal.classList.remove('is-active');
        modalConfirm.onclick = null;
    };

    modalClose.onclick = closeModal;
    modalCancel.onclick = closeModal;

    modalConfirm.onclick = () => {
        closeModal();
        onConfirm();
    };
}

let loadCharacters;

document.addEventListener("DOMContentLoaded", async () => {

    // Creo modal para la edición de datos de personajes
    // Lo llamo al principio para tener la referencia al elemento y poder agregarlo a la función de abrir modal al clickear en un personaje
    const modal = await createCharacterModal();

    // Conseguir contenedor de las entidades
    const container = document.querySelector('.entities-container');

    // Función para cargar y mostrar personajes
    loadCharacters = async () => {
        try {
            // Conseguir conexión con la base de datos de los personajes
            const response = await fetch('http://localhost:3000/api/characters');
            if (!response.ok) throw new Error('Error al cargar personajes');

            const characters = await response.json();

            // Limpiar contenido existente (si lo hay)
            const oldGrid = document.querySelector('.columns.is-multiline');
            if (oldGrid) oldGrid.remove();

            // Verificar cantidad de personajes nula
            if (Object.keys(characters).length === 0) {
                const emptyMessage = document.createElement('p');
                emptyMessage.textContent = 'No hay personajes registrados';
                emptyMessage.className = 'has-text-centered';
                container.appendChild(emptyMessage);
                return;
            }

            // Crear grid de personajes
            const grid = document.createElement('div');
            grid.className = 'columns is-multiline is-centered';
            grid.style.marginTop = '20px';
            grid.style.marginInline = '10px';

            // Crear tarjetas para cada personaje y agregar al grid
            for (const [id, character] of Object.entries(characters)) {
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
                                    <p class="subtitle is-6">${loadedGames[character.id_game].title}</p>
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
                card.addEventListener('click', () => {
                    // Colocar valores de personaje seleccionado en inputs
                    document.getElementById('char-id').value = id;
                    document.getElementById('char-name').value = character.name;
                    document.getElementById('char-image').value = character.image;
                    document.getElementById('char-gender').value = character.gender;
                    document.getElementById('char-species').value = character.species;
                    document.getElementById('char-description').value = character.description;
                    document.getElementById('char-skill').value = character.skill
                    document.getElementById('char-game').value = character.id_game;

                    openModal(modal, 'edit');
                })
                grid.appendChild(card);
            }
            container.appendChild(grid);


        } catch (error) {
            console.error('Error:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Error al cargar los personajes';
            errorMessage.className = 'has-text-centered has-text-danger';
            container.appendChild(errorMessage);
        }
    };


    // Carga inicial
    await loadCharacters();

    //Agregar funcionalidad al botón
    const addButton = document.getElementById('add-button');
    if (addButton) {
        addButton.addEventListener('click', () => {
            openModal(modal, 'add');
        });
    }

    // Manejadores de cierre del modal
    (document.querySelectorAll('.modal-background, .delete, #cancel-btn') || []).forEach(($close) => {
        $close.addEventListener('click', () => {
            closeModal(modal);
        });
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            closeModal(modal);
        }
    });

    // Envío formulario
    document.getElementById('submit-btn').addEventListener('click', async () => {
        const newCharacter = {
            character_name: document.getElementById('char-name').value,
            image: document.getElementById('char-image').value,
            gender: document.getElementById('char-gender').value,
            species: document.getElementById('char-species').value,
            description: document.getElementById('char-description').value,
            main_skill: document.getElementById('char-skill').value,
            id_game: document.getElementById('char-game').value
        };

        // Validación de campos requeridos
        if (!Object.values(newCharacter).every(value => value !== null && value !== undefined && value !== '')) {
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
            closeModal(modal);
            // Actualizar lista
            await loadCharacters();
        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        }
    });

    document.getElementById('delete-btn').addEventListener('click', async () => {
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
                closeModal(modal);
                // Actualizar lista
                await loadCharacters();
            } catch (error) {
                console.error('Error:', error);
                alert(`Error: ${error.message}`);
            }
        });
    });
});
