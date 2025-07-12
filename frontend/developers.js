// developers.js

// Declaramos loadDevelopers en el ámbito global para que sea accesible en todos los manejadores de eventos
let loadDevelopers;

document.addEventListener("DOMContentLoaded", async () => {
    // 1. Configuración inicial del contenedor
    const container = document.createElement('div');
    container.className = 'developers-container';
    container.style.padding = '20px';
    document.body.appendChild(container);

    // 2. Título de la página
    const title = document.createElement('h1');
    title.className = 'title has-text-centered';
    title.textContent = 'Desarrolladores';
    title.style.marginTop = '10px';
    container.appendChild(title);

    // 3. Función para cargar y mostrar desarrolladores
    loadDevelopers = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/developers');
            if (!response.ok) throw new Error('Error al cargar desarrolladores');

            const developers = await response.json();

            // Limpiar contenido existente
            const oldGrid = document.querySelector('.columns.is-multiline');
            if (oldGrid) oldGrid.remove();

            if (Object.keys(developers).length === 0) {
                const emptyMessage = document.createElement('p');
                emptyMessage.textContent = 'No hay desarrolladores registrados';
                emptyMessage.className = 'has-text-centered';
                container.appendChild(emptyMessage);
                return;
            }

            // Crear grid de desarrolladores
            const grid = document.createElement('div');
            grid.className = 'columns is-multiline is-centered';
            grid.style.marginTop = '20px';

            // Crear tarjetas para cada desarrollador
            for (const [id, developer] of Object.entries(developers)) {
                const card = document.createElement('div');
                card.className = 'column is-one-quarter';
                card.innerHTML = `
                    <div class="card developer-card">
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">${developer.name}</p>
                                    <p class="subtitle is-6">${developer.country}</p>
                                </div>
                            </div>
                            <div class="content">
                                <p><strong>Fundación:</strong> ${developer.foundation_year}</p>
                                <p><strong>Juegos:</strong> ${developer.game_count}</p>
                                <p><strong>Tipo:</strong> ${developer.entity_type || 'No especificado'}</p>
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
            errorMessage.textContent = 'Error al cargar los desarrolladores';
            errorMessage.className = 'has-text-centered has-text-danger';
            container.appendChild(errorMessage);
        }
    };

    // Carga inicial
    await loadDevelopers();

    // 4. Configuración del modal para añadir nuevos desarrolladores
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Añadir Desarrollador</p>
                <button class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <div class="field">
                    <label class="label">Nombre</label>
                    <div class="control">
                        <input id="dev-name" class="input" type="text" placeholder="Nombre del desarrollador">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Año de Fundación</label>
                    <div class="control">
                        <input id="dev-year" class="input" type="number" placeholder="Año de fundación">
                    </div>
                </div>
                <div class="field">
                    <label class="label">País de Origen</label>
                    <div class="control">
                        <input id="dev-country" class="input" type="text" placeholder="País de origen">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Tipo de Entidad</label>
                    <div class="control">
                        <div class="select">
                            <select id="dev-type">
                                <option value="Independiente">Independiente</option>
                                <option value="Estudio">Estudio</option>
                                <option value="AAA">AAA</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Cantidad de Juegos</label>
                    <div class="control">
                        <input id="dev-games" class="input" type="number" placeholder="Cantidad de juegos" value="0">
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button id="submit-dev" class="button is-success">Guardar</button>
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
    document.getElementById('submit-dev').addEventListener('click', async () => {
        const newDeveloper = {
            name: document.getElementById('dev-name').value,
            foundation_year: document.getElementById('dev-year').value,
            origin_country: document.getElementById('dev-country').value,
            entity_type: document.getElementById('dev-type').value,
            game_count: document.getElementById('dev-games').value
        };

        // Validación de campos requeridos
        if (!newDeveloper.name || !newDeveloper.foundation_year || !newDeveloper.origin_country) {
            alert('Por favor complete todos los campos requeridos');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/developers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newDeveloper)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al crear desarrollador');
            }

            // Cerrar modal y actualizar lista
            modal.classList.remove('is-active');
            await loadDevelopers();

            // Resetear formulario
            document.getElementById('dev-name').value = '';
            document.getElementById('dev-year').value = '';
            document.getElementById('dev-country').value = '';
            document.getElementById('dev-games').value = '0';

        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        }
    });
});