const Profile = require("../model/Profile");

module.exports = {
  index(req, res) {
    return res.render("profile", { profile: Profile.get() });
  },
  update(req, res) {
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

    Profile.update({
      ...Profile.get(),
      ...req.body,
      "value-hour": valueHour,
    });

    return res.redirect("/profile");
  },
};
