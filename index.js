// code away!
const express = require("express");
const app = express();
const useServer = require("./server");

const port = 4000;

app.use(express.json());
app.use("/", useServer);


app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});
