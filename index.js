const express = require("express");
const app = express();

require("dotenv").config();
require("./startup/routes")(app);
require("./startup/db")(app);
require("./startup/validation")();
