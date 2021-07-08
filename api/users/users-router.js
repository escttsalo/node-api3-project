const express = require('express');
const User = require('./users-model')
const Post = require('../posts/posts-model')
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware')

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

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
    User.update(req.params.id, req.body)
      .then( updatedUser => {
        res.status(200).json(updatedUser)
      })
      .catch(error => {
        next(error)
      })
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId, async (req, res,next) => {
  try {
    const user = await User.getById(req.params.id)
    if (!user){
      next({
        status: 404,
        message: 'not found'
      })
    } else {
      await User.remove(req.params.id)
      res.status(200).json(user)
    }
  } catch (err) {
    next(err)
  }
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  try{
    const posts = await User.getUserPosts(req.params.id)
    if (posts) {
      res.status(200).json(posts)
    } else {
      res.status(404).json({message: 'Posts for specified user does not exist'})
    }
  } catch (err) {
    next(err)
  }
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  try {
    const post = await Post.insert({user_id: req.params.id, text: req.body.text})
    console.log(post)
    res.status(201).json(post)
  } catch (err) {
    next(err)
  }
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router