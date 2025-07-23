-- Developers
INSERT INTO developers (name, foundation_year, game_count, origin_country, entity_type) VALUES
('Nintendo EPD', 1889, 800, 'Japón', 'AAA'),
('CD Projekt Red', 1994, 15, 'Polonia', 'AAA'),
('Supergiant Games', 2009, 5, 'EE.UU.', 'Indie'),
('FromSoftware', 1986, 40, 'Japón', 'AA'),
('ConcernedApe', 2012, 1, 'EE.UU.', 'Indie'),
('Treyarch', 1996, 9 ,'EE.UU','AAA'),
('Sledgehammer Games',2009,5,'EE.UU','AAA');

-- Franchises
INSERT INTO franchises (title) VALUES
('The Legend of Zelda'),
('The Witcher'),
('Hades'),
('Dark Souls'),
('Stardew Valley'),
('Call of Duty');

-- Sagas
INSERT INTO sagas (title, id_franchise) VALUES
('Saga del Héroe del Tiempo', 1),
('Saga de Geralt de Rivia', 2),
('Saga del Inframundo', 3),
('Saga del Fuego', 4),
('Stardew Valley Game',5),
('Black Ops',6),
('Modern Warfare (OLD)',6);

-- Games
INSERT INTO games (title, release_year, gamemode, genre, perspective, image, id_franchise, id_saga, id_developer) VALUES
('The Legend of Zelda: Breath of the Wild', 2017, 'Un jugador', 'Acción, Aventura, Plataformas, Puzle / Rompecabezas, Rol (RPG)', 'Tercera persona', 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg/250px-The_Legend_of_Zelda_Breath_of_the_Wild.jpg', 1, 1, 1),
('The Witcher 2: Assassins of Kings', 2011, 'Un jugador', 'Acción, Aventura, Rol (RPG)', 'Tercera persona', 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/20920/capsule_616x353.jpg?t=1749200131', 2, 2, 2),
('The Witcher 3: Wild Hunt', 2015, 'Un jugador', 'Acción, Aventura, Rol (RPG)', 'Tercera persona', 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Witcher_3_cover_art.jpg/250px-Witcher_3_cover_art.jpg', 2, 2, 2),
('Hades', 2020, 'Un jugador', 'Hack and Slash, Roguelike / Roguelite', 'Vista de pájaro / Isométrica', 'https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000033131/dbc8c55a21688b446a5c57711b726956483a14ef8c5ddb861f897c0595ccb6b5', 3, 3, 3),
('Dark Souls III', 2016, 'Cooperativo, Un jugador', 'Aventura, Rol (RPG), Soulslike', 'Tercera persona', 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ-H2Wca6bBgYkATIE55kFkQ5-ss3jDW8_wjrqu7D_2e4wTd6s8acGBAEwWO0ZAwfZrAjp_lNjp4PLQ6BTBCqFsuCyElA9j66dTJD-9zA', 4, 4, 4),
('Stardew Valley', 2016, 'Cooperativo', 'Simulación', 'Vista de pájaro / Isométrica', 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/capsule_616x353.jpg?t=1711128146', 5, 5, 5),
('Call of Duty: Black Ops II', 2012, 'Cooperativo, Multijugador, Un jugador', 'Acción, Disparos en primera persona, Shooter', 'Primera Persona', 'https://upload.wikimedia.org/wikipedia/commons/2/25/Call_of_Duty_Black_Ops_-_Teaser_Logo.jpg', 6, 6, 6),
('Call of Duty: Modern Warfare 3', 2011, 'Cooperativo, Multijugador, Un jugador', 'Acción, Disparos en primera persona, Shooter', 'Primera persona', 'https://upload.wikimedia.org/wikipedia/en/b/bf/Call_of_Duty_Modern_Warfare_3_box_art.png',6,7,7);

-- Characters
INSERT INTO characters (character_name, image, gender, species, description, main_skill) VALUES
('Link', 'https://images.wikidexcdn.net/mwuploads/esssbwiki/thumb/3/32/latest/20230118170552/Link_SSB4.png/800px-Link_SSB4.png', 'Masculino', 'Hyliano', 'Héroe elegido por la Espada Maestra', 'Maestría con armas'),
('Geralt de Rivia', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW7aQKDEBn_9AIdxeYOSZ5YnD0n76Zk6MkcQ&s', 'Masculino', 'Mutante', 'Cazador de monstruos con poderes sobrenaturales', 'Combate con espadas'),
('Zagreus', 'https://ucarecdn.com/da45fd1a-8efb-4fbe-a175-9fad3ae0ec61/-/crop/1081x1080/698,0/-/preview/-/progressive/yes/-/format/auto/', 'Masculino', 'Semi-dios', 'Príncipe del Inframundo en busca de libertad', 'Esquiva ágil'),
('Solaire of Astora', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWn6-f8AXnpM6FA34yroHyAdme__B4tcqXAw&s', 'Masculino', 'Humano', 'Guerrero devoto del Sol', 'Milagros de luz'),
('Abigail', 'https://stardewvalleywiki.com/mediawiki/images/4/4a/Abigail_Winter_00.png', 'Femenino', 'Humana', 'Aventurera amante de lo sobrenatural', 'Combate con cuarzo'),
('John "Soap" MacTavish', 'https://i.pinimg.com/736x/ba/8f/09/ba8f098a10388c3321b80a4aa4c6d8b4.jpg', 'Masculino', 'Humano', 'Líder del equipo SAS, experto en operaciones encubiertas', 'Francotirador'),
('Captain Price', 'https://platform.polygon.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/20030053/price.jpg?quality=90&strip=all&crop=14.296875,0,46.953125,100', 'Masculino', 'Humano', 'Veterano comandante del SAS con décadas de experiencia', 'Estrategia militar'),
('Alex Mason', 'https://i.namu.wiki/i/M135CMQWJhcHJb85-MtHnlEKissVvrYlt90A1jTPGn0ZnfWA8UzVa_Fz7FzKMOVeydZ4FkNeYD6btsFRa5SyZw.webp', 'Masculino', 'Humano', 'Agente de la CIA con memorias fragmentadas', 'Combate cuerpo a cuerpo'),
('Frank Woods', 'https://i.pinimg.com/736x/3c/e3/02/3ce302198f5bb687aa283a620c9d8cdf.jpg', 'Masculino', 'Humano', 'Soldado de élite de las Fuerzas Especiales', 'Armas pesadas'),
('Raul Menendez', 'https://img.asmedia.epimg.net/resizer/v2/SCTQCDJUDNGYDILUWZDFO6DFKQ.jpg?auth=30985b7f7803de063bcc2ab5cfa9244915d3297b048cb8da5d4f58c7c2672f61&width=1200&height=1200&smart=true', 'Masculino', 'Humano', 'Líder de Cordis Die y antagonista principal', 'Manipulación');

INSERT INTO game_characters (id_game, id_character) VALUES
(1, 1),  -- Zelda BOTW -> Link
(2, 2), (3,2),  -- Witcher 3 y Witcher 2 -> Geralt
(4, 3),  -- Hades -> Zagreus
(5, 4),  -- Dark Souls 3 -> Solaire
(6, 5),  -- Stardew Valley -> Abigail
(7, 8), (7, 9), (7, 10),  -- BO2: Mason, Woods, Menendez
(8, 6), (8, 7);  -- COD4: Soap y Price