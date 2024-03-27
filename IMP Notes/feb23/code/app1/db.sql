create database mydb;
use mydb;

create table product(
    id integer primary key auto_increment,
    title varchar(100),
    description VARCHAR(10000),
    company VARCHAR(200),
    price FLOAT,
    category VARCHAR(100),
    color VARCHAR(10)
);

create table task(
    id integer primary key auto_increment,
    title varchar(100),
    description VARCHAR(10000),
    dueDate VARCHAR(50),
    completeStatus INT(1)
);