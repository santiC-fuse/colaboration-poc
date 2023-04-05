const express = require("express");
const bodyParser = require("body-parser");
const { newInstance, removeAllOrigins } = require("./services");

const app = express();
app.use(bodyParser.json());
const port = 3000;

//test api
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Create Repo
app.post("/new", async (req, res) => {
  try {
    const { name } = req.body;
    await newInstance(name);
    res.send("ok");
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

//Create Repo
app.post("/clear/origins", async (req, res) => {
  try {
    await removeAllOrigins();
    res.send("ok");
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
