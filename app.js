const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const AppRouter = require("./routes/AppRouter");

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());

app.get("/", (req, res) => res.json({ message: "Server Works" }));
app.use("/api", AppRouter);
app.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`));
