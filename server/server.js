const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const volleyball = require("volleyball");
const helmet = require("helmet");
const cors = require("cors");

// middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(volleyball);

// Routes
app.use("/api/v1", require("./Routes/Auth"));

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
