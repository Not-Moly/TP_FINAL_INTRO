const {Pool} = require('pg');

const dbClient = new Pool ({
    user: 'postgres',
    port: 5000,
    host: 'localhost',
    database: 'playle',
    password: 'postgres'
});

async function getAllGames() {
    const result = await dbClient.query('SELECT * FROM games');
    return result.rows;
};

async function getOneGame(id){
    const result = await dbClient.query('SELECT * FROM games WHERE id = $1 LIMIT 1', [id]);
    return result.rows[0];
}

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
        'INSERT INTO games(title, release_year, gamemode, genre, perspective, image, franchise, id_developer) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)'
    )
    [title, release_year, gamemode, genre, perspective, image, franchise, id_developer]
    return result
}

module.exports = {
    getAllGames,
    getOneGame,
    createGame
};