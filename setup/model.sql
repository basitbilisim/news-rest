create database news_data;

create table users (
	user_id int generated always as identity primary key,
	firstname varchar(50) not null ,
	lastname varchar(50) not null ,
	password varchar(50) not null ,
	email varchar(50) not null UNIQUE ,
	special varchar(100) not null 
);
create table categories (
	category_id int generated always as identity primary key,
	category_name varchar(50) not null ,
	lang_id int not null references languege (lang_id) on delete cascade
);
DROP TABLE  languege;
create table languege (
	lang_id int generated always as identity primary key,
	lang_name varchar(50) not null  
);
create table news (
	new_id int generated always as identity primary key ,
	title varchar(100) not null,
	body varchar(10000) not null,
	new_time timestamptz default current_timestamp,
	views int,
	author_id int not null references users (user_id) on delete cascade,
	category_id int not null references categories (category_id) on delete cascade,
	lang_id int not null references languege (lang_id) on delete cascade
);

insert into news (title,body,author_id,category_id,lang_id) values
('Juventus vs Realmadrid','Juventus 2-1 Realmadrid juventusnin toplam bal 50 boldi',1,4,3),
('Virus bolip olganlar soni','Ozbekistonda Bugun coronavirustan olganlar soni 55 boldi',2,2,3),
('The number of cases of the virus','The number of people infected with coronavirus in Uzbekistan today is 55',2,2,1);

insert into languege(lang_name) values
('english'),
('русский'),
('Ozbekcha');
INSERT INTO	categories(category_name,lang_id) values
('Johon',3),
('Madaniyat',3),
('Siyosat',3),
('Sport',3),

('Mir',2),
('tcivilizatsiya',2),
('Politika',2),
('Sport',2),

('World',1),
('culture',1),
('politics',1),
('Sport',1);
insert into users(firstname,lastname,password,email,special) values
('Abdulaziz','Abduazimov','1234','abdulaziz@gmail.com','programist'),
('Muhammad','Husayn','4321','husayn@gmail.com','teacher');

select * from users ;
select * from languege; 
select * from categories; 

