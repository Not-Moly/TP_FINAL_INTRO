// characters.js

let loadCharacters;

document.addEventListener("DOMContentLoaded", async () => {
    // 1. Configuración inicial del contenedor
    const container = document.createElement('div');
    container.className = 'characters-container';
    container.style.padding = '20px';
    document.body.appendChild(container);

    // 2. Título de la página
    const title = document.createElement('h1');
    title.className = 'title has-text-centered';
    title.textContent = 'Personajes';
    title.style.marginTop = '10px';
    container.appendChild(title);

    // 3. Función para cargar y mostrar personajes
    loadCharacters = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/characters');
            if (!response.ok) throw new Error('Error al cargar personajes');

            const characters = await response.json();

            // Limpiar contenido existente
            const oldGrid = document.querySelector('.columns.is-multiline');
            if (oldGrid) oldGrid.remove();

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

            // Crear tarjetas para cada personaje
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

    // 4. Configuración del modal para añadir nuevos personajes
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-background"></div>
        <div class="modal-card">
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
                    <label class="label">ID del Juego</label>
                    <div class="control">
                        <input id="char-game" class="input" type="number" placeholder="ID del juego relacionado">
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button id="submit-char" class="button is-success">Guardar</button>
                <button class="button cancel-btn">Cancelar</button>
            </footer>
        </div>
    `;
    document.body.appendChild(modal);

    // 5. Manejadores de eventos para el modal
    const addButton = document.getElementById('añadir');
    if (addButton) {
        addButton.addEventListener('click', () => {
            modal.classList.add('is-active');
        });
    }

    modal.querySelector('.delete').addEventListener('click', () => {
        modal.classList.remove('is-active');
    });

    modal.querySelector('.modal-background').addEventListener('click', () => {
        modal.classList.remove('is-active');
    });

    modal.querySelector('.cancel-btn').addEventListener('click', () => {
        modal.classList.remove('is-active');
    });

    // 6. Envío del formulario
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
            modal.classList.remove('is-active');
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