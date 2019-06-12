const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const dbString = "mongodb://localhost:27017/coursesAPI";

module.exports = function(app) {
  mongoose
    .connect(dbString, {
      useNewUrlParser: true
    })
    .then(() => {
      console.log("Connected to MongoDB");
      const port = process.env.PORT || 5010;
      app.listen(port, () => console.log(`Listening on port ${port}...`));
      return;
    })
    .catch(err => {
      console.error("Could not connect to MongoDB...", err);
      throw err;
    });
};
