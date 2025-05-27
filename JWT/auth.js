const express = require('express')
const jwt = require('jsonwebtoken')
// Middleware de autenticação
const token = req.cookies.token;
if (!token) return res.redirect("/login");

jwt.verify(token, SECRET_KEY, (err, user) => {
if (err) return res.redirect("/login");
req.user = user;
next();
});

module.exports = authenticateToken