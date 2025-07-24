import { loadAllDevelopers, loadAllGames, loadAllCharGame, gamesList, devsList, game_charList } from "./database_loads.js";

// Variables del juego

let randomId = null;
let targetGame = null;
let targetDev = null;
let targetChar = null;
let attemptsLeft = 6;
let usedHints = [];

// Seleccionar un juego aleatorio como objetivo
function selectRandomData() {
    const gameIds = Object.keys(gamesList);
    randomId = gameIds[Math.floor(Math.random() * gameIds.length)];
    targetGame = gamesList[randomId];

    targetDev = devsList[targetGame.id_developer];
}

function selectRandomChar() {
    const charIds = Object.keys(game_charList);
    const randomCharId = charIds[Math.floor(Math.random() * charIds.length)];
    targetChar = game_charList[randomCharId];
    console.log(targetChar);
     // Inicializar pistas
    usedHints = [];
    updateHints();
}

// Actualizar las pistas mostradas
function updateHints() {
    const hintsList = document.getElementById('hints-list');
    hintsList.innerHTML = '';

    // Pista básica (siempre visible)
    addHintItem(`Año de lanzamiento: ${targetGame.release_year}`);
    usedHints.push('year');

    // Otras pistas posibles
    const availableHints = [
        { key: 'genre', text: `Género: ${targetGame.genre}` },
        { key: 'perspective', text: `Perspectiva: ${targetGame.perspective}` },
        { key: 'gamemode', text: `Modo de juego: ${targetGame.gamemode}` },
        { key: 'developer', text: `Desarrolador: ${targetDev.name}`},
        { key: 'character', text: `Un personaje del juego es: ${targetChar.name}`},
        { key: 'developer_country', text: `Los desarrolladores son de: ${targetDev.country}`}
    ];

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
        return;
    }

    attemptsLeft--;
    document.getElementById('attempts').textContent = attemptsLeft;

    if (foundGame.title === targetGame.title) {
        // Jugador acertó
        showGuessedGame(foundGame);
        showResult('¡Correcto! Has adivinado el juego', 'is-success');
    } else {
        // Jugador falló
        showResult('Incorrecto. Sigue intentando', 'is-danger');
        updateHints();

        if (attemptsLeft <= 0) {
            showResult(`¡Se acabaron los intentos! El juego era: ${targetGame.title}`, 'is-danger');
            showGuessedGame(targetGame);
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
    document.getElementById('guessed-title').textContent = game.title;
    document.getElementById('guessed-year').textContent = `Año: ${game.release_year}`;
    document.getElementById('guessed-genre').textContent = `Género: ${game.genre}`;
    document.getElementById('guessed-image').src = game.image || 'https://via.placeholder.com/300';

    // Obtener nombre del desarrollador
    fetch(`http://localhost:3000/api/developers/${game.id_developer}`)
        .then(gameResponse => gameResponse.json())
        .then(dev => {
            document.getElementById('guessed-developer').textContent = `Desarrollador: ${Object.values(dev)[0].name}`;
        });

    document.getElementById('guessed-game').style.display = 'block';
}

// Event listeners
document.addEventListener('DOMContentLoaded', async () => {
    await loadAllGames();
    await loadAllDevelopers();
    selectRandomData();
    await loadAllCharGame(randomId);
    selectRandomChar();

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