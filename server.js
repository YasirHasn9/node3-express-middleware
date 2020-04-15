const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// - `logger` logs to the console
function logger(req, res, next) {
  console.log(
    `Method:${req.method} \n url:${req.url} \n timestamp: ${new Date().toISOString()}`
  );
  next();
}
server.use(logger);
module.exports = server;
