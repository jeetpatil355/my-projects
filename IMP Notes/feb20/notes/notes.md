# HTTP

## server

- http method

  - client
    - POST: insert the data
    - GET: get (read) the data
    - PUT or PATCH: update the data
    - DELETE: delete the data
  - server
    - POST: insert into .....
    - GET: select \* from .....
    - PUT or PATCH: update table ....
    - DELETE: delete from .....

- url or path
  - type of request
- eg.

  - GET /person -> get list of persons
  - GET /category -> get the list of categories
  - POST /user/register -> register a new user
  - PUT /user -> update user profile
  - DELETE /product -> delete a product

- input data for the APIs
  - only for POST or PUT or PATCH
    - body
  - for all methods
    - url or path parameter
    - query string
