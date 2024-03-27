CREATE database notesdb;

use notedb;

create table user (
    id INTEGER PRIMARY KEY auto_increment,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(100),
    createdTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table note (
    id INTEGER PRIMARY KEY auto_increment,
    title VARCHAR(50),
    details VARCHAR(50),
    dueDate VARCHAR(50),
    isPublic int(1) default 0,
    userId INTEGER REFERENCES user(id),
    createdTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);