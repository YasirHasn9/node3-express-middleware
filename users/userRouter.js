const express = require("express");
const usersDb = require("./userDb");
const postsDb = require("../posts/postDb");
const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
  usersDb
    .get()
    .then(users => res.status(200).json(users))
    .catch();
});

router.post("/", async (req, res) => {
  // do your magic!
  usersDb
    .insert(req.body)
    .then(user => {
      if (user) {
        res.status(201).json(user);
      } else {
        res.status(400).json({
          message: "missing required name field"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Cant add a new user"
      });
    });
});

router.get("/:id", validateUserId(), async (req, res, next) => {
  try {
    let user = await usersDb.getById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/posts", validateUserId(), async (req, res, next) => {
  // do your magic!
  try {
    let posts = await usersDb.getUserPosts(req.params.id);
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", validateUserId(), async (req, res, next) => {
  // do your magic!
  try {
    let user = await usersDb.remove(id);
    res.status(500).json(user);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validateUserId(), async (req, res, next) => {
  // do your magic!
  try {
    let user = await usersDb.update(id, req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

router.post("/:id/posts", validateUserId(), async (req, res, next) => {
  // do your magic!
  try {
    let newUser = await postsDb.insert(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

//custom middleware

function validateUserId() {
  // do your magic!

  return async (req, res, next) => {
    try {
      let user = await usersDb.getById(req.params.id);
      if (user) {
        next();
      } else {
        res.status(500).json({
          message: "Not a valid ID"
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
