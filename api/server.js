const path = require('path')
const cors = require('cors')
const express = require('express');
const { logger, notFound, errorHandling } = require('./middleware/middleware')
const usersRouter = require('./users/users-router') 
const server = express();
// remember express by default cannot parse JSON in request bodies
server.use(express.json())
server.use(cors())
server.use(express.static(path.join(__dirname, '../client/build')))
// global middlewares and the user's router need to be connected here
server.use(logger)
server.use('/api/users', usersRouter)

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
  // res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('*', notFound)
server.use(errorHandling)

module.exports = server;