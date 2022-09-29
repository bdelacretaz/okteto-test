const express = require("express");
const os = require("os");
const app = express();
const fs = require("fs");
const path = require("path");
const port = 8080;
const loadTime = new Date();
const version = 4;

app.get("/", (_req, res) => {
  res.send({
    version,
    name: os.hostname(),
    type: os.type(),
    uptime: os.uptime(),
    platform: os.platform(),
    loadTime
  })
});

app.get("/data", (_req, res) => {
  fs.readFile(
    path.join(__dirname, "/data.txt"),
    { encoding: "utf-8" },
    (err, f) => {
      if (err) console.log(err);

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "POST, GET");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.send(f);
    }
  );
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
