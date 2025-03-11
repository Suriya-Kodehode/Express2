-- Suriya

--use kh;
--alter database Express2 set single_user with rollback immediate;
--drop database Express2;

create database Express2;
go

use Express2;
go

create table t_Users (
	UserID bigint primary key identity(1,1) not null,
	Email nvarchar(100) not null,
	firstName nvarchar(100) null,
	lastName nvarchar(100) null,
	HPassword varbinary(4000) not null
)
go

create table t_Facts (
	FactID bigint primary key identity(1,1) not null,
	Facts nvarchar(1000) null
)
go

select *
from t_Users
go

select *
from t_Facts
go

INSERT INTO t_Facts (Facts)
VALUES ('The Great Wall of China is over 13,000 miles long!');
go

INSERT INTO t_Facts (Facts) VALUES
('The world''s largest desert is not the Sahara; it''s Antarctica!'),
('Honey never spoils—it has been found in ancient Egyptian tombs and is still edible.'),
('A day on Venus is longer than a year on Venus.'),
('Octopuses have three hearts, and their blood is blue.'),
('Bananas are berries, but strawberries are not.'),
('The Eiffel Tower can grow taller during the summer due to metal expansion from the heat.'),
('Sea otters hold hands while they sleep to stay together.'),
('Some cats are allergic to humans (though it''s rare).'),
('Wombat poop is cube-shaped, helping it stay in place as territorial markers.'),
('There are more trees on Earth than there are stars in the Milky Way.');
go