create database myblog;

use myblog;


create table user(
    id INTEGER PRIMARY KEY auto_increment,
    firstName VARCHAR(500),
    lastName VARCHAR(500),
    email VARCHAR(500),
    phone_number VARCHAR(15),
    password VARCHAR(500),
    is_added int(1) default 0, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table Blogs (
    blog_id INTEGER PRIMARY KEY auto_increment,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    file_path VARCHAR(255),
    category_name VARCHAR(255) NOT NULL,
    user_id INTEGER,
    is_private int(1) default 0, 
    publish_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

create table SharedBlogs (
    share_id INTEGER PRIMARY KEY auto_increment,
    blog_id INTEGER,
    shared_with_user_id INTEGER,
    sender_id INTEGER, 
    FOREIGN KEY (blog_id) REFERENCES Blogs(blog_id) ON DELETE CASCADE,
    FOREIGN KEY (shared_with_user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES user(id) ON DELETE CASCADE
);


