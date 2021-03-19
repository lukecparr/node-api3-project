const { getById } = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  const currentDate = new Date();
  const formatedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
  console.log(`${req.method} | ${req.url} | ${formatedTime}`)
  next();

}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC

  const { id } = req.params;

  getById(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "User not found." });
      } else {
        req.user = data;
        next();
      }
    })
    .catch(() => serverError)
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC

  if (!req.body) {
    res.status(400).json({ message: "Missing user data." })
  } else if (!req.body.name) {
    res.status(400).json({ message: "Missing required name field" })
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC

  if (!req.body) {
    res.status(400).json({ message: "Missing post data." })
  } else if (!req.body.text) {
    res.status(400).json({ message: "Missing required text field" })
  } else {
    next();
  }
}

function serverError(req, res, next) {
  res.status(500).json({ message: "Server error" })
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
  serverError
}