const express = require("express");
const bodyParser = require("body-parser");
const { newInstance, forkInstance, getDiff } = require("./services");

const app = express();
app.use(bodyParser.json());
const port = 3000;

//test api
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Create Instance
app.post("/new", async (req, res) => {
  try {
    const { name } = req.body;
    const result = await newInstance(name);

    if (result.error) {
      res.status(400).send(result.error);
    }

    res.send(result.success);
  } catch (err) {
    res.send(err);
  }
});

//Fork Instance
app.post("/fork", async (req, res) => {
  try {
    const { name, origin } = req.body;
    const result = await forkInstance(name, origin);

    if (result.error) {
      res.status(400).send(result.error);
    }

    res.send(result.success);
  } catch (err) {
    res.send(err);
  }
});

//diff
app.post("/diff", async (req, res) => {
  try {
    const { name } = req.body;
    const result = await getDiff(name);

    if (result.error) {
      res.status(400).send(result.error);
    }

    res.send(result.success);
  } catch (err) {
    res.send(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
