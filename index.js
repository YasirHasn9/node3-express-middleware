// code away!
const express = require("express");
const app = express();
const useServer = require("./server");
const usersRouter = require("./users/userRouter");
const userPosts = require("./posts/postRouter");

const port = 4000;

app.use(express.json());
app.use("/", useServer);
app.use("/users", usersRouter);
app.use("/posts", userPosts);


app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});
