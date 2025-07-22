import {devTypes} from './datasets.js';

async function createDeveloperModal() {

    const modal = document.querySelector('.modal');
    const devTypeSelectInput = modal.querySelector('#dev-type');
    if(devTypeSelectInput){
        devTypes.forEach((type) => {
            const typeSelectOption = document.createElement('option');
            typeSelectOption.value = type;
            typeSelectOption.innerHTML = type;
            devTypeSelectInput.appendChild(typeSelectOption);
        });
    }
    return modal;
}

function openModal($el, mode) {
    $el.classList.add('is-active');
    // Editar texto identificador de modal y visibilidad de botón borrar
    if (mode === 'edit') {
        document.querySelector('.modal-card-title').innerHTML = `Editar Desarrollador`;
        document.getElementById('submit-btn').innerHTML = `Guardar cambios`;
        document.getElementById('delete-btn').style.display = 'inline-flex';
    } else if (mode === 'add') {
        document.querySelector('.modal-card-title').innerHTML = `Añadir Desarrollador`;
        document.getElementById('submit-btn').innerHTML = `Añadir`;
        document.getElementById('delete-btn').style.display = 'none';
    }
}

function closeModal($el) {
    $el.classList.remove('is-active');

    // Resetear formulario
    const inputs = document.getElementById('dev-form').querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });

    // Actualizar lista
    loadDevelopers();
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

let loadDevelopers;

document.addEventListener("DOMContentLoaded", async () => {

    // Creo modal para la edición de datos de desarrolladores
    // Lo llamo al principio para tener la referencia al elemento y poder agregarlo a la función de abrir modal al clickear en un desarrollador
    const modal = await createDeveloperModal();

    // Conseguir contenedor de las entidades
    const container = document.querySelector('.entities-container');

    // Función para cargar y mostrar desarrolladores
    loadDevelopers = async () => {
        try {
            // Conseguir conexión con la base de datos de los desarrolladores
            const response = await fetch('http://localhost:3000/api/developers');
            if (!response.ok) throw new Error('Error al cargar desarrolladores');

            const developers = await response.json();

            // Limpiar contenido existente (si lo hay)
            const oldGrid = document.querySelector('.columns.is-multiline');
            if (oldGrid) oldGrid.remove();

            // Verificar cantidad de desarrolladores nula
            document.getElementById('no-devs').style = Object.keys(developers).length === 0 ? 'display: block;' : 'display: none;';

            if (Object.keys(developers).length !== 0) {
                // Crear grid de desarrolladores
                const grid = document.createElement('div');
                grid.className = 'columns is-multiline is-centered';
                grid.style.marginTop = '20px';
                grid.style.marginInline = '10px';

                // Crear tarjetas para cada personaje y agregar al grid
                for (const [id, developer] of Object.entries(developers)) {
                    const card = document.createElement('div');
                    card.className = 'column is-one-quarter';
                    card.innerHTML = `
                    <div class="card entity-card">
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
                    // Añadir funcionalidad click
                    card.addEventListener('click', () => {
                        // Colocar valores de personaje seleccionado en inputs
                        document.getElementById('developer-id').value = id;
                        document.getElementById('dev-name').value = developer.name;
                        document.getElementById('dev-foundation').value = developer.foundation_year;
                        document.getElementById('dev-count').value = developer.game_count;
                        document.getElementById('dev-country').value = developer.country
                        document.getElementById('dev-type').value = developer.entity_type;

                        openModal(modal, 'edit');
                    })
                    grid.appendChild(card);
                }
                container.appendChild(grid);
            }




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
        const newDeveloper = {
            name: document.getElementById('dev-name').value,
            foundation_year: document.getElementById('dev-foundation').value,
            game_count: document.getElementById('dev-count').value,
            origin_country: document.getElementById('dev-country').value,
            entity_type: document.getElementById('dev-type').value
        };

        // Validación de campos requeridos
        if (!Object.values(newDeveloper).every(value => value !== null && value !== undefined && value !== '')) {
            alert('Por favor complete todos los campos requeridos');
            return;
        }

        try {
            const developer_id = document.getElementById('developer-id').value;
            if (!developer_id) {
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
            } else {
                const response = await fetch(`http://localhost:3000/api/developers/${developer_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newDeveloper)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Error al editar el desarrollador');
                }
            }

            // Cerrar modal
            closeModal(modal);
            // Actualizar lista
            await loadDevelopers();
        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        }
    });

    // Eliminar desarrollador
    async function fetchDeleteDeveloper(id) {
        try {
            // Eliminar desarrollador (lo que debería activar la eliminación en cascada)
            const response = await fetch(`http://localhost:3000/api/developers/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al eliminar desarrollador');
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
            const developer_id = document.getElementById('developer-id').value;
            try {

                const response = await fetch(`http://localhost:3000/api/gamesbydeveloper/${developer_id}`);
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(errorData.error || 'Error al conseguir juegos por desarrollador');
                }

                const games = data;

                // Verificar cantidad de juegos nula
                if (Object.keys(games).length !== 0) {
                    document.getElementById('confirm-delete-text').innerHTML = 'Éstos desarrolladores tiene juegos asignados, si los eliminas los juegos y sus personajes también resultarán eliminados!'
                    openDeleteModal(async () => {
                        if (await fetchDeleteDeveloper(developer_id)) {
                            // Cerrar modal
                            closeModal(modal);
                        }
                    });
                } else {
                    if (await fetchDeleteDeveloper(developer_id)) {
                        // Cerrar modal
                        closeModal(modal);
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                alert(`Error: ${error.message}`);
            }
        });
    });
});