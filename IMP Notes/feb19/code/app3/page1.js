// import http module
const http = require('http')

// create a server
// callback
// - request: object sent by the client
// - response: object that will be sent to the client
const server = http.createServer((request, response) => {
  console.log(`client connected`)

  // url means the path
  console.log(`url = ${request.url}`)

  // GET: get a resource from serer
  // POST: send a resource to the server
  // PUT: update existing resource on the server
  // DELETE: delete a resource on the server
  console.log(`http method = ${request.method}`)

  // send the response
  // response.end()
  // response.end('this is a message from server')
  response.end('<h1 style="color: red">This is a message from server </h1>')
})

// listen on a port for incoming requests
server.listen(4000, '0.0.0.0', (error) => {
  if (error) {
    console.log(`error occurred while starting the server`, error)
  } else {
    console.log(`server started on port 4000`)
  }
})
