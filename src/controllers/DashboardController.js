const Job = require("../model/Job");
const Profile = require("../model/Profile");
const JobUtils = require("../utils/JobUtils");
module.exports = {
  index(req, res) {
    const jobs = Job.get();
    const profile = Profile.get();

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };
    // Total de horas por dia de cada trabalho em progresso
    let jobTotalHours = 0;

    const updateJobs = jobs.map((job) => {
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";

      //Dependendo se for done ou progress ele sempre vai adicionar +1 para cada status
      statusCount[status] += 1;

      // Dependendo se o status tiver como progress ele ira adicionar
      // no jobTotalHours as horas disponiveis para trabalhar no dia
      if (status == "progress") jobTotalHours += Number(job["daily-hours"]);

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"]),
      };
    });

    //  Qtd de horas que quero trabalhar por dia MENOS
    // a quantidade de horas / dia de cada job em progresso
    const freeHours = profile["hours-per-day"] - jobTotalHours;

    return res.render("index", {
      jobs: updateJobs,
      profile: profile,
      statusCount: statusCount,
      freeHours: freeHours,
    });
  },
};
