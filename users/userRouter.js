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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  usersDb
    .getById(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(400).send({
          message: "invalid user id"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Error retrieving the user"
      });
    });
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
  if (!req.params.id) {
    return res.status(404).json({ message: "Can't be found" });
  }
  usersDb
    .getUserPosts(req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "can't retrieve the posts for this user"
      });
    });
});

router.delete("/:id", async (req, res) => {
  // do your magic!
  let { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "This id is not valid "
    });
  }

  let user = await usersDb.remove(id);
  res.status(500).json(user);
});

router.put("/:id", async (req, res) => {
  // do your magic!
  let { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "This id is not valid , can't update this user"
    });
  }
  let user = await usersDb.update(id, req.body);
  res.status(201).json(user);
});

router.post("/:id/posts", async (req, res) => {
  // do your magic!
  let user = await usersDb.getById(id);
  if (!user) {
    return res.status(400).json({
      message: "Can't be found"
    });
  }
  let newUser = await postsDb.insert(req.body);
  res.status(201).json(newUser);
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
