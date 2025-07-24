const { Pool } = require('pg');

const dbClient = new Pool({
  host: process.env.DB_HOST || 'postgres',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'playle',
});

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//                POST (CREATE)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
async function createCharacter(
    new_character_info
) {
    const charResult = await dbClient.query(
        'INSERT INTO characters(character_name, image, gender, species, description, main_skill) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
        [new_character_info.character_name, new_character_info.image, new_character_info.gender,
        new_character_info.species, new_character_info.description, new_character_info.main_skill])
    if (charResult.rowCount === 0) {
        return undefined
    }

    const charId = charResult.rows[0].id;

    if (new_character_info.games_ids && new_character_info.games_ids.length > 0) {
        for (const gameId of new_character_info.games_ids) {
            await dbClient.query(
                'INSERT INTO game_characters(id_character, id_game) VALUES ($1, $2)',
                [charId, gameId]
            );
        }
        return charId
    };
}

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//                 GET (READ)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
async function getAllCharacters() {
    const result = await dbClient.query(
        'SELECT c.id as character_id, c.character_name as character_name,'
        + ' ' +
        'c.image as image, c.gender as gender, c.species as species,'
        + ' ' +
        'c.description as description, c.main_skill as skill,'
        + ' ' +
        'array_agg(cg.id_game) as game_ids'
        + ' ' +
        'FROM characters c'
        + ' ' +
        'LEFT JOIN game_characters cg ON c.id = cg.id_character'
        + ' ' +
        'GROUP BY c.id'
    );

    const characters = {};

    result.rows.forEach(row => {
        if (!characters[row.character_id]) {
            characters[row.character_id] = {
                name: row.character_name,
                image: row.image,
                gender: row.gender,
                species: row.species,
                description: row.description,
                skill: row.skill,
                games: row.game_ids.filter(id => id !== null)
            }
        }
    });
    return characters;
};
async function getOneCharacter(id) {
    const result = await dbClient.query(
        'SELECT c.id as character_id, c.character_name as character_name,'
        + ' ' +
        'c.image as image, c.gender as gender, c.species as species,'
        + ' ' +
        'c.description as description, c.main_skill as skill,'
        + ' ' +
        'array_agg(cg.id_game) as game_ids'
        + ' ' +
        'FROM characters c'
        + ' ' +
        'LEFT JOIN game_characters cg ON c.id = cg.id_character'
        + ' ' +
        'WHERE c.id = $1 GROUP BY c.id ', [id]
    );

    const characters = {};

    result.rows.forEach(row => {
        if (!characters[row.character_id]) {
            characters[row.character_id] = {
                name: row.character_name,
                image: row.image,
                gender: row.gender,
                species: row.species,
                description: row.description,
                skill: row.skill,
                games: row.game_ids.filter(id => id !== null)
            }
        }
    });
    return characters;
};

async function getCharactersByGame(gameId) {
    const result = await dbClient.query(
        'SELECT c.id as char_id, c.character_name as character_name'
        + ' ' +
        'FROM characters c JOIN game_characters cg ON c.id = cg.id_character'
        + ' ' +
        'WHERE cg.id_game = $1',
        [gameId]
    );

    const characters = {};

    result.rows.forEach(row => {
        if (!characters[row.char_id]) {
            characters[row.char_id] = {
                id: row.char_id,
                name: row.character_name
            }
        }
    });

    return characters;
}


// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//                PUT (UPDATE)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
async function updateCharacter(
    id,
    updated_character_info
) {
    const result = await dbClient.query(
        'UPDATE characters'
        + ' ' +
        'SET character_name = $1, image = $2, gender = $3,'
        + ' ' +
        'species = $4, description = $5, main_skill = $6'
        + ' ' +
        'WHERE id = $7',
        [updated_character_info.character_name, updated_character_info.image, updated_character_info.gender,
        updated_character_info.species, updated_character_info.description, updated_character_info.main_skill, id]
    );

    await dbClient.query(
        'DELETE FROM game_characters WHERE id_character = $1',
        [id]
    );

    if (updated_character_info.games_ids && updated_character_info.games_ids.length > 0) {
        for (const gameId of updated_character_info.games_ids) {
            await dbClient.query(
                'INSERT INTO game_characters (id_character, id_game) VALUES ($1, $2)',
                [id, gameId]
            );
        }
    };

    return result.rows[0];
};

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//               DELETE (DELETE)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
async function deleteCharacter(id) {

    await dbClient.query(
        'DELETE FROM game_characters WHERE id_character = $1',
        [id]
    );

    const result = await dbClient.query(
        'DELETE FROM characters WHERE id = $1', [id]
    )
    if (result.rows.rowCount === 0) {
        return undefined
    }
    return id
};


module.exports = {
    getAllCharacters,
    getOneCharacter,
    getCharactersByGame,
    createCharacter,
    deleteCharacter,
    updateCharacter
};