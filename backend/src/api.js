const express = require('express');
var cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

const {
    getAllGames,
    getOneGame,
    createGame,
    deleteGame,
    updateGame
} = require('./database/games_db');

//   ██████╗  █████╗ ███╗   ███╗███████╗███████╗
//  ██╔════╝ ██╔══██╗████╗ ████║██╔════╝██╔════╝
//  ██║  ███╗███████║██╔████╔██║█████╗  ███████╗
//  ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝  ╚════██║
//  ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗███████║
//   ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝

//#region GAMES ENDPOINTS

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//                POST (CREATE)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
/*
curl http://localhost:3000/api/games \
    --request POST \
    --header "Content-Type: application/json" \
    --data '{"title":"Test1", "release_year":"2500", "gamemode":"Test1", "genre":"Test1", "perspective":"Test1", "image":"Test1", "franchise":"Test1", "id_developer":"2"}'
*/
app.post('/api/games', async (req, res) => {
    const new_game_info = {
        title: req.body.title,
        release_year: req.body.release_year,
        gamemode: req.body.gamemode,
        genre: req.body.genre,
        perspective: req.body.perspective,
        image: req.body.image,
        franchise: req.body.franchise,
        id_developer: req.body.id_developer
    };
    for (let data in new_game_info) {
        if (!new_game_info[data])
            return res.status(400).json({ error: "Missing required field" });
    }

    const game = await createGame(new_game_info);

    if (!game) {
        return res.status(500).json({ error: "Error while creating Game" });
    }

    res.json(game);
});

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//                 GET (READ)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
app.get('/api/games', async (req, res) => {
    let games = await getAllGames();
    if (!games) {
        return res.sendStatus(404).json({ error: 'Games not found' });
    }
    res.json(games);
});
app.get('/api/games/:id', async (req, res) => {
    let game = await getOneGame(req.params.id);
    if (!game) {
        return res.sendStatus(404).json({ error: 'Game not found' });
    }
    res.json((game));
});


// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//                PUT (UPDATE)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
/*
curl http://localhost:3000/api/games/5 \
    --request PUT \
    --header "Content-Type: application/json" \
    --data '{"title":"Test1", "release_year":"2500", "gamemode":"Test1", "genre":"Test1", "perspective":"Test1", "image":"Test1", "franchise":"Test1", "id_developer":"2"}'
*/
app.put('/api/games/:id', async (req, res) => {
    let old_game_info = await getOneGame(req.params.id);
    if (!old_game_info) {
        return res.sendStatus(404).json({ error: 'Game not found' });
    }

    const updated_game_info = {
        title: req.body.title,
        release_year: req.body.release_year,
        gamemode: req.body.gamemode,
        genre: req.body.genre,
        perspective: req.body.perspective,
        image: req.body.image,
        franchise: req.body.franchise,
        id_developer: req.body.id_developer
    };
    for (let data in updated_game_info) {
        if (!updated_game_info[data])
            return res.status(400).json({ error: "Missing required field" });
    }

    await updateGame(req.params.id, updated_game_info);

    res.json(req.body);
});

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//               DELETE (DELETE)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
/*
curl http://localhost:3000/api/games/6 \
    --request DELETE
*/
app.delete('/api/games/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ error: "Missing required parameter" });
    }

    let game = await deleteGame(req.params.id)

    if (!game) {
        return res.status(404).json({ error: "Game id: " + req.params.id + " non-existent" });
    }

    res.json(game);
});

//#endregion


const {
    getAllDevelopers,
    getOneDeveloper,
    createDeveloper,
    deleteDeveloper,
    updateDeveloper
} = require('./database/developers_db');

//  ██████╗ ███████╗██╗   ██╗███████╗██╗      ██████╗ ██████╗ ███████╗██████╗ ███████╗
//  ██╔══██╗██╔════╝██║   ██║██╔════╝██║     ██╔═══██╗██╔══██╗██╔════╝██╔══██╗██╔════╝
//  ██║  ██║█████╗  ██║   ██║█████╗  ██║     ██║   ██║██████╔╝█████╗  ██████╔╝███████╗
//  ██║  ██║██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║     ██║   ██║██╔═══╝ ██╔══╝  ██╔══██╗╚════██║
//  ██████╔╝███████╗ ╚████╔╝ ███████╗███████╗╚██████╔╝██║     ███████╗██║  ██║███████║
//  ╚═════╝ ╚══════╝  ╚═══╝  ╚══════╝╚══════╝ ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝

//#region DEVELOPERS ENDPOINTS

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//                POST (CREATE)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
/*
curl http://localhost:3000/api/developers \
    --request POST \
    --header "Content-Type: application/json" \
    --data '{"name":"Test1", "foundation_year":"2500", "game_count":"4", "origin_country":"Test1", "entity_type":"Test1"}'
*/
app.post('/api/developers', async (req, res) => {
    const new_developer_info = {
        name: req.body.name,
        foundation_year: req.body.foundation_year,
        game_count: req.body.game_count,
        origin_country: req.body.origin_country,
        entity_type: req.body.entity_type
    };
    for (let element in new_developer_info) {
        if (!new_developer_info[element])
            return res.status(400).json({ error: "Missing required field" });
    }

    const developer = await createDeveloper(new_developer_info);

    if (!developer) {
        return res.status(500).json({ error: "Error while creating Developer" });
    }

    res.json(developer);
});

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//                 GET (READ)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
app.get('/api/developers', async (req, res) => {
    let developers = await getAllDevelopers();
    if (!developers) {
        return res.sendStatus(404).json({ error: 'Developers not found' });
    }
    res.json(developers);
});
app.get('/api/developers/:id', async (req, res) => {
    let developer = await getOneDeveloper(req.params.id);
    if (!developer) {
        return res.sendStatus(404).json({ error: 'Developer not found' });
    }
    res.json((developer));
});


// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//                PUT (UPDATE)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
/*
curl http://localhost:3000/api/developers/5 \
    --request PUT \
    --header "Content-Type: application/json" \
    --data '{"name":"Test1", "foundation_year":"2500", "game_count":"5", "origin_country":"Test1", "entity_type":"Test1"}'
*/
app.put('/api/developers/:id', async (req, res) => {
    let old_developer_info = await getOneDeveloper(req.params.id);
    if (!old_developer_info) {
        return res.sendStatus(404).json({ error: 'Developer not found' });
    }

    const updated_developer_info = {
        name: req.body.name,
        foundation_year: req.body.foundation_year,
        game_count: req.body.game_count,
        origin_country: req.body.origin_country,
        entity_type: req.body.entity_type
    };
    for (let element in updated_developer_info) {
        if (!updated_developer_info[element])
            return res.status(400).json({ error: "Missing required field" });
    }

    await updateDeveloper(req.params.id, updated_developer_info);

    res.status(200).json({ message: "Updated Succesfully" });
});

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//               DELETE (DELETE)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
/*
curl http://localhost:3000/api/developers/6 \
    --request DELETE
*/
app.delete('/api/developers/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ error: "Missing required parameter" });
    }

    let developer = await deleteDeveloper(req.params.id)

    if (!developer) {
        return res.status(404).json({ error: "Developer id: " + req.params.id + " non-existent" });
    }

    res.status(200).json({ message: "Deleted Succesfully" });
});

//#endregion


const {
    getAllCharacters,
    getOneCharacter,
    createCharacter,
    deleteCharacter,
    updateCharacter
} = require('./database/characters_db');

//   ██████╗██╗  ██╗ █████╗ ██████╗  █████╗  ██████╗████████╗███████╗██████╗ ███████╗
//  ██╔════╝██║  ██║██╔══██╗██╔══██╗██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗██╔════╝
//  ██║     ███████║███████║██████╔╝███████║██║        ██║   █████╗  ██████╔╝███████╗
//  ██║     ██╔══██║██╔══██║██╔══██╗██╔══██║██║        ██║   ██╔══╝  ██╔══██╗╚════██║
//  ╚██████╗██║  ██║██║  ██║██║  ██║██║  ██║╚██████╗   ██║   ███████╗██║  ██║███████║
//   ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚══════╝


//#region CHARACTERS ENDPOINTS

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//                POST (CREATE)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
/*
curl http://localhost:3000/api/characters \
    --request POST \
    --header "Content-Type: application/json" \
    --data '{"character_name":"Test1", "franchise":"2500", "image":"Test1", "gender":"Test1", "species":"Test1", "description":"Test1", "main_skill":"Test1", "id_game":"3"}'
*/
app.post('/api/characters', async (req, res) => {
    const new_character_info = {
        character_name: req.body.character_name,
        franchise: req.body.franchise,
        image: req.body.image,
        gender: req.body.gender,
        species: req.body.species,
        description: req.body.description,
        main_skill: req.body.main_skill,
        id_game: req.body.id_game
    };
    for (let data in new_character_info) {
        if (!new_character_info[data])
            return res.status(400).json({ error: "Missing required field" });
    }

    const character = await createCharacter(new_character_info);

    if (!character) {
        return res.status(500).json({ error: "Error while creating Character" });
    }

    res.json(character);
});

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//                 GET (READ)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
app.get('/api/characters', async (req, res) => {
    let characters = await getAllCharacters();
    if (!characters) {
        return res.sendStatus(404).json({ error: 'Characters not found' });
    }
    res.json(characters);
});
app.get('/api/characters/:id', async (req, res) => {
    let character = await getOneCharacter(req.params.id);
    if (!character) {
        return res.sendStatus(404).json({ error: 'Character not found' });
    }
    res.json((character));
});


// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//                PUT (UPDATE)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
/*
curl http://localhost:3000/api/characters/5 \
    --request PUT \
    --header "Content-Type: application/json" \
    --data '{"character_name":"Test1", "franchise":"2500", "image":"Test1", "gender":"Test1", "species":"Test1", "description":"Test1", "main_skill":"Test1", "id_game":"3"}'
*/
app.put('/api/characters/:id', async (req, res) => {
    let old_character_info = await getOneCharacter(req.params.id);
    if (!old_character_info) {
        return res.sendStatus(404).json({ error: 'Character not found' });
    }

    const updated_character_info = {
        character_name: req.body.character_name,
        franchise: req.body.franchise,
        image: req.body.image,
        gender: req.body.gender,
        species: req.body.species,
        description: req.body.description,
        main_skill: req.body.main_skill,
        id_game: req.body.id_game
    };
    for (let data in updated_character_info) {
        if (!updated_character_info[data])
            return res.status(400).json({ error: "Missing required field" });
    }

    await updateCharacter(req.params.id, updated_character_info);

    res.status(200).json({ message: "Updated Succesfully" });
});

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//               DELETE (DELETE)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
/*
curl http://localhost:3000/api/characters/6 \
    --request DELETE
*/
app.delete('/api/characters/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ error: "Missing required parameter" });
    }

    let character = await deleteCharacter(req.params.id)

    if (!character) {
        return res.status(404).json({ error: "Character id: " + req.params.id + " non-existent" });
    }

    res.status(200).json({ message: "Deleted Succesfully" });
});

//#endregion

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});