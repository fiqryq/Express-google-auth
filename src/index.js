const express = require("express");
const user = require("../controller/user");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(user);

app.listen(port);
