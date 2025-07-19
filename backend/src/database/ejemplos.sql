-- Developers
INSERT INTO developers (name, foundation_year, game_count, origin_country, entity_type) VALUES
('FromSoftware', 1986, 15, 'Japón', 'Privada'),
('Naughty Dog', 1984, 20, 'Estados Unidos', 'Subsidiaria'),
('CD Projekt RED', 2002, 10, 'Polonia', 'Pública'),
('Nintendo EPD', 2015, 30, 'Japón', 'División interna'),
('Valve', 1996, 12, 'Estados Unidos', 'Privada'),
('Infinity Ward', 2002, 18, 'Estados Unidos', 'Subsidiaria'),
('Treyarch', 1996, 22, 'Estados Unidos', 'Subsidiaria');

-- Franchises
INSERT INTO franchises (title) VALUES
('Dark Souls'),
('The Last of Us'),
('Cyberpunk'),
('Half-Life'),
('Call of Duty'),
('The Legend of Zelda');

-- Sagas
INSERT INTO sagas (title, id_franchise) VALUES
('Dark Souls Trilogy', 1),
('The Last of Us Main', 2),
('Modern Warfare', 5),
('Black Ops', 5),
('Half-Life Series', 4),
('Cyberpunk Universe', 3),
('Zelda Breath of the Wild Era', 6);

-- Games
INSERT INTO games (title, release_year, gamemode, genre, perspective, image, id_franchise, id_saga, id_developer) VALUES
('Dark Souls', 2011, 'Un jugador', 'Acción RPG', 'Tercera persona', 'darksouls1.jpg', 1, 1, 1),
('Dark Souls II', 2014, 'Un jugador', 'Acción RPG', 'Tercera persona', 'darksouls2.jpg', 1, 1, 1),
('The Legend of Zelda: Breath of the Wild', 2017, 'Un jugador', 'Acción-aventura', 'Tercera persona', 'botw.jpg', 6, 7, 4),
('The Last of Us', 2013, 'Un jugador', 'Acción-aventura', 'Tercera persona', 'tlou1.jpg', 2, 2, 2),
('Cyberpunk 2077', 2020, 'Un jugador', 'RPG', 'Primera persona', 'cyberpunk.jpg', 3, 6, 3),
('Half-Life 2', 2004, 'Un jugador', 'Shooter', 'Primera persona', 'hl2.jpg', 4, 5, 5),
('Call of Duty: Modern Warfare', 2019, 'Multijugador', 'Shooter', 'Primera persona', 'mw2019.jpg', 5, 3, 6),
('Call of Duty: Black Ops II', 2012, 'Multijugador', 'Shooter', 'Primera persona', 'bo2.jpg', 5, 4, 7);

-- Characters
INSERT INTO characters (character_name, image, gender, species, description, main_skill, id_game) VALUES
('Joel', 'joel.jpg', 'Masculino', 'Humano', 'Un hombre endurecido por la pérdida que guía a Ellie.', 'Combate cuerpo a cuerpo', 4),
('Ellie', 'ellie.jpg', 'Femenino', 'Humano', 'Una chica inmune al virus que asola el mundo.', 'Sigilo y cuchillo', 4),
('V', 'v.jpg', 'Otro', 'Humano con ciberimplantes', 'Protagonista personalizado en Night City.', 'Hackeo y combate', 5),
('Gordon Freeman', 'gordon.jpg', 'Masculino', 'Humano', 'Científico que lucha contra invasores alienígenas.', 'Armas de energía', 6),
('Chosen Undead', 'chosen.jpg', 'Masculino', 'No muerto', 'Protagonista silencioso de Dark Souls.', 'Versatilidad en combate', 1),
('Bearer of the Curse', 'bearer.jpg', 'Femenino', 'No muerto', 'Protagonista de Dark Souls II.', 'Espadas y magia', 2),
('Captain Price', 'price.jpg', 'Masculino', 'Humano', 'Soldado veterano del SAS.', 'Tácticas militares', 7),
('Alex Mason', 'mason.jpg', 'Masculino', 'Humano', 'Agente de la CIA marcado por la guerra fría.', 'Disparos y espionaje', 8),
('Link', 'link.jpg', 'Masculino', 'Hyliano', 'Un joven valiente que lucha contra el mal en Hyrule.', 'Espadachín', 3),
('Zelda', 'zelda.jpg', 'Femenino', 'Hyliano', 'Princesa sabia con poderes mágicos.', 'Magia', 3);
    