create database if not exists react_java;
use react_java;

create table users (
id int not null primary key auto_increment,
nome varchar(70) not null,
email varchar(70) not null,
phone varchar(20),
address varchar(80),
hobby varchar(30)
);

select * from users;	