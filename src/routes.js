const express = require("express");

const routes = express.Router();

const views = __dirname + "/views/";

const profile = {
  name: "Johnbrow",
  avatar:
    "https://lh3.googleusercontent.com/a-/AOh14GiIc7ZIPSQuhP3YOlUoUusgxzL4rispaiiRTKMUqw=s96-c-rg-br100",
  "monthly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 5,
  "vacation-per-year": 4,
};

//  req e res
routes.get("/", (req, res) => {
  return res.render(views + "index");
});
routes.get("/job", (req, res) => {
  return res.render(views + "job");
});
routes.post("/job", (req, res) => {
  console.log(req.body);
});
routes.get("/job/edit", (req, res) => {
  return res.render(views + "job-edit");
});
routes.get("/profile", (req, res) => {
  return res.render(views + "profile", { profile });
});

module.exports = routes;
