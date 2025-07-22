import { loadFranchisesSagas, loadedFranchises, loadedSagas } from './games-page-utils.js';

function updateFranchisesSagasModalValues() {
    // Los agrego al modal de Franquicias y Sagas
    Object.entries(loadedFranchises).forEach(([franchise_id, franchise]) => {
        if (loadedFranchises[franchise_id]) {
            const tempFranchiseContainer = addFranchise(franchise_id);
            Object.entries(loadedSagas).forEach(([saga_id, saga]) => {
                if (franchise_id == saga.id_franchise) {
                    addSaga(tempFranchiseContainer, saga_id);
                }
            });
        }
    });
}

function openFSModal($el) {
    $el.classList.add('is-active');
}

function closeFSModal($el) {
    $el.classList.remove('is-active');

    // Resetear formulario (Franquicias y Sagas) para que después puedan ser agregadas en orden
    document.getElementById('franchises_and_sagas-container').innerHTML = '';

    // Actualizar juegos
    loadGames();
    loadFranchisesSagas();
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

async function fetchDeleteFranchise(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/franchises/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al eliminar franquicia');
        }
        return true;
    } catch (error) {
        console.error('Error:', error);
        alert(`Error: ${error.message}`);
    }
}
function removeFranchise(id, wrapperFS) {
    if (id) {
        document.getElementById('confirm-delete-text').innerHTML = '¿Estás seguro que quieres eliminar ésta entidad?'
        openDeleteModal(async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/sagasbyfranchise/${id}`);
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(errorData.error || 'Error al conseguir personajes por juego');
                }

                const sagas = data;
                let deleted = false;
                // Verificar cantidad de sagas nula
                if (Object.keys(sagas).length !== 0) {
                    document.getElementById('confirm-delete-text').innerHTML = 'Ésta franquicia tiene sagas asignadas, si la eliminas las sagas, sus juegos y sus personajes resultarán eliminados!'
                    openDeleteModal(async () => {
                        if (await fetchDeleteFranchise(id)) {
                            // Eliminar el input que contiene a la franquicia y sus sagas
                            wrapperFS.remove();
                        }
                    });
                } else {
                    if (await fetchDeleteFranchise(id)) {
                        // Eliminar el input que contiene a la franquicia y sus sagas
                        wrapperFS.remove();
                    }

                }

            } catch (error) {
                console.error('Error:', error);
                alert(`Error: ${error.message}`);
            }
        });
    }
}
async function fetchDeleteSaga(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/sagas/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al eliminar franquicia');
        }
        return true;
    } catch (error) {
        console.error('Error:', error);
        alert(`Error: ${error.message}`);
    }
}
function removeSaga(id, wrapperSaga) {
    if (id) {
        document.getElementById('confirm-delete-text').innerHTML = '¿Estás seguro que quieres eliminar ésta entidad?'
        openDeleteModal(async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/gamesbysaga/${id}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Error al conseguir personajes por juego');
                }

                const games = data;
                // Verificar cantidad de juegos nula
                if (Object.keys(games).length !== 0) {
                    document.getElementById('confirm-delete-text').innerHTML = 'Ésta saga tiene juegos asignados, si la eliminas sus juegos y sus personajes resultarán eliminados!'
                    openDeleteModal(async () => {
                        if (await fetchDeleteSaga(id)) {
                            // Eliminar el input que contiene a la saga
                            wrapperSaga.remove();
                        }
                    });
                } else {
                    if (await fetchDeleteSaga(id)) {
                        // Eliminar el input que contiene a la saga
                        wrapperSaga.remove();
                    }
                }


            } catch (error) {
                console.error('Error:', error);
                alert(`Error: ${error.message}`);
            }
        });
    }
}

function addFranchise(id = '') {
    const wrapperFS = document.createElement('div');
    wrapperFS.className = 'franchise_and_saga-container';

    const franchiseWrapper = document.createElement('div');
    franchiseWrapper.className = 'franchise-wrapper is-flex';
    franchiseWrapper.style = "display: flex; align-items: center; gap: 0.5rem;";

    // Elemento input donde se va a escribir el título de la saga
    const inputFranchiseTitle = document.createElement('input');
    inputFranchiseTitle.className = 'input franchise-title';
    inputFranchiseTitle.type = 'text';
    inputFranchiseTitle.placeholder = 'Título de la franquicia';
    inputFranchiseTitle.value = id ? loadedFranchises[id].title : '';
    // Elemento input que indicará el id
    const inputFranchiseId = document.createElement('input');
    inputFranchiseId.className = 'input franchise-id';
    inputFranchiseId.type = 'hidden';
    inputFranchiseId.value = id;

    // Boton para eliminar
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-option', 'button', 'is-small', 'is-danger');
    const spanElement = document.createElement('span');
    spanElement.classList.add('icon', 'is-small');
    const iconElement = document.createElement('i');
    iconElement.classList.add('fa-solid', 'fa-minus');
    spanElement.appendChild(iconElement);
    deleteBtn.appendChild(spanElement);

    // Eliminar la franquicia
    deleteBtn.onclick = (() => {
        removeFranchise(id, wrapperFS);
    });

    franchiseWrapper.appendChild(inputFranchiseId);
    franchiseWrapper.appendChild(inputFranchiseTitle);
    franchiseWrapper.appendChild(deleteBtn);

    const sagasContainer = document.createElement('div');
    sagasContainer.className = 'sagas-container mt-2 ml-4';

    const addSubBtn = document.createElement('button');
    addSubBtn.type = "button";
    addSubBtn.className = 'button is-small is-info is-dark mt-2 mb-4';
    addSubBtn.textContent = 'Agregar saga';
    addSubBtn.onclick = () => addSaga(sagasContainer);

    wrapperFS.appendChild(franchiseWrapper);
    wrapperFS.appendChild(sagasContainer);
    wrapperFS.appendChild(addSubBtn);

    document.getElementById('franchises_and_sagas-container').appendChild(wrapperFS);

    // Devolver el container en el que se guardaran todas las sagas de la franquicia creada
    return sagasContainer;
}

function addSaga(container, id = '') {

    // Wrapper de los elementos relacionados a la saga
    const wrapperSaga = document.createElement('div');
    wrapperSaga.className = 'saga-wrapper is-flex mt-2';

    // Elemento input donde se va a escribir el título de la saga
    const inputSagaTitle = document.createElement('input');
    inputSagaTitle.className = 'input is-small saga-title';
    inputSagaTitle.type = 'text';
    inputSagaTitle.placeholder = 'Título de la saga';
    inputSagaTitle.value = id ? loadedSagas[id].title : '';
    // Elemento input que indicará el id
    const inputSagaId = document.createElement('input');
    inputSagaId.className = 'input saga-id';
    inputSagaId.type = 'hidden';
    inputSagaId.value = id;

    // Boton para eliminar
    const deleteBtn = document.createElement('button');
    deleteBtn.id = 'delete-option';
    deleteBtn.classList.add('button', 'is-small', 'is-danger', 'ml-2');
    const spanElement = document.createElement('span');
    spanElement.classList.add('icon', 'is-small');
    const iconElement = document.createElement('i');
    iconElement.classList.add('fa-solid', 'fa-minus');
    spanElement.appendChild(iconElement)
    deleteBtn.appendChild(spanElement);

    // Eliminar la saga
    deleteBtn.onclick = (() => {
        removeSaga(id, wrapperSaga);
    });

    // Agrego a wrappers y contenedores
    wrapperSaga.appendChild(inputSagaId);
    wrapperSaga.appendChild(inputSagaTitle);
    wrapperSaga.appendChild(deleteBtn);
    container.appendChild(wrapperSaga);
}

document.addEventListener("DOMContentLoaded", async () => {

    await loadFranchisesSagas();
    const franchisesAndSagasModal = document.getElementById('franchises_and_sagas-modal');
    const openModalButton = document.getElementById("manage-franchises_and_sagas-button");

    openModalButton.addEventListener('click', () => {
        updateFranchisesSagasModalValues();
        openFSModal(franchisesAndSagasModal);
    });



    // Manejadores de cierre del modal
    (franchisesAndSagasModal.querySelectorAll('.modal-background, .delete, #cancel-btn') || []).forEach(($close) => {
        $close.addEventListener('click', () => {
            closeFSModal(franchisesAndSagasModal);
        });
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            closeFSModal(franchisesAndSagasModal);
        }
    });




    // Envío del formulario
    franchisesAndSagasModal.querySelector('#submit-btn').addEventListener('click', async () => {
        // Verificar si TODOS los inputs tienen un valor no vacío
        if (!Array.from(document.querySelectorAll('.franchise-title, .saga-title')).every(input => input.value.trim() !== '')) {
            throw new Error('Las franquicias o sagas no pueden tener un valor vacío');
        }

        const inputsFranchisesSagas = document.querySelectorAll('.franchise_and_saga-container');

        for (const $elFranchiseSaga of inputsFranchisesSagas) {
            let franchiseId = $elFranchiseSaga.querySelector('.input.franchise-id').value;
            const franchiseTitle = $elFranchiseSaga.querySelector('.input.franchise-title').value;
            const inputsSagas = $elFranchiseSaga.querySelectorAll('.saga-wrapper');

            try {
                // Si el input de id está vacío significa que es una nueva franquicia que se creó entonces hacer POST
                if (franchiseId === '') {
                    const newFranchise = {
                        title: franchiseTitle
                    };
                    const response = await fetch('http://localhost:3000/api/franchises', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(newFranchise)
                    });
                    const data = await response.json();
                    if (!response.ok) {
                        throw new Error(errorData.error || 'Error al agregar franquicia');
                    }
                    franchiseId = data.id;
                }
                // Si el input de id no está vacío y el título cambió entonces hacer PUT
                else if (loadedFranchises[franchiseId].title !== franchiseTitle) {
                    const updatedFranchise = {
                        title: franchiseTitle
                    };
                    const response = await fetch(`http://localhost:3000/api/franchises/${franchiseId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedFranchise)
                    });
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Error al editar franquicia');
                    }
                }

            } catch (error) {
                console.error('Error:', error);
                alert(`Error: ${error.message}`);
            }

            for (const $elSaga of inputsSagas) {
                const sagaId = $elSaga.querySelector('.input.saga-id').value;
                const sagaTitle = $elSaga.querySelector('.input.saga-title').value;

                // CREATE o UPDATE de saga
                try {
                    // Si el input de id está vacío significa que es una nueva saga que se creó entonces hacer POST
                    if (sagaId === '') {
                        const newSaga = {
                            title: sagaTitle,
                            id_franchise: franchiseId
                        };
                        const response = await fetch('http://localhost:3000/api/sagas', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newSaga)
                        });
                        if (!response.ok) {
                            const errorData = await response.json();
                            throw new Error(errorData.error || 'Error al agregar saga');
                        }
                    }
                    // Si el input de id no está vacío y el título cambió entonces hacer PUT
                    else if (loadedSagas[sagaId].title !== sagaTitle) {
                        const updatedSaga = {
                            title: sagaTitle,
                            id_franchise: franchiseId
                        };
                        const response = await fetch(`http://localhost:3000/api/sagas/${sagaId}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(updatedSaga)
                        });
                        if (!response.ok) {
                            const errorData = await response.json();
                            throw new Error(errorData.error || 'Error al editar saga');
                        }
                    }

                } catch (error) {
                    console.error('Error:', error);
                    alert(`Error: ${error.message}`);
                }
            }
        }
        // Cerrar modal
        closeFSModal(franchisesAndSagasModal);
    });
});