export let gamesList = {};
export let devsList = {};
export let charsList = {};
export let game_charList = {};

export async function loadAllGames() {
    try {
        const gameResponse = await fetch('http://localhost:3000/api/games');
        if (!gameResponse.ok) throw new Error('Error al cargar juegos');
        gamesList = await gameResponse.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function loadAllDevelopers() {
    try {
        const devResponse = await fetch('http://localhost:3000/api/developers');
        if(!devResponse.ok) throw new Error('Error al cargar desarrolladores');
        devsList = await devResponse.json();
    } catch (error) {
        console.error('Error', error);
    }
}

export async function loadAllCharacters() {
    try {
        const charResponse = await fetch('http://localhost:3000/api/characters');
        if(!charResponse.ok) throw new Error('Error al cargar personajes');
        charsList = await charResponse.json();
    } catch (error) {
        console.error('Error', error);
    }
}

export async function loadAllCharGame(gameId) {
    try {
        const game_charResponse = await fetch(`http://localhost:3000/api/charactersbygame/${gameId}`);
        if(!game_charResponse.ok) throw new Error('Error al cargar los personajes de un juego');
        game_charList = await game_charResponse.json();
    } catch (error) {
        console.error('Error', error);
    }
}