const express = require("express");
const usersRouter = require("./routers/users-router");
const coursesRouter = require("./routers/courses-router");
const port = process.env.PORT || 8000;

require("./db/db");

const app = express();

app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/courses", coursesRouter);

app.get("/", (_req, res) => {
  res.send("<h1>Welcome to the School API!</h1>");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
