# MongoDB

## database

```js

// get the list of databases
> show dbs

// create a new database and use it
// if mydb does not exists, first create it and then use it
> use mydb

// show the current database selected
// db object is used to refer the current database
> db

// drop a database
> db.dropDatabase()

```

## collection

```js

// get the list of collections
> show collections

// create a new collection
> db.createCollection('user')
// > db.createCollection(<collection name>)

// drop a collection
> db.user.drop()
// > db.<collection name>.drop()

```

## documents

```js

// get the list of documents
> db.user.find()
// db.<collection name>.find()

// get the users with name "amit"
// > db.<collection>.find({<where clause>})
> db.user.find({ firstName: "amit" })

// insert one (JSON) document
> db.user.insertOne({ firstName: "amit", lastName: "kulkarni", email: "amit@test.com", password: "test"})
> db.user.insertOne({ firstName: "bill", lastName: "gates", email: "bill@test.com",password: "test", address: "USA", phone: "+123434543534" })

// update price of iPhone to 200000
// update products set price = 200000 where title = 'iphone'
// > db.products.updateOne({ title: 'iphone' }, { $set: { price: 200000 } })
> db.products.updateMany({ title: 'iphone' }, { $set: { price: 200000 } })

// delete a product named projector
> db.products.deleteOne({ title: 'projector' })

```

## exercise

```js

// create collection named products
> db.createCollection('products')

// insert few products
> db.products.insertMany([
    { title: 'iphone', price: 156000, category: 'electronics', company: 'Apple' },
    { title: 'imac', price: 210000, category: 'computer', company: 'Apple' },
    { title: 'laptop bag', price: 1000, category: 'bag', company: 'XYZ' },
    { title: 'projector', price: 50000, category: 'electronics', company: 'Sony' },
    { title: 'board', price: 500, category: 'consumable', company: 'ABC' },
  ])

// find the products of electronics category
// select * from products where category = 'electronics'
> db.products.find({ category: 'electronics' })

// find the products having price > 100000
// select * from products where price > 100000
> db.products.find({ price: { $gt: 100000 } })

// find the products having price between 100 to 10000
// select * from products where (price > 100) and (price < 10000)
> db.products.find({ price: { $gt: 100, $lt: 10000 } })

// find title and price of products from Apple with case sensitivity
// select title, price from products where company = 'Apple'
> db.products.find({ company: 'Apple' }, { title: 1, price: 1, _id: 0 })

// find title and price of products from Apple with case insensitivity
> db.products.find({ company: { $regex: /apple/i } }, { title: 1, price: 1, _id: 0 })

// find the total count of records in products collections
// select count(*) from products
> db.products.find().count()

```
