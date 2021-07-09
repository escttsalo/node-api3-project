// require your server and launch it
require('dotenv').config()
const cors = require('cors')
const server = require('./api/server')

server.use(cors())

const PORT = process.env.PORT || 4000
console.log(PORT)

server.listen(PORT, () => {
    console.log(`\n Server Running on http://localhost:${PORT} \n`)
})