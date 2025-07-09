const {Pool} = require('pg');

const dbClient = new Pool ({
    user: 'postgres',
    port: 5000,
    host: 'localhost',
    database: 'playle',
    password: 'postgres'
});

async function getAllGames() {
    const result = await dbClient.query(
        'SELECT games.id as games_id, games.title as title, games.release_year as release, games.gamemode as gamemode,'+
        'games.genre as genre, games.perspective as perspective, games.image as img, games.franchise as franchise,'+
        'games.id_developer as id_developer, developers.id as developer_id ,developers.name as developer '+
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

async function getOneGame(id){
    const result = await dbClient.query(
        'SELECT games.id as games_id, games.title as title, games.release_year as release, games.gamemode as gamemode,'+
        'games.genre as genre, games.perspective as perspective, games.image as img, games.franchise as franchise,'+
        'games.id_developer as id_developer, developers.id as developer_id ,developers.name as developer '+
        'FROM games JOIN developers ON games.id_developer = developers.id WHERE games.id = $1 LIMIT 1', [id] 
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

async function createGame(
    title,
    release_year,
    gamemode,
    genre,
    perspective,
    image,
    franchise,
    id_developer
){
    const result = await dbClient.query(
        'INSERT INTO games(title, release_year, gamemode, genre, perspective, image, franchise, id_developer) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
        [title, release_year, gamemode, genre, perspective, image, franchise, id_developer])
    if (result.rowCount === 0) {
        return undefined
    }
    return result.rows[0]
};

async function deleteGame(id){
    const result = await dbClient.query(
        'DELETE FROM games WHERE id = $1',[id]
    )
    if(result.rows.rowCount === 0){
        return undefined
    }
    return id
};

module.exports = {
    getAllGames,
    getOneGame,
    createGame,
    deleteGame
};