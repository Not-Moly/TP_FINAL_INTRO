import { loadAllDevelopers, loadAllGames, loadAllCharGame, gamesList, devsList, game_charList } from "./database_loads.js";

// Variables del juego
let randomId = null;
let targetGame = null;
let targetDev = null;
let targetChar = null;
let attemptsLeft = 6;
let usedHints = [];
let availableHints = [];
let usedGames = [];

function openModal($el, mode) {
    $el.classList.add('is-active');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-game-image');
    const modalGameTitle = document.getElementById('modal-game-title');
    const modalGameYear = document.getElementById('modal-game-year');
    const modalGameGenre = document.getElementById('modal-game-genre');
    const modalGameDeveloper = document.getElementById('modal-game-developer');

    if (mode === 'win') {
        modalTitle.textContent = '¡Has ganado!';
        modalTitle.style.color = '#48c774';
    } else if (mode === 'lose') {
        modalTitle.textContent = '¡Has perdido!';
        modalTitle.style.color = '#f14668';
    }

    modalImage.src = targetGame.image || 'https://via.placeholder.com/300';
    modalGameTitle.textContent = targetGame.title;
    modalGameYear.textContent = `Año: ${targetGame.release_year}`;
    modalGameGenre.textContent = `Género: ${targetGame.genre}`;

    fetch(`http://localhost:3000/api/developers/${targetGame.id_developer}`)
        .then(response => response.json())
        .then(dev => {
            modalGameDeveloper.textContent = `Desarrollador: ${Object.values(dev)[0].name}`;
        });
}

function closeModal($el) {
    $el.classList.remove('is-active');
}

function setupModalListeners() {
    document.getElementById('close-modal').addEventListener('click', () => {
        closeModal(document.getElementById('end-game'));
    });

    // Añadimos clases CSS para separar los botones
    const playAgainBtn = document.getElementById('play-again');
    const goHomeBtn = document.getElementById('go-home');

    playAgainBtn.classList.add('modal-button');
    goHomeBtn.classList.add('modal-button');

    playAgainBtn.addEventListener('click', () => {
        closeModal(document.getElementById('end-game'));
        resetGame();
    });

    goHomeBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

function resetGame() {
    attemptsLeft = 6;
    document.getElementById('attempts').textContent = attemptsLeft;
    document.getElementById('game-search').value = '';
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('hints-list').innerHTML = '';
    document.getElementById('guessed-game').style.display = 'none';

    selectRandomData();
    loadAllCharGame(randomId).then(selectRandomChar);
}

// Seleccionar un juego aleatorio como objetivo
function selectRandomData() {
    const gameIds = Object.keys(gamesList);
    randomId = gameIds[Math.floor(Math.random() * gameIds.length)];
    targetGame = gamesList[randomId];
    targetDev = devsList[targetGame.id_developer];
}

function selectRandomChar() {
    if (Object.keys(game_charList).length === 0) {
        usedHints = [];
        updateHints();
    } else {
        const charIds = Object.keys(game_charList);
        const randomCharId = charIds[Math.floor(Math.random() * charIds.length)];
        targetChar = game_charList[randomCharId];
        // Inicializar pistas
        usedHints = [];
        updateHints();
    }
}

// Actualizar las pistas mostradas
function updateHints() {
    const hintsList = document.getElementById('hints-list');
    hintsList.innerHTML = '';

    // Pista básica (siempre visible)
    addHintItem(`Año de lanzamiento: ${targetGame.release_year}`);
    usedHints.push('year');

    // Otras pistas posibles
    if (Object.keys(game_charList).length === 0) {
        availableHints = [
            { key: 'genre', text: `Género: ${targetGame.genre}` },
            { key: 'perspective', text: `Perspectiva: ${targetGame.perspective}` },
            { key: 'gamemode', text: `Modo de juego: ${targetGame.gamemode}` },
            { key: 'developer', text: `Desarrolador: ${targetDev.name}` },
            { key: 'developer_type', text: `El tipo de entidad del desarrollador: ${targetDev.entity_type}` },
            { key: 'developer_country', text: `Los desarrolladores son de: ${targetDev.country}` }
        ];
    } else {
        availableHints = [
            { key: 'genre', text: `Género: ${targetGame.genre}` },
            { key: 'perspective', text: `Perspectiva: ${targetGame.perspective}` },
            { key: 'gamemode', text: `Modo de juego: ${targetGame.gamemode}` },
            { key: 'developer', text: `Desarrolador: ${targetDev.name}` },
            { key: 'character', text: `Un personaje del juego es: ${targetChar.name}` },
            { key: 'developer_country', text: `Los desarrolladores son de: ${targetDev.country}` }
        ];
    }

    // Mostrar una pista adicional cada 2 intentos fallidos
    const hintsToShow = 1 + Math.floor((6 - attemptsLeft));

    availableHints.slice(0, hintsToShow).forEach(hint => {
        if (!usedHints.includes(hint.key)) {
            addHintItem(hint.text);
        }
    });
}

function addHintItem(text) {
    const li = document.createElement('li');
    li.textContent = text;
    document.getElementById('hints-list').appendChild(li);
}

// Buscar juegos que coincidan con el input
function searchGames(query) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    if (!query) {
        resultsContainer.style.display = 'none';
        return;
    }

    const matchingGames = Object.entries(gamesList)
        .filter(([id, game]) =>
            game.title.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5); // Limitar a 5 resultados

    if (matchingGames.length > 0) {
        matchingGames.forEach(([id, game]) => {
            const div = document.createElement('div');
            div.className = 'search-result-item';
            div.textContent = game.title;
            div.onclick = () => selectGame(id, game.title);
            resultsContainer.appendChild(div);
        });
        resultsContainer.style.display = 'block';
    } else {
        resultsContainer.style.display = 'none';
    }
}

// Seleccionar un juego de los resultados
function selectGame(id, title) {
    document.getElementById('game-search').value = title;
    document.getElementById('search-results').style.display = 'none';
}

// Verificar el intento del jugador
async function checkAttempt() {
    const input = document.getElementById('game-search').value.trim();
    if (!input) return;

    // Buscar el juego exacto
    const foundGame = Object.values(gamesList).find(
        game => game.title.toLowerCase() === input.toLowerCase()
    );

    if (!foundGame) {
        showResult('Juego no encontrado', 'is-warning');
    } else if (usedGames.includes(foundGame)) {
        showResult('Este juego ya fue ingresado', 'is-warning');
    } else {
        usedGames.push(foundGame);

        showGuessedGame(foundGame);

        attemptsLeft--;
        document.getElementById('attempts').textContent = attemptsLeft;

        if (foundGame.title === targetGame.title) {
            // Jugador acertó
            openModal(document.getElementById('end-game'), 'win');
        } else {
            // Jugador falló
            showResult('Incorrecto. Sigue intentando', 'is-danger');
            updateHints();

            if (attemptsLeft <= 0) {
                openModal(document.getElementById('end-game'), 'lose');
            }
        }
    }

    document.getElementById('game-search').value = '';
}


function showResult(message, type) {
    const resultContainer = document.getElementById('result-container');
    const resultMessage = document.getElementById('result-message');

    resultMessage.textContent = message;
    resultMessage.className = `notification ${type}`;
    resultContainer.style.display = 'block';
}

function showGuessedGame(game) {
    const container = document.getElementById('guessed-games');
    const card = document.createElement('div');
    card.className = 'box has-background-dark';
    card.innerHTML = `
        <article class="media">
            <div class="media-left">
                <figure class="image is-128x128">
                    <img class="guessed-image" alt="Game image">
                </figure>
            </div>
            <div class="media-content">
                <div class="content">
                    <p>
                        <strong class="guessed-title"></strong>
                        <br>
                        <small class="guessed-year"></small>
                        <br>
                        <span class="guessed-genre"></span>
                        <br>
                        <span class="guessed-developer"></span>
                    </p>
                </div>
            </div>
        </article>
    `
    card.querySelector('.guessed-title').textContent = game.title;
    card.querySelector('.guessed-year').textContent = `Año: ${game.release_year}`;
    card.querySelector('.guessed-genre').textContent = `Género: ${game.genre}`;
    card.querySelector('.guessed-image').src = game.image || 'https://via.placeholder.com/300';
    card.querySelector('.guessed-developer').textContent = `Desarrollador: ${targetDev.name}`;
    //card.querySelector('.guessed-game').style.display = 'block';

    container.appendChild(card);
}

// Event listeners
document.addEventListener('DOMContentLoaded', async () => {
    await loadAllGames();
    await loadAllDevelopers();
    selectRandomData();
    await loadAllCharGame(randomId);
    selectRandomChar();

    setupModalListeners();

    document.getElementById('game-search').addEventListener('input', (e) => {
        searchGames(e.target.value);
    });

    document.getElementById('search-button').addEventListener('click', checkAttempt);

    document.getElementById('game-search').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkAttempt();
        }
    });

    // Cerrar resultados al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.control.is-expanded')) {
            document.getElementById('search-results').style.display = 'none';
        }
    });
});