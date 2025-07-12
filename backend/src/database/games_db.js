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
        'INSERT INTO games(title, release_year, gamemode, genre, perspective, image, franchise, id_developer) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
        [new_game_info.title, new_game_info.release_year, new_game_info.gamemode, new_game_info.genre, new_game_info.perspective,
        new_game_info.image, new_game_info.franchise, new_game_info.id_developer])
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
        'SELECT games.id as game_id, games.title as title, games.release_year as release, games.gamemode as gamemode,'
        + ' ' +
        'games.genre as genre, games.perspective as perspective, games.image as image, games.franchise as franchise,'
        + ' ' +
        'games.id_developer as id_developer, developers.id as developer_id ,developers.name as developer'
        + ' ' +
        'FROM games JOIN developers ON games.id_developer = developers.id'
    );

    const games = {};

    result.rows.forEach(row => {
        if ([!games[row.game_id]]) {
            games[row.game_id] = {
                title: row.title,
                release: row.release,
                gamemode: row.gamemode,
                genre: row.genre,
                perspective: row.perspective,
                image: row.image,
                franchise: row.franchise,
                developer: row.developer
            }
        }
    });
    return games;
};
async function getOneGame(id) {
    const result = await dbClient.query(
        'SELECT games.id as game_id, games.title as title, games.release_year as release_year, games.gamemode as gamemode,'
        + ' ' +
        'games.genre as genre, games.perspective as perspective, games.image as image, games.franchise as franchise, games.id_developer as id_developer'
        + ' ' +
        'FROM games WHERE games.id = $1', [id]
    );

    const games = {};

    result.rows.forEach(row => {
        if ([!games[row.game_id]]) {
            games[row.game_id] = {
                title: row.title,
                release_year: row.release_year,
                gamemode: row.gamemode,
                genre: row.genre,
                perspective: row.perspective,
                image: row.image,
                franchise: row.franchise,
                developer: row.id_developer
            }
        }
    });
    return games;
};

async function getGamesByDeveloper(developerId) {
    const result = await dbClient.query(
        'SELECT id, title FROM games WHERE id_developer = $1', 
        [developerId]
    );
    return result.rows;
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
        'SET title = $1, release_year = $2, gamemode = $3, genre = $4, perspective = $5, image = $6, franchise = $7, id_developer = $8'
        + ' ' +
        'WHERE id = $9 RETURNING *',
        [updated_game_info.title, updated_game_info.release_year, updated_game_info.gamemode, updated_game_info.genre, updated_game_info.perspective, updated_game_info.image, updated_game_info.franchise, updated_game_info.id_developer, id]
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