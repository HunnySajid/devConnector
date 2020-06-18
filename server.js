const express = require("express");
const connectDB = require("./config/db");
const routeToPaths = require("./routes");

const app = express();
// connect database
connectDB();
// Init Middlewares
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  return res.send("Hip Hip Hurrah Response");
});

// defines routes
routeToPaths(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
