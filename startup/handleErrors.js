require("express-async-errors");

module.exports = function() {
  process.on("uncaughtException", ex => {
    console.log(ex.message);
    setTimeout(() => {
      process.exit(1);
    }, 100);
  });

  process.on("unhandledRejection", ex => {
    throw ex;
  });
};
