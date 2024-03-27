-- create new database
create database mydb;

-- use the database
use mydb;

-- create item table
create table item(
    id integer primary key auto_increment,
    title varchar(1000),
    details varchar(10000),
    status integer(1) default 0,
    createdTimestamp timestamp default CURRENT_TIMESTAMP);

-- insert dummy data for testing
insert into item (title, details) VALUES   
    ('item 1', 'item 1 details'),
    ('item 2', 'item 2 details'),
    ('item 3', 'item 3 details'),
    ('item 4', 'item 4 details'),
    ('item 5', 'item 5 details');

-- create user table
create table user(
    id integer primary key auto_increment,
    firstName varchar(20),
    lastName varchar(20),
    email varchar(50),
    password varchar(100),
    createdTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

    