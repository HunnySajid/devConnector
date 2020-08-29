const routeToPaths = (app) => {
  app.use("/api/users", require("./api/users"));
  app.use("/api/auth", require("./api/auth"));
  app.use("/api/profile", require("./api/profiles"));
  app.use("/api/posts", require("./api/posts"));
};

module.exports = routeToPaths;
