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


module.exports = {
    getAllGames
};