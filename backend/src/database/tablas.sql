create table developers (
	id serial primary key,
	name varchar(300),
	foundation_year int,
	cant_games int,
	origin_country varchar(50),
	entity_type varchar(50)
)

create table games (
	id serial primary key,
	title varchar(100),
	release_year int,
	gamemode varchar(100),
	gender varchar(300),
	perspective varchar(300),
	image varchar(255),
	frachise varchar(100),
	id_developer int references developers (id)
);

create table characters (
	id serial primary key,
	char_name varchar(100),
	franchise varchar(100),
	image varchar(255),
	sex varchar(50),
	species varchar(50),
	description varchar(500),
	main_skill varchar(100),
	id_game int references games (id)
);



