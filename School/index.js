const express = require("express");
const usersRouter = require("./routes/users-router");
const coursesRouter = require("./routes/courses-router");

const app = express();

app.use(express.json());
app.use("/api/users/", usersRouter);
app.use("/api/courses/", coursesRouter);

app.get("/", (_req, res) => {
  res.send("<h1>Welcome to the School API!</h1>");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
