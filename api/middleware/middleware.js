const User = require('../users/users-model')

function logger(req, res, next) {
  console.log(`
  Request Method: '${req.method}',
  Request URL: '${req.url}',
  Timestamp: '${new Date().toLocaleString()}'
  `)
  next()
}

 async function validateUserId(req, res, next) {
   try{
    const { id } = req.params
    console.log(`the id is ${id}`)
    const user = await User.getById(id)
    if (user) {
      req.user = user
      next()
    } else {
      next({ 
        status: 404,
        message: 'not found',
      })
    }
   } catch (err) {
    next(err)
   }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId
}