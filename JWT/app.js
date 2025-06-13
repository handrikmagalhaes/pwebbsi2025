const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const db = require("./db");
const path = require("path");
require('dotenv').config()

const app = express();
const PORT = 3000;
const SECRET_KEY = process.env.SECRET_KEY

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware de autenticação
function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.redirect("/login");

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.redirect("/login");
    req.user = user;
    next();
  });
}

// Rotas

app.get("/", (req, res) => {
  console.log(SECRET_KEY)
  res.redirect("/login")}
);

app.get("/register", (req, res) => {

  res.render("register");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.run(sql, [username, hashed], (err) => {
    if (err) return res.status(500).send("Erro ao registrar usuário.");
    res.redirect("/login");
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
    if (err || !user) return res.status(404).send("Usuário não encontrado.");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.send("Senha incorreta.");

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/dashboard");
  });
});

app.get("/dashboard", authenticateToken, (req, res) => {
  res.render("dashboard", { user: req.user });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando: http://localhost:${PORT}`);
});
