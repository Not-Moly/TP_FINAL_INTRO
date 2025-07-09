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
    deleteGame
} = require('./database/playle');

// 5 Endpoints per entity!!

//#region GAMES

//GET________________________________________________________
// Get ALL data from 'games' table
app.get('/api/games', async (req, res) => {
    let games = await getAllGames();
    if (!games) {
        return res.sendStatus(404).json({ error: 'Games not found' });
    }
    res.json(games);

});
// ONE from 'games' table by id
app.get('/api/games/:id', async (req, res) => {
    // let game = games[req.params.num];
    let game = await getOneGame(req.params.id);
    if (!game) {
        return res.sendStatus(404).json({ error: 'Game not found' });
    }
    res.json((game));
});

//POST________________________________________________________
/*
curl http://localhost:3000/api/games \
    --request POST \
    --header "Content-Type: application/json" \
    --data '{"title":"Test1", "release_year":"2500", "gamemode":"Test1", "genre":"Test1", "perspective":"Test1", "image":"Test1", "franchise":"Test1", "id_developer":"2"}'
*/
app.post('/api/games', async (req, res) => {

    if (!req.body.title) {
        return res.status(400).json({ error: "Missing required field" });
    }


    const game = await createGame(
        req.body.title,
        req.body.release_year,
        req.body.gamemode,
        req.body.genre,
        req.body.perspective,
        req.body.image,
        req.body.franchise,
        req.body.id_developer
    );

    if(!game){
        return res.status(500).json({error: "Error while creating Game"});
    }

    res.json(game);
});

//DELETE________________________________________________________
/*
curl http://localhost:3000/api/games/6 \
    --request DELETE
*/
app.delete('/api/games/:id', async (req, res) => {
    if(!req.params.id){
        return res.status(400).json({error:"Missing required parameter"});
    }

    let game = await deleteGame(req.params.id)

    if(!game){
        return res.status(404).json({error:"Game id: " + req.params.id + " non-existent"});
    }

    res.json(game);
});

//PUT________________________________________________________
app.put('api/games', (req, res) => {

});

//#endregion

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});