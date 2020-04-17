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

router.post("/", validatePost(), async (req, res, next) => {
  try {
    let newUser = usersDb.insert(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/:id", validateUserId(), (req, res) => {
  res.json(req.user);
});

router.get("/:id/posts", validateUserId(), validateUser(), async (req, res) => {
  // do your magic!
  let posts = await usersDb.getUserPosts(req.params.id);
  res.json(posts);
});

router.delete(
  "/:id",
  validateUser(),
  validateUserId(),
  async (req, res, next) => {
    // do your magic!
    try {
      let user = await usersDb.remove(req.params.id);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }
);

router.put("/:id", validateUserId(), validateUser(), async (req, res, next) => {
  // do your magic!
  let user = await usersDb.update(req.params.id, req.body);
  res.status(201).json(user);
});

router.post("/:id/posts", validateUserId(), validatePost(), (req, res) => {
  const body = {
    text: req.body.text,
    user_id: req.user.id
  };

  usersDb
    .insert(body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      next(error);
    });
});

//custom middleware

function validateUserId() {
  // do your magic!
  return async (req, res, next) => {
    try {
      let user = await usersDb.getById(req.params.id);
      if (user) {
        req.user = user;
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

function validateUser() {
  // do your magic!
  return async (req, res, next) => {
    try {
      let user = await usersDb.getById(req.params.id);
      if (user) {
        next();
      } else {
        return res.status(500).json({
          message: "There is no user"
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

function validatePost() {
  // do your magic!
  // return (req, res, next) => {
  //   if (!req.body.name ) {
  //     res.status(401).json({
  //       message: "There is no name to add"
  //     });
  //   } else {
  //     next();
  //   }
  // };
  return (req, res, next) => {
    if (!req.body.name) {
      return res.status(400).json({ message: "missing post data" });
    } else {
      next();
    }
    if (!req.body.text) {
      return res.status(400).json({ message: "missing required text field" });
    } else {
      next();
    }
    next();
  };
}

module.exports = router;
