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
  "value-hour": 75,
};

const jobs = [
  {
    id: 1,
    name: "Pizzaria Gulloso",
    "daily-hours": 2,
    "total-hours": 2,
    created_at: Date.now(),
  },

  {
    id: 2,
    name: "OneTwo Project",
    "daily-hours": 3,
    "total-hours": 47,
    created_at: Date.now(),
  },
];

function remainingDays(job) {
  // Calculo de dias que falta
  const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();

  const createdDate = new Date(job.created_at);
  const dueDay = createdDate.getDate() + Number(remainingDays);
  const dueDateInMs = createdDate.setDate(dueDay);

  const timeDiffInMs = dueDateInMs - Date.now();

  const dayInMs = 1000 * 60 * 60 * 24;

  const dayDiff = Math.floor(timeDiffInMs / dayInMs);

  return dayDiff;
}

//  req e res
routes.get("/", (req, res) => {
  // ajustes no job
  const updateJobs = jobs.map((job) => {
    const remaining = remainingDays(job);
    const status = remaining <= 0 ? "done" : "progress";

    return {
      ...job,
      remaining,
      status,
      budget: profile["value-hour"] * job["total-hours"],
    };
  });

  return res.render(views + "index", { jobs: updateJobs });
});
routes.get("/job", (req, res) => {
  return res.render(views + "job");
});
routes.post("/job", (req, res) => {
  //  gambiarra linda kkkkk e para achar um id dependendo da posição do array
  const lastId = jobs[jobs.length - 1]?.id || 1;

  jobs.push({
    id: lastId + 1,
    name: req.body.name,
    "daily-hours": req.body["daily-hours"],
    "total-hours": req.body["total-hours"],
    created_at: Date.now(),
  });

  return res.redirect("/");
});
routes.get("/job/edit", (req, res) => {
  return res.render(views + "job-edit");
});
routes.get("/profile", (req, res) => {
  return res.render(views + "profile", { profile });
});

module.exports = routes;
