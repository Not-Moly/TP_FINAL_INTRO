const { Pool } = require('pg');

const dbClient = new Pool({
    user: 'postgres',
    port: 5000,
    host: 'localhost',
    database: 'playle',
    password: 'postgres'
});

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//                POST (CREATE)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
async function createGame(
    new_game_info
) {
    const result = await dbClient.query(
        'INSERT INTO games(title, release_year, gamemode, genre, perspective, image, id_franchise, id_saga, id_developer) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',
        [new_game_info.title, new_game_info.release_year, new_game_info.gamemode, new_game_info.genre, new_game_info.perspective,
        new_game_info.image, new_game_info.id_franchise, new_game_info.id_saga , new_game_info.id_developer])
    if (result.rowCount === 0) {
        return undefined
    }
    return result.rows[0]
};

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//                 GET (READ)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
async function getAllGames() {
    const result = await dbClient.query(
        'SELECT games.id as game_id, games.title as title, games.release_year as release_year, games.gamemode as gamemode,'
        + ' ' +
        'games.genre as genre, games.perspective as perspective, games.image as image,'
        + ' ' +
        'games.id_franchise as id_franchise, games.id_saga as id_saga, games.id_developer as id_developer'
        + ' ' +
        'FROM games'
    );

    const games = {};

    result.rows.forEach(row => {
        if (!games[row.game_id]) {
            games[row.game_id] = {
                title: row.title,
                release_year: row.release_year,
                gamemode: row.gamemode,
                genre: row.genre,
                perspective: row.perspective,
                image: row.image,
                id_franchise: row.id_franchise,
                id_saga: row.id_saga,
                id_developer: row.id_developer
            }
        }
    });
    return games;
};
async function getOneGame(id) {
    const result = await dbClient.query(
        'SELECT games.id as game_id, games.title as title, games.release_year as release_year, games.gamemode as gamemode,'
        + ' ' +
        'games.genre as genre, games.perspective as perspective, games.image as image,'
        + ' ' +
        'games.id_franchise as id_franchise, games.id_saga as id_saga, games.id_developer as id_developer'
        + ' ' +
        'FROM games WHERE games.id = $1', [id]
    );

    const game = {};

    result.rows.forEach(row => {
        if (!game[row.game_id]) {
            game[row.game_id] = {
                title: row.title,
                release_year: row.release_year,
                gamemode: row.gamemode,
                genre: row.genre,
                perspective: row.perspective,
                image: row.image,
                id_franchise: row.id_franchise,
                id_saga: row.id_saga,
                id_developer: row.id_developer
            }
        }
    });
    return game;
};

async function getGamesByDeveloper(developerId) {
    const result = await dbClient.query(
        'SELECT games.id as game_id, games.title as title FROM games WHERE games.id_developer = $1', 
        [developerId]
    );
    
    const games = {};

    result.rows.forEach(row => {
        if (!games[row.game_id]) {
            games[row.game_id] = {
                id: row.game_id,
                title: row.title
            }
        }
    });

    return games;
}



// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//                PUT (UPDATE)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
async function updateGame(
    id,
    updated_game_info
) {
    const result = await dbClient.query(
        'UPDATE games'
        + ' ' +
        'SET title = $1, release_year = $2, gamemode = $3, genre = $4, perspective = $5, image = $6, id_franchise = $7, id_saga = $8, id_developer = $9'
        + ' ' +
        'WHERE id = $10 RETURNING *',
        [updated_game_info.title, updated_game_info.release_year, updated_game_info.gamemode, updated_game_info.genre, updated_game_info.perspective, updated_game_info.image, updated_game_info.id_franchise, updated_game_info.id_saga, updated_game_info.id_developer, id]
    );
    return result.rows[0];
};

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//               DELETE (DELETE)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
async function deleteGame(id) {
    const result = await dbClient.query(
        'DELETE FROM games WHERE id = $1', [id]
    )
    if (result.rows.rowCount === 0) {
        return undefined
    }
    return id
};

module.exports = {
    getAllGames,
    getOneGame,
    getGamesByDeveloper,
    createGame,
    deleteGame,
    updateGame
};