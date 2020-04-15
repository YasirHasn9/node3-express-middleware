const express = require("express");
const db = require("./userDb");
const router = express.Router();


router.get("/", (req, res) => {
  // do your magic!
  db.get()
    .then(users => res.status(200).json(users))
    .catch();
});

router.post("/", (req, res) => {
  // do your magic!
});


router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.getById(id)
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




router.post("/:id/posts", (req, res) => {
  // do your magic!
});




router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
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
