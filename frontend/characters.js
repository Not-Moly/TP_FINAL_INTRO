// characters.js

let loadCharacters;

document.addEventListener("DOMContentLoaded", async () => {
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
                    <div class="card character-card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src="${character.image || 'https://via.placeholder.com/300'}" alt="Imagen del personaje">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">${character.name}</p>
                                    <p class="subtitle is-6">${character.franchise}</p>
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

    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');
    const modalBackground = document.querySelector('.modal-background');
    // Configuración del modal para añadir nuevos personajes
    modalContent.innerHTML = `
        <header class="modal-card-head">
            <p class="modal-card-title">Añadir Personaje</p>
            <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
            <div class="field">
                <label class="label">Nombre</label>
                <div class="control">
                    <input id="char-name" class="input" type="text" placeholder="Nombre del personaje">
                </div>
            </div>
            <div class="field">
                <label class="label">Franquicia</label>
                <div class="control">
                    <input id="char-franchise" class="input" type="text" placeholder="Franquicia a la que pertenece">
                </div>
            </div>
            <div class="field">
                <label class="label">URL de la imagen</label>
                <div class="control">
                    <input id="char-image" class="input" type="text" placeholder="URL de la imagen">
                </div>
            </div>
            <div class="field">
                <label class="label">Género</label>
                <div class="control">
                    <div class="select">
                        <select id="char-gender">
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Otro">Otro</option>
                            <option value="Desconocido">Desconocido</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="field">
                <label class="label">Especie</label>
                <div class="control">
                    <input id="char-species" class="input" type="text" placeholder="Especie del personaje">
                </div>
            </div>
            <div class="field">
                <label class="label">Descripción</label>
                <div class="control">
                    <textarea id="char-description" class="textarea" placeholder="Descripción del personaje"></textarea>
                </div>
            </div>
            <div class="field">
                <label class="label">Habilidad principal</label>
                <div class="control">
                    <input id="char-skill" class="input" type="text" placeholder="Habilidad principal">
                </div>
            </div>
            <div class="field">
                <label class="label">Juego</label>
                <div class="control">
                    <div class="select">
                        <select id="char-game">

                        </select>
                    </div>
                </div>
            </div>
        </section>
        <footer class="modal-card-foot">
            <button id="submit-char" class="button is-success">Guardar</button>
            <button class="button cancel-btn">Cancelar</button>
        </footer>
    `;

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

    function openModal($el) {
        $el.classList.add('is-active');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    //Agregar funcionalidad al botón
    const addButton = document.getElementById('add-button');
    if (addButton) {
        addButton.addEventListener('click', () => {
            openModal(modal);
        });
    }

    // Manejadores de eventos para el modal
    (document.querySelectorAll('.modal-background, .delete, .cancel-btn') || []).forEach(($close) => {
        $close.addEventListener('click', () => {
            closeModal(modal);
        });
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            closeModal(modal);
        }
    });

    // Envío del formulario
    document.getElementById('submit-char').addEventListener('click', async () => {
        const newCharacter = {
            character_name: document.getElementById('char-name').value,
            franchise: document.getElementById('char-franchise').value,
            image: document.getElementById('char-image').value,
            gender: document.getElementById('char-gender').value,
            species: document.getElementById('char-species').value,
            description: document.getElementById('char-description').value,
            main_skill: document.getElementById('char-skill').value,
            id_game: document.getElementById('char-game').value
        };

        // Validación de campos requeridos
        if (!newCharacter.character_name || !newCharacter.franchise || !newCharacter.gender ||
            !newCharacter.species || !newCharacter.description || !newCharacter.main_skill) {
            alert('Por favor complete todos los campos requeridos');
            return;
        }

        try {
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

            // Cerrar modal y actualizar lista
            closeModal(modal);
            await loadCharacters();

            // Resetear formulario
            document.getElementById('char-name').value = '';
            document.getElementById('char-franchise').value = '';
            document.getElementById('char-image').value = '';
            document.getElementById('char-species').value = '';
            document.getElementById('char-description').value = '';
            document.getElementById('char-skill').value = '';
            document.getElementById('char-game').value = '';

        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        }
    });
});