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
async function createCharacter(
    new_character_info
) {
    const result = await dbClient.query(
        'INSERT INTO characters(character_name, image, gender, species, description, main_skill, id_game) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
        [new_character_info.character_name, new_character_info.image, new_character_info.gender,
        new_character_info.species, new_character_info.description, new_character_info.main_skill, new_character_info.id_game])
    if (result.rowCount === 0) {
        return undefined
    }
    return result.rows[0]
};

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//                 GET (READ)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
async function getAllCharacters() {
    const result = await dbClient.query(
        'SELECT characters.id as character_id, characters.character_name as character_name,'
        + ' ' +
        'characters.image as image, characters.gender as gender, characters.species as species, characters.description as description, characters.main_skill as skill, characters.id_game as id_game'
        + ' ' +
        'FROM characters'
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
                id_game: row.id_game
            }
        }
    });
    return characters;
};
async function getOneCharacter(id) {
    const result = await dbClient.query(
        'SELECT characters.id as character_id, characters.character_name as character_name,'
        + ' ' +
        'characters.image as image, characters.gender as gender, characters.species as species, characters.description as description, characters.main_skill as skill, characters.id_game'
        + ' ' +
        'FROM characters WHERE characters.id = $1', [id]
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
                id_game: row.id_game
            }
        }
    });
    return characters;
};

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
        'SET character_name = $1, image = $2, gender = $3, species = $4, description = $5, main_skill = $6, id_game = $7'
        + ' ' +
        'WHERE id = $8 RETURNING *',
        [updated_character_info.character_name, updated_character_info.image, updated_character_info.gender,
        updated_character_info.species, updated_character_info.description, updated_character_info.main_skill, updated_character_info.id_game, id]
    );
    return result.rows[0];
};

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//               DELETE (DELETE)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
async function deleteCharacter(id) {
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
    createCharacter,
    deleteCharacter,
    updateCharacter
};