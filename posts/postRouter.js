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

router.get("/:id", async (req, res) => {
    // do your magic!
    if (!req.params.id) {
      return res.status(404).json({
        message: "This post cant be found"
      });
    }
    const user = await postsDb.getById(req.params.id);
    res.json(user);
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
