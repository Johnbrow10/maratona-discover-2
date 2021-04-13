const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");

module.exports = {
  async save(req, res) {
    await Job.create({
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now(), // Atribuindo data de hoje
    });

    return res.redirect("/");
  },

  create(req, res) {
    return res.render("job");
  },

  async show(req, res) {
    const jobs = await Job.get();
    const jobId = req.params.id;
    const profile = await Profile.get();

    const job = jobs.find((job) => Number(job.id) === Number(jobId));

    if (!job) {
      return res.send("Job nots Found!");
    }

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

    return res.render("job-edit", { job });
  },

  async update(req, res) {
    const jobs = await Job.get();
    const jobId = req.params.id;

    const job = jobs.find((job) => Number(job.id) === Number(jobId));

    if (!job) {
      return res.send("Job nots Found!");
    }

    const updatedJob = {
      ...job,
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    };

    const newJobs = jobs.map((job) => {
      if (Number(job.id) === Number(jobId)) {
        job = updatedJob;
      }

      return job;
    });

    Job.update(newJobs);

    res.redirect("/job/" + jobId);
  },
  delete(req, res) {
    const jobId = req.params.id;

    Job.delete(jobId);

    return res.redirect("/");
  },
};
