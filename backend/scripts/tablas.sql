create table game (
	id_game serial primary key,
	title varchar(100),
	developer varchar(300),
	release_year int,
	gamemode varchar(100),
	gender varchar(300),
	perspective varchar(300),
	img varchar(255),
	frachise varchar(100)
);

create table character (
	id_character serial primary key,
	char_name varchar(100),
	franchise varchar(100),
	img varchar(255),
	sex varchar(50),
	species varchar(50),
	description varchar(500),
	main_skill varchar(100)
);

create table developer (
	id_developer serial primary key,
	name varchar(300),
	foundation_year int,
	cant_games int,
	origin_country varchar(50),
	entity_tipe varchar(50)
)

