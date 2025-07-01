const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const {
    getAllGames,
} = require('./database/playle');

// 5 Endpoints per entity!!

//#region GAMES

//GET________________________________________________________
// ONE from 'games' table by id
app.get('api/games/:id',(req,res)=>{
    // let game = games[req.params.num];
    res.json({status: 'OK'});
});
// Get ALL data from 'games' table
app.get('/api/games', async (req, res) =>{
    let games = await getAllGames();
    res.json(games);
});

//POST________________________________________________________
app.post('/api/games',(req,res)=>{

});

//DELETE________________________________________________________
app.delete('api/games/:id',(req,res)=>{

});

//PUT________________________________________________________
app.put('api/games',(req,res) => {

});

//#endregion

app.listen(PORT, () => {
    console.log("Server Listening on PORT:",PORT);
});