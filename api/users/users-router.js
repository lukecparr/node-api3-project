const express = require('express');

const Users = require('./users-model');
const Posts = require('../posts/posts-model');

const { validateUserId, validateUser, validatePost, serverError } = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res) => {

  Users.get()
  .then((data) => res.status(200).json(data))
  .catch(() => serverError)
});

router.get('/:id', validateUserId, (req, res) => {

  res.status(200).json(req.user);
  
});

router.post('/', validateUser, (req, res) => {

  Users.insert(req.body)
    .then((data) => res.status(201).json(data))
    .catch(() => serverError)
});

router.put('/:id', validateUserId, validateUser, (req, res) => {

  Users.update(req.user.id, req.body)
    .then(() => res.status(200).json(req.body))
    .catch(() => serverError)
});

router.delete('/:id', validateUserId, (req, res) => {

  Users.remove(req.user.id)
    .then(() => res.status(200).json(req.user))
    .catch(() => serverError)
});

router.get('/:id/posts', validateUserId, (req, res) => {

  Users.getUserPosts(req.user.id)
    .then((data) => res.status(200).json(data))
    .catch(() => serverError)
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {

  Posts.insert(req.body)
    .then((data) => res.status(200).json(req.user))
    .catch(() => serverError)
});

// do not forget to export the router
module.exports = router;
