const Profile = require("../model/Profile");

module.exports = {
  async index(req, res) {
    return res.render("profile", { profile: await Profile.get() });
  },
  async update(req, res) {
    // req.body para pegar os dados
    const data = req.body;

    //  definir quanbtas semanas tem um ano: 52
    const weeksPerYar = 52;

    //  remover as semanas de ferias do ano, para pegar quantas semanas tem em um mes
    const weeksPeerMonth = (weeksPerYar - data["vacation-per-year"]) / 12;

    // quantas horas por semana estou trabalhando
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

    // total de horas trabalhadas no mes
    const monthlyTotalHours = weekTotalHours * weeksPeerMonth;

    // Qual sera meu valor por hora
    const valueHour = data["monthly-budget"] / monthlyTotalHours;

    const profile = await Profile.get();

    await Profile.update({
      ...profile,
      ...req.body,
      "value-hour": valueHour,
    });

    return res.redirect("/profile");
  },
};
