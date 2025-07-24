-- Developers
INSERT INTO developers (name, foundation_year, game_count, origin_country, entity_type) VALUES
('Nintendo EPD', 1889, 800, 'Japón', 'AAA'),
('CD Projekt Red', 1994, 15, 'Polonia', 'AAA'),
('Supergiant Games', 2009, 5, 'EE.UU.', 'Indie'),
('FromSoftware', 1986, 40, 'Japón', 'AA'),
('ConcernedApe', 2012, 1, 'EE.UU.', 'Indie'),
('Treyarch', 1996, 9 ,'EE.UU','AAA'),
('Sledgehammer Games',2009,5,'EE.UU','AAA'),
('Mojang Studios', 2009, 10, 'Suecia', 'AA'),
('Team Cherry', 2014, 2, 'Australia', 'Indie'),
('Insomniac Games', 1994, 30, 'EE.UU.', 'AAA'),
('Guerrilla Games', 2000, 12, 'Países Bajos', 'AAA'),
('Larian Studios', 1996, 20, 'Bélgica', 'AA'),
('Capcom', 1979, 300, 'Japón', 'AAA'),
('Square Enix', 2003, 250, 'Japón', 'AAA'),
('Playdead', 2006, 3, 'Dinamarca', 'Indie'),
('Annapurna Interactive', 2016, 25, 'EE.UU.', 'AA'),
('Media Molecule', 2006, 5, 'Reino Unido', 'AA');

-- Franchises
INSERT INTO franchises (title) VALUES
('The Legend of Zelda'),
('The Witcher'),
('Hades'),
('Dark Souls'),
('Stardew Valley'),
('Call of Duty'),
('Minecraft'),
('Hollow Knight'),
('Ratchet & Clank'),
('Horizon'),
('Divinity'),
('Resident Evil'),
('Final Fantasy'),
('Inside'),
('Journey'),
('LittleBigPlanet');

-- Sagas
INSERT INTO sagas (title, id_franchise) VALUES
('Saga del Héroe del Tiempo', 1),
('Saga de Geralt de Rivia', 2),
('Saga del Inframundo', 3),
('Saga del Fuego', 4),
('Stardew Valley Game',5),
('Black Ops',6),
('Modern Warfare (OLD)',6),
('Minecraft Universe', 7),
('Hollow Knight Series', 8),
('Ratchet & Clank Adventures', 9),
('Horizon Zero Dawn', 10),
('Divinity Original Sin', 11),
('Resident Evil Main Series', 12),
('Final Fantasy Main Series', 13),
('Playdead Universe', 14),
('Journey Experience', 15),
('LittleBigPlanet Games', 16);

-- Games
INSERT INTO games (title, release_year, gamemode, genre, perspective, image, id_franchise, id_saga, id_developer) VALUES
('The Legend of Zelda: Breath of the Wild', 2017, 'Un jugador', 'Acción, Aventura, Plataformas, Puzle / Rompecabezas, Rol (RPG)', 'Tercera persona', 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg/250px-The_Legend_of_Zelda_Breath_of_the_Wild.jpg', 1, 1, 1),
('The Witcher 2: Assassins of Kings', 2011, 'Un jugador', 'Acción, Aventura, Rol (RPG)', 'Tercera persona', 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/20920/capsule_616x353.jpg?t=1749200131', 2, 2, 2),
('The Witcher 3: Wild Hunt', 2015, 'Un jugador', 'Acción, Aventura, Rol (RPG)', 'Tercera persona', 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Witcher_3_cover_art.jpg/250px-Witcher_3_cover_art.jpg', 2, 2, 2),
('Hades', 2020, 'Un jugador', 'Hack and Slash, Roguelike / Roguelite', 'Vista de pájaro / Isométrica', 'https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000033131/dbc8c55a21688b446a5c57711b726956483a14ef8c5ddb861f897c0595ccb6b5', 3, 3, 3),
('Dark Souls III', 2016, 'Cooperativo, Un jugador', 'Aventura, Rol (RPG), Soulslike', 'Tercera persona', 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ-H2Wca6bBgYkATIE55kFkQ5-ss3jDW8_wjrqu7D_2e4wTd6s8acGBAEwWO0ZAwfZrAjp_lNjp4PLQ6BTBCqFsuCyElA9j66dTJD-9zA', 4, 4, 4),
('Stardew Valley', 2016, 'Cooperativo', 'Simulación', 'Vista de pájaro / Isométrica', 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/capsule_616x353.jpg?t=1711128146', 5, 5, 5),
('Call of Duty: Black Ops II', 2012, 'Cooperativo, Multijugador, Un jugador', 'Acción, Disparos en primera persona, Shooter', 'Primera Persona', 'https://upload.wikimedia.org/wikipedia/commons/2/25/Call_of_Duty_Black_Ops_-_Teaser_Logo.jpg', 6, 6, 6),
('Call of Duty: Modern Warfare 3', 2011, 'Cooperativo, Multijugador, Un jugador', 'Acción, Disparos en primera persona, Shooter', 'Primera persona', 'https://upload.wikimedia.org/wikipedia/en/b/bf/Call_of_Duty_Modern_Warfare_3_box_art.png',6,7,7),
('Minecraft', 2011, 'Cooperativo, Multijugador', 'Sandbox, Sobrevivencia / Supervivencia', 'Primera persona', 'https://i.pinimg.com/736x/5f/f0/e9/5ff0e997a4a8ba449056ed679660f4cc.jpg', 7, 8, 8),
('Hollow Knight', 2017, 'Un jugador', 'Metroidvania, Soulslike', 'Vista lateral', 'https://i.pinimg.com/736x/5e/9f/11/5e9f11f299e983dbc39ea58a3b73dc9c.jpg', 8, 9, 9),
('Ratchet & Clank: Rift Apart', 2021, 'Un jugador', 'Acción, Aventura, Plataformas', 'Tercera persona', 'https://i.pinimg.com/736x/77/21/71/772171d0a9d0997d0a71878cc04a96c4.jpg', 9, 10, 10),
('Horizon Zero Dawn', 2017, 'Un jugador', 'Acción, Aventura, Mundo abierto', 'Tercera persona', 'https://i.pinimg.com/736x/f7/7d/08/f77d0890836b6967a3d854ab4124be28.jpg', 10, 11, 11),
('Divinity: Original Sin 2', 2017, 'Cooperativo, Un jugador', 'Rol (RPG), Estrategia por turnos (TBS)', 'Vista de pájaro / Isométrica', 'https://i.pinimg.com/736x/19/e3/6d/19e36d8a3def713bf92352616b3f3ed2.jpg', 11, 12, 12),
('Resident Evil Village', 2021, 'Un jugador', 'Horror de supervivencia, Disparos', 'Primera persona', 'https://i.pinimg.com/736x/81/7a/9f/817a9fcea3153c9cc1aa5218eb27dde9.jpg', 12, 13, 13),
('Final Fantasy VII Remake', 2020, 'Un jugador', 'JRPG (Juego de rol japonés), Acción', 'Tercera persona', 'https://image.api.playstation.com/vulcan/img/cfn/11307T0vPiiGfDpR_Ni5Un5FbQVxwIajUBC9pqjcdLh9pMc8bG6HiVSuqpR8SdJ-_6AiJMKhnX2j6QenTHzFrxWKIJ0X4Sdx.png', 13, 14, 14),
('Inside', 2016, 'Un jugador', 'Plataformas, Puzle / Rompecabezas, Narrativo / Visual Novel', 'Vista lateral', 'https://i.pinimg.com/736x/50/bc/76/50bc76e5b2fecfce7efcb96a6224c20b.jpg', 14, 15, 15),
('Journey', 2012, 'Multijugador', 'Aventura, Musical / Ritmo', 'Tercera persona', 'https://i.pinimg.com/736x/ee/59/c6/ee59c619e158473b63ca5b05cae22350.jpg', 15, 16, 16),
('LittleBigPlanet 3', 2014, 'Cooperativo, Pantalla dividida', 'Plataformas, Party / Fiesta', 'Vista lateral', 'https://image.api.playstation.com/cdn/UP9000/CUSA00473_00/q2XUSY4u8ubWXxQ3Mato38JUS3d1xaZA.png', 16, 17, 17);

-- Characters
INSERT INTO characters (character_name, image, gender, species, description, main_skill) VALUES
('Link', 'https://images.wikidexcdn.net/mwuploads/esssbwiki/thumb/3/32/latest/20230118170552/Link_SSB4.png/800px-Link_SSB4.png', 'Masculino', 'Hyliano', 'Héroe elegido por la Espada Maestra', 'Maestría con armas'),
('Geralt de Rivia', 'https://img.asmedia.epimg.net/resizer/v2/ZAKZK5JCNRPDBEV33LBON3VHNE.jpg?auth=88533d983179d55b905b319369473373592d7b6bd06e572c516706cf12d7a6c7&width=1472&height=1104&smart=true', 'Masculino', 'Mutante', 'Cazador de monstruos con poderes sobrenaturales', 'Combate con espadas'),
('Zagreus', 'https://ucarecdn.com/da45fd1a-8efb-4fbe-a175-9fad3ae0ec61/-/crop/1081x1080/698,0/-/preview/-/progressive/yes/-/format/auto/', 'Masculino', 'Semi-dios', 'Príncipe del Inframundo en busca de libertad', 'Esquiva ágil'),
('Solaire of Astora', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWn6-f8AXnpM6FA34yroHyAdme__B4tcqXAw&s', 'Masculino', 'Humano', 'Guerrero devoto del Sol', 'Milagros de luz'),
('Abigail', 'https://stardewvalleywiki.com/mediawiki/images/4/4a/Abigail_Winter_00.png', 'Femenino', 'Humana', 'Aventurera amante de lo sobrenatural', 'Combate con cuarzo'),
('John "Soap" MacTavish', 'https://i.pinimg.com/736x/ba/8f/09/ba8f098a10388c3321b80a4aa4c6d8b4.jpg', 'Masculino', 'Humano', 'Líder del equipo SAS, experto en operaciones encubiertas', 'Francotirador'),
('Captain Price', 'https://platform.polygon.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/20030053/price.jpg?quality=90&strip=all&crop=14.296875,0,46.953125,100', 'Masculino', 'Humano', 'Veterano comandante del SAS con décadas de experiencia', 'Estrategia militar'),
('Alex Mason', 'https://i.namu.wiki/i/M135CMQWJhcHJb85-MtHnlEKissVvrYlt90A1jTPGn0ZnfWA8UzVa_Fz7FzKMOVeydZ4FkNeYD6btsFRa5SyZw.webp', 'Masculino', 'Humano', 'Agente de la CIA con memorias fragmentadas', 'Combate cuerpo a cuerpo'),
('Frank Woods', 'https://i.pinimg.com/736x/3c/e3/02/3ce302198f5bb687aa283a620c9d8cdf.jpg', 'Masculino', 'Humano', 'Soldado de élite de las Fuerzas Especiales', 'Armas pesadas'),
('Raul Menendez', 'https://img.asmedia.epimg.net/resizer/v2/SCTQCDJUDNGYDILUWZDFO6DFKQ.jpg?auth=30985b7f7803de063bcc2ab5cfa9244915d3297b048cb8da5d4f58c7c2672f61&width=1200&height=1200&smart=true', 'Masculino', 'Humano', 'Líder de Cordis Die y antagonista principal', 'Manipulación'),
('Steve', 'https://i.pinimg.com/736x/c7/d8/6e/c7d86e834d4b4371658c518b81b79cdb.jpg', 'Masculino', 'Humano', 'Protagonista de Minecraft', 'Construcción'),
('The Knight', 'https://i.pinimg.com/736x/1e/69/53/1e69536656f5ea5553c9c75be288b32b.jpg', 'Desconocido', 'Insecto', 'Protagonista silencioso de Hollow Knight', 'Espada de alma'),
('Ratchet', 'https://i.pinimg.com/736x/4c/75/7f/4c757fcdea84f83bfb69cdc8ef064bae.jpg', 'Masculino', 'Lombax', 'Héroe intergaláctico', 'Armas inventivas'),
('Aloy', 'https://i.pinimg.com/736x/16/25/de/1625dedd42fa0127eb5e2aa1f5c23819.jpg', 'Femenino', 'Humana', 'Cazadora en un mundo post-apocalíptico', 'Arco y flechas'),
('Fane', 'https://i.pinimg.com/736x/52/f8/b1/52f8b1e1871a4ccf37be6aa075914dc4.jpg', 'Masculino', 'Eterno', 'Misterioso esqueleto en Divinity', 'Magia de origen'),
('Lady Dimitrescu', 'https://i.pinimg.com/736x/7c/6d/56/7c6d5613253abbcdd102f3c887bfde74.jpg', 'Femenino', 'Vampiro', 'Antagonista de Resident Evil Village', 'Fuerza sobrehumana'),
('Cloud Strife', 'https://i.pinimg.com/736x/70/d1/48/70d14810c517f42a194145d202a9495c.jpg', 'Masculino', 'Humano', 'Ex-SOLDADO mercenario', 'Espada enorme'),
('The Boy', 'https://i.pinimg.com/736x/f8/dc/00/f8dc0081e21f80154d851ea5c3c74df9.jpg', 'Masculino', 'Humano', 'Protagonista de Inside', 'Agilidad'),
('The Traveler', 'https://i.pinimg.com/736x/29/6a/cb/296acbe8a82333b7a596a0c7710de47f.jpg', 'Desconocido', 'Misterioso', 'Protagonista de Journey', 'Vuelo'),
('Sackboy', 'https://i.pinimg.com/736x/68/21/ad/6821ad6e28c627af7f2743943882eb59.jpg', 'Otro', 'Creatura de tela', 'Protagonista de LittleBigPlanet', 'Personalización'),
('Zelda', 'https://i.pinimg.com/736x/8e/9e/ad/8e9ead9dda1ea4ff5a22d35ba9915172.jpg', 'Femenino', 'Hyliano', 'Princesa de Hyrule con poderes sagrados', 'Magia de la Trifuerza'),
('Daruk', 'https://i.pinimg.com/736x/8b/59/7b/8b597bd637cbf945b30c97534c062343.jpg', 'Masculino', 'Goron', 'Campeón Goron de la habilidad Daruk', 'Protección de roca'),
('Mipha', 'https://i.pinimg.com/736x/2e/d7/04/2ed7048d2263bc647312ba5845968cd5.jpg', 'Femenino', 'Zora', 'Princesa Zora y campeona de la habilidad Mipha', 'Curación con agua'),
('Revali', 'https://i.pinimg.com/736x/4c/56/68/4c5668f101e98837fbec7d66bfb9b3d8.jpg', 'Masculino', 'Rito', 'Campeón Rito arrogante pero habilidoso', 'Vuelo y arquería'),
('Yennefer de Vengerberg', 'hhttps://i.pinimg.com/1200x/5f/a9/02/5fa902fe254f2f1432d76f3741f9f885.jpg', 'Femenino', 'Humana/Hechicera', 'Poderosa hechicera y amor de Geralt', 'Magia del caos'),
('Ciri', 'https://i.pinimg.com/736x/39/39/fb/3939fbddd30e4bb9149cdd3ba44f4739.jpg', 'Femenino', 'Humana/De sangre antigua', 'Hija adoptiva de Geralt con poderes especiales', 'Teletransportación'),
('Triss Merigold', 'https://i.pinimg.com/736x/d7/0f/b4/d70fb451c1946e8aa260600ebe3c32b9.jpg', 'Femenino', 'Humana/Hechicera', 'Hechicera y antigua amante de Geralt', 'Magia elemental'),
('Megaera', 'https://i.pinimg.com/736x/7a/e8/23/7ae8232aba67b365bde80c448cfb42a8.jpg', 'Femenino', 'Furia', 'Primera de las Furias y ex-amante de Zagreus', 'Látigo de dolor'),
('Thanatos', 'https://i.pinimg.com/736x/75/23/53/752353a85717e9ac67b6fc7fd5261c85.jpg', 'Masculino', 'Dios de la muerte', 'Personificación de la muerte y aliado de Zagreus', 'Ataques instantáneos'),
('Nyx', 'https://i.pinimg.com/736x/3e/cf/12/3ecf123a46a02e8a2a6f5e4161bd1016.jpg', 'Femenino', 'Diosa primordial', 'Diosa de la noche y figura materna para Zagreus', 'Manipulación de sombras'),
('Siegward de Catarina', 'https://i.pinimg.com/1200x/c9/7a/68/c97a6837ea71ebc24535c0f5761f1a9d.jpg', 'Masculino', 'Humano/No muerto', 'Caballero de Catarina con armadura de cebolla', 'Espada de gran tamaño'),
('Patches', 'https://i.pinimg.com/1200x/53/bd/28/53bd286fcc7a1a02ca340a58f8c30336.jpg', 'Masculino', 'Humano/No muerto', 'Tramposo y traicionero mercader', 'Emboscadas'),
('Sebastian', 'https://i.pinimg.com/736x/16/7a/e0/167ae0fb03d0f35ab07a5c1053a5c16f.jpg', 'Masculino', 'Humano', 'Programador introvertido que ama la motocicleta', 'Programación'),
('Leah', 'https://i.pinimg.com/736x/bd/ec/02/bdec021b2b41040f3ffe11f225131d03.jpg', 'Femenino', 'Humano', 'Artista que vive cerca del bosque', 'Escultura'),
('Maru', 'https://i.pinimg.com/736x/5e/f3/4e/5ef34efdbc3609c343ed8e8c2d24af8d.jpg', 'Femenino', 'Humano', 'Científica e inventora talentosa', 'Inventos tecnológicos'),
('Mike Harper', 'https://i.pinimg.com/736x/82/c6/0c/82c60c60130868a55956f29c69e0aa1d.jpg', 'Masculino', 'Humano', 'Agente de la CIA y aliado de Mason', 'Operaciones encubiertas'),
('Chloe Lynch', 'https://i.pinimg.com/736x/9e/d6/b3/9ed6b3c5ec8279ac7cb8bfb31de0abfa.jpg', 'Femenino', 'Humano', 'Hacker que ayuda a la resistencia', 'Hacking informático'),
('DeFalco', 'https://i.pinimg.com/736x/ca/bd/e7/cabde703073f9596ba26f6c45bb41c0e.jpg', 'Masculino', 'Humano', 'Mercenario que trabaja para Menéndez', 'Combate urbano'),
('Yuri', 'https://i.pinimg.com/736x/13/cd/b2/13cdb20c50c40387f933b5ee5614edcc.jpg', 'Masculino', 'Humano', 'Ex-miembro de Ultranacionalistas que ayuda a Price', 'Conocimiento del enemigo'),
('Nikolai', 'https://i.pinimg.com/736x/71/bd/96/71bd968c78d66b584c0ee9dc31e8c432.jpg', 'Masculino', 'Humano', 'Contacto ruso de Price y Soap', 'Logística militar'),
('Vladimir Makarov', 'https://i.pinimg.com/736x/16/7a/e0/167ae0fb03d0f35ab07a5c1053a5c16f.jpg', 'Masculino', 'Humano', 'Terrorista principal de la saga Modern Warfare', 'Manipulación y terrorismo');


INSERT INTO game_characters (id_game, id_character) VALUES
(1, 1), (1, 21), (1, 22), (1, 23), (1, 24), -- The Legend Of Zelda: Breath Of The Wild -> Link, Zelda, Daruk, Mipha
(2, 2), (2, 27), (3,2), (3, 25), (3, 26), (3, 27), -- Witcher 3 y Witcher 2 -> Geralt, Yennefer, Ciri,  Triss
(4, 3), (4, 28), (4, 29), (4, 30), -- Hades -> Zagreus, Megaera, Nyx, Thanatos
(5, 4), (5, 31), (5, 32), -- Dark Souls 3 -> Solaire, Siegward, Patches
(6, 5), (6, 33), (6, 34), (6, 35),  -- Stardew Valley -> Abigail, Sebastina, Leah, Maru
(7, 8), (7, 9), (7, 10), (7, 36), (7, 37), (7, 38), -- BO2: -> Mason, Woods, Mike, Cloeh, DeFalco
(8, 6), (8, 7), (7, 39), (8, 40), (8, 41), -- COD4: -> Soap, Price, Nikolai, Vladimir
(9, 11),   -- Minecraft -> Steve
(10, 12),  -- Hollow Knight -> The Knight
(11, 13),  -- Ratchet & Clank -> Ratchet
(12, 14),  -- Horizon -> Aloy
(13, 15),  -- Divinity -> Fane
(14, 16),  -- Resident Evil -> Lady Dimitrescu
(15, 17),  -- Final Fantasy -> Cloud
(16, 18),  -- Inside -> The Boy
(17, 19),  -- Journey -> The Traveler
(18, 20);  -- Little Big Planet 3 -> Sackboy