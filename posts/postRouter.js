const express = require("express");
const postsDb = require("./postDb");
const router = express.Router();

router.get("/", async (req, res) => {
  // do your magic!
  const posts = await postsDb.get();
  if (posts) {
    return res.status(200).json(posts);
  } else {
    return res.status(404).json({
      message: "Posts can't be found"
    });
  }
});

router.get("/:id", validatePostId(), async (req, res) => {
  const user = await postsDb.getById(req.params.id);
  res.json(user);
});

router.put("/:id", async (req, res) => {
  // do your magic!
  if (!req.params.id) {
    return res.status(404).json({
      message: "This post cant be found"
    });
  }
  const user = await postsDb.update(req.params.id, req.body);
  res.json(user);
});

router.delete("/:id", async (req, res) => {
  // do your magic!
  if (!req.params.id) {
    return res.status(404).json({
      message: "This post cant be deleted"
    });
  }
  const user = await postsDb.remove(req.params.id);
  res.json(user);
});

// custom middleware

function validatePostId() {
  // do your magic!
  return async (req, res, next) => {
    try {
      let user = await postsDb.getById(req.params.id);
      if (user) {
        next();
      } else {
        res.status(500).json({
          message: "Not a valid ID "
        });
      }
    } catch (err) {
      next(err);
    }
  };
}

module.exports = router;
