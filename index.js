const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();
const connetDB = require("./config/db");
app.use(bodyParser.json());
app.use(cors());

// Connect to DB
connetDB();

//Router files
const order = require("./routes/order");

//Mount router
app.use("/api/v1/order", order);

app.listen(4002, async () => {
  console.log("Listening on 4002 query");
});
