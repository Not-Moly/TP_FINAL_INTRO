let loadGames;
let developersList = [];

document.addEventListener("DOMContentLoaded", async () => {
    // 1. Configuración inicial del contenedor
    const container = document.createElement('div');
    container.className = 'games-container';
    container.style.padding = '20px';
    document.body.appendChild(container);

    // 2. Título de la página
    const title = document.createElement('h1');
    title.className = 'title has-text-centered';
    title.textContent = 'Juegos';
    title.style.marginTop = '10px';
    container.appendChild(title);

    // Cargar lista de desarrolladores primero
    await loadDevelopers();

    // 3. Función para cargar y mostrar juegos
    loadGames = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/games');
            if (!response.ok) throw new Error('Error al cargar juegos');

            const games = await response.json();

            // Limpiar contenido existente
            const oldGrid = document.querySelector('.columns.is-multiline');
            if (oldGrid) oldGrid.remove();

            if (Object.keys(games).length === 0) {
                const emptyMessage = document.createElement('p');
                emptyMessage.textContent = 'No hay juegos registrados';
                emptyMessage.className = 'has-text-centered';
                container.appendChild(emptyMessage);
                return;
            }

            // Crear grid de juegos
            const grid = document.createElement('div');
            grid.className = 'columns is-multiline is-centered';
            grid.style.marginTop = '20px';

            // Crear tarjetas para cada juego
            for (const [id, game] of Object.entries(games)) {
                const card = document.createElement('div');
                card.className = 'column is-one-quarter';
                card.innerHTML = `
                    <div class="card game-card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src="${game.image || 'https://via.placeholder.com/300'}" alt="Portada del juego">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">${game.title}</p>
                                    <p class="subtitle is-6">${game.developer || 'Desarrollador no especificado'}</p>
                                </div>
                            </div>
                            <div class="content">
                                <p><strong>Año:</strong> ${game.release || game.release_year}</p>
                                <p><strong>Género:</strong> ${game.genre}</p>
                                <p><strong>Modo:</strong> ${game.gamemode}</p>
                                <p><strong>Perspectiva:</strong> ${game.perspective}</p>
                                <p><strong>Franquicia:</strong> ${game.franchise}</p>
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
            errorMessage.textContent = 'Error al cargar los juegos';
            errorMessage.className = 'has-text-centered has-text-danger';
            container.appendChild(errorMessage);
        }
    };

    // Función para cargar desarrolladores
    async function loadDevelopers() {
        try {
            const response = await fetch('http://localhost:3000/api/developers');
            if (!response.ok) throw new Error('Error al cargar desarrolladores');
            developersList = await response.json();
        } catch (error) {
            console.error('Error al cargar desarrolladores:', error);
        }
    }

    // Carga inicial de juegos
    await loadGames();

    // 4. Configuración del modal para añadir nuevos juegos
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Añadir Juego</p>
                <button class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <div class="field">
                    <label class="label">Título</label>
                    <div class="control">
                        <input id="game-title" class="input" type="text" placeholder="Título del juego">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Año de lanzamiento</label>
                    <div class="control">
                        <input id="game-year" class="input" type="number" placeholder="Año de lanzamiento">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Modo de juego</label>
                    <div class="control">
                        <input id="game-gamemode" class="input" type="text" placeholder="Modo de juego">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Género</label>
                    <div class="control">
                        <input id="game-genre" class="input" type="text" placeholder="Género">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Perspectiva</label>
                    <div class="control">
                        <input id="game-perspective" class="input" type="text" placeholder="Perspectiva">
                    </div>
                </div>
                <div class="field">
                    <label class="label">URL de la imagen</label>
                    <div class="control">
                        <input id="game-image" class="input" type="text" placeholder="URL de la imagen">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Franquicia</label>
                    <div class="control">
                        <input id="game-franchise" class="input" type="text" placeholder="Franquicia">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Desarrollador</label>
                    <div class="control">
                        <div class="select is-fullwidth">
                            <select id="game-developer">
                                <option value="">Seleccione un desarrollador</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button id="submit-game" class="button is-success">Guardar</button>
                <button class="button cancel-btn">Cancelar</button>
            </footer>
        </div>
    `;
    document.body.appendChild(modal);

    // 5. Manejadores de eventos para el modal
    const addButton = document.getElementById('añadir');
    if (addButton) {
        addButton.addEventListener('click', () => {
            // Llenar el select con los desarrolladores
            const developerSelect = document.getElementById('game-developer');
            developerSelect.innerHTML = '<option value="">Seleccione un desarrollador</option>';
            
            for (const [id, developer] of Object.entries(developersList)) {
                const option = document.createElement('option');
                option.value = id;
                option.textContent = developer.name;
                developerSelect.appendChild(option);
            }
            
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
    document.getElementById('submit-game').addEventListener('click', async () => {
        const newGame = {
            title: document.getElementById('game-title').value,
            release_year: document.getElementById('game-year').value,
            gamemode: document.getElementById('game-gamemode').value,
            genre: document.getElementById('game-genre').value,
            perspective: document.getElementById('game-perspective').value,
            image: document.getElementById('game-image').value,
            franchise: document.getElementById('game-franchise').value,
            id_developer: document.getElementById('game-developer').value
        };

        // Validación de campos requeridos
        if (!newGame.title || !newGame.release_year || !newGame.gamemode || 
            !newGame.genre || !newGame.perspective || !newGame.id_developer) {
            alert('Por favor complete todos los campos requeridos');
            return;
        }

        try {
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

            // Cerrar modal y actualizar lista
            modal.classList.remove('is-active');
            await loadGames();

            // Resetear formulario
            document.getElementById('game-title').value = '';
            document.getElementById('game-year').value = '';
            document.getElementById('game-gamemode').value = '';
            document.getElementById('game-genre').value = '';
            document.getElementById('game-perspective').value = '';
            document.getElementById('game-image').value = '';
            document.getElementById('game-franchise').value = '';
            document.getElementById('game-developer').value = '';

        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        }
    });
});