const { Pool } = require('pg');

const dbClient = new Pool({
    user: 'postgres',
    port: 5000,
    host: 'localhost',
    database: 'playle',
    password: 'postgres'
});

async function getAllGames() {
    const result = await dbClient.query(
        'SELECT games.id as games_id, games.title as title, games.release_year as release, games.gamemode as gamemode,' +
        'games.genre as genre, games.perspective as perspective, games.image as img, games.franchise as franchise,' +
        'games.id_developer as id_developer, developers.id as developer_id ,developers.name as developer ' +
        'FROM games JOIN developers ON games.id_developer = developers.id'
    );

    const games = {};

    result.rows.forEach(row => {
        if ([!games[row.games_id]]) {
            games[row.games_id] = {
                nombre: row.title,
                salida: row.release,
                modo: row.gamemode,
                genero: row.genre,
                perspectiva: row.perspective,
                imagen: row.img,
                franquicia: row.franchise,
                desarrollador: row.developer
            }
        }
    });
    return games;
};

async function getOneGame(id) {
    const result = await dbClient.query(
        'SELECT games.id as game_id, games.title as game_title, games.release_year as game_release_year, games.gamemode as game_gamemode,' +
        'games.genre as game_genre, games.perspective as game_perspective, games.image as game_image, games.franchise as game_franchise,' +
        'games.id_developer as game_id_developer, developers.id as developer_id ,developers.name as developer_name ' +
        'FROM games JOIN developers ON games.id_developer = developers.id WHERE games.id = $1 LIMIT 1', [id]
    );

    const games = {};

    result.rows.forEach(row => {
        if ([!games[row.games_id]]) {
            games[row.game_id] = {
                title: row.game_title,
                release_year: row.game_release_year,
                gamemode: row.game_gamemode,
                genre: row.game_genre,
                perspective: row.game_perspective,
                image: row.game_image,
                franchise: row.game_franchise,
                id_developer: row.game_id_developer
            }
        }
    });
    return games;
};

async function createGame(
    title,
    release_year,
    gamemode,
    genre,
    perspective,
    image,
    franchise,
    id_developer
) {
    const result = await dbClient.query(
        'INSERT INTO games(title, release_year, gamemode, genre, perspective, image, franchise, id_developer) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
        [title, release_year, gamemode, genre, perspective, image, franchise, id_developer])
    if (result.rowCount === 0) {
        return undefined
    }
    return result.rows[0]
};

async function deleteGame(id) {
    const result = await dbClient.query(
        'DELETE FROM games WHERE id = $1', [id]
    )
    if (result.rows.rowCount === 0) {
        return undefined
    }
    return id
};

async function updateGame(
    id,
    updated_game_info
) {
    const result = await dbClient.query(
        'UPDATE games'
        +' '+
        'SET title = $1, release_year = $2, gamemode = $3, genre = $4, perspective = $5, image = $6, franchise = $7, id_developer = $8'
        +' '+
        'WHERE id = $9 RETURNING *',
        [updated_game_info.title, updated_game_info.release_year, updated_game_info.gamemode, updated_game_info.genre, updated_game_info.perspective, updated_game_info.image, updated_game_info.franchise, updated_game_info.id_developer, id]
    );
    return result.rows[0];
}

module.exports = {
    getAllGames,
    getOneGame,
    createGame,
    deleteGame,
    updateGame
};