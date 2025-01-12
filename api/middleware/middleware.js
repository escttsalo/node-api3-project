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
    // console.log(`the id is ${id}`)
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

async function validateUser(req, res, next) {
  if (!req.body.name){
    next({
      status: 400,
      message: 'missing required name'
    })
  } 
  next()
}

function validatePost(req, res, next) {
  if (!req.body.text){
    res.status(400).json({message: 'missing required text field'})
  } else {
    next()
  }
}

function notFound(req, res) {
  res.status(404).json({
    message: 'not found'
  })
}

function errorHandling(err, req, res, next) {
  const status = err.status || 500
  res.status(status).json({
    message: err.message
  })
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
  notFound,
  errorHandling,
}