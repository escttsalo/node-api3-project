const express = require('express');
const User = require('./users-model')
const { validateUserId, validateUser } = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', async (req, res,next) => {
  try{
    const users = await User.get()
    res.status(200).json(users)
  } catch (error) {
    next({
      custom: 'problem getting users',
      message: error.message,
    })
  }
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post('/', validateUser, async (req, res, next) => {
  try {
    const newUser = await User.insert(req.body)
    res.status(201).json(newUser)
  } catch (err) {
    next(err)
  }
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router