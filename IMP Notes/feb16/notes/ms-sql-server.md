# SQL Server

## Database

```sql

-- create a new database
-- CREATE DATABASE ecommerce;

-- select the database to perform all the operations
-- USE ecommerce;

-- drop the database
-- dop database ecommerce;

```

## table

```sql

-- create user table
CREATE TABLE AppUser(
    id INTEGER IDENTITY PRIMARY KEY,
    firstName VARCHAR(20),
    lastName VARCHAR(20),
    email VARCHAR(50),
    password VARCHAR(100)
);

-- create user
CREATE TABLE Address (
    id INTEGER IDENTITY PRIMARY KEY,
    title VARCHAR(20),
    address1 VARCHAR(20),
    address2 VARCHAR(20),
    city VARCHAR(50),
    state VARCHAR(50),
    country VARCHAR(50),
    zipCode INT,
    userId INTEGER references AppUser(id)
);


-- create company column
CREATE TABLE Company(
    id INTEGER IDENTITY PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(50),
    address VARCHAR(100)
);

-- create a product table
CREATE TABLE Product(
    id INTEGER IDENTITY PRIMARY KEY,
    title VARCHAR(100),
    details TEXT,
    price float,
    quantity INTEGER,
    image VARCHAR(50),
    tags VARCHAR(100),
    companyId INTEGER REFERENCES Company(id)
);

-- create order master table
CREATE TABLE AppOrder (
    id INTEGER IDENTITY PRIMARY KEY,
    userId INTEGER REFERENCES AppUser(id),
    total FLOAT,
    status BIT DEFAULT 0,
    addressId INTEGER REFERENCES Address(id),
    orderDate DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- create order details
CREATE TABLE OrderDetails(
    id INTEGER IDENTITY PRIMARY KEY,
    orderId INTEGER REFERENCES AppOrder(id),
    productId INTEGER,
    quantity INTEGER,
    price FLOAT
);

-- alter table for adding a new column
ALTER TABLE OrderDetails ADD price FLOAT;

-- create order details
CREATE TABLE Cart(
    id INTEGER IDENTITY PRIMARY KEY,
    userId INTEGER REFERENCES AppUser(id),
    productId INTEGER,
    quantity INTEGER,
    price FLOAT,
    createdTimestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

```

## insert

```sql

-- create users
INSERT INTO AppUser (firstName, lastName, email, password)
VALUES
    ('amit', 'kulkarni', 'amit@test.com', 'test1234'),
    ('bill', 'gates', 'bill@test.com', 'test1234'),
    ('stave', 'jobs', 'steve@test.com', 'test1234');

-- add user addresses
INSERT INTO Address
    (title, address1, address2, city,
        state, country, zipCode, userId)
VALUES
    ('home', 'home number', 'building name', 'pune',
        'MH', 'India', 411041, 1);

```

## read operation

```sql

-- get the count of users
SELECT count(*) FROM AppUser;

-- get all users
SELECT id, firstName, lastName, email FROM AppUser;

-- get user addresses
SELECT * FROM Address;

-- get user addresses with user details
SELECT * FROM Address
JOIN AppUser
ON Address.userId = AppUser.id;

```

## update operations

```sql

-- change the zipCode for first address
UPDATE Address
SET zipCode = 411056
WHERE id = 1;

```

## delete a record

```sql

-- delete first address of user 1
DELETE FROM Address
WHERE id = 1;

-- delete all records from a address
TRUNCATE TABLE Address;

```

## delete table

```sql

-- delete Cart table
DROP TABLE Cart;

```
