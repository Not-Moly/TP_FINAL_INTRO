const { Pool } = require('pg');

const dbClient = new Pool({
    user: 'postgres',
    port: 5000,
    host: 'localhost',
    database: 'playle',
    password: 'postgres'
});

async function getAllCharacters() {
    const result = await dbClient.query(
        'SELECT character.id as character_id, dcharacters.char_name as character_name, characters.franchise as character_franchise,' +
        'characters.image as image, characters.gender as gender, characters.species as species, characters.description as description, characters.main_skill as skill, characters.id_game' +
        'FROM characters'
    );

    const characters = {};

    result.rows.forEach(row => {
        if ([!characters[row.character_id]]) {
            characters[row.character_id] = {
                name: character_name,
                franchise: chraacter_franchise,
                image: image,
                gender: gender,
                species: species,
                description: description,
                skill: skill
            }
        }
    });
    return characters;
};

async function getOneCharacter(id) {
    const result = await dbClient.query(
        'SELECT character.id as character_id, dcharacters.char_name as character_name, characters.franchise as character_franchise,' +
        'characters.image as image, characters.gender as gender, characters.species as species, characters.description as description, characters.main_skill as skill, characters.id_game' +
        'FROM characters WHERE character_id = $1', [id]
    );

    const characters = {};

    result.rows.forEach(row => {
        if ([!characters[row.character_id]]) {
            characters[row.character_id] = {
                name: character_name,
                franchise: chraacter_franchise,
                image: image,
                gender: gender,
                species: species,
                description: description,
                skill: skill
            }
        }
    });
    return characters;
};

async function createCharacter (
    new_character_info
) {
    const result = await dbClient.query(
        'INSERT INTO characters(char_name, franchise, image, gender, species, description, main_skill, id_game VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
        [new_character_info.character_name, new_character_info.franchise, new_character_info.image, new_character_info.gender,
         new_character_info.species, new_character_info.description, new_character_info.main_skill, new_character_info.id_game
        ])
    if (result.rowCount === 0) {
        return undefined
    }
    return result.rows[0]
};

async function deleteCharacter(id) {
    const result = await dbClient.query(
        'DELETE FROM characters WHERE id = $1', [id]
    )
    if (result.rows.rowCount === 0) {
        return undefined
    }
    return id
};

async function updateCharacter(
    id,
    updated_character_info
) {
    const result = await dbClient.query(
        'UPDATE characters'
        +' '+
        'SET character_name = $1,franchise = $2, image = $3, gender = $4, species = $5, description = $6, main_skill = $7, id_game = $8'
        +' '+
        'WHERE id = $9 RETURNING *',
        [new_character_info.character_name, new_character_info.franchise, new_character_info.image, new_character_info.gender,
         new_character_info.species, new_character_info.description, new_character_info.main_skill, new_character_info.id_game, id]
    );
    return result.rows[0];
};

module.exports = {
    getAllCharacters,
    getOneCharacter,
    createCharacter,
    deleteCharacter,
    updateCharacter
};