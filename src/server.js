const express = require("express");
const routes = require("./routes");
const app = express();

const path = require("path");

app.set("view engine", "ejs");

// mudar a localização da pasta views
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

// poder usar a requisição com o corpo
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(3000, () => console.log("rodando"));
