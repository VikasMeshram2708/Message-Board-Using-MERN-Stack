const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");
const volleyball = require("volleyball");
const helmet = require("helmet");

// Middlewares
app.use(cors());
app.use(volleyball);
app.use(express.json());
app.use(helmet());
app.use("/api/auth", require("./Routes/Auth"));
app.use("/api/board", require("./Routes/Board"));

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
