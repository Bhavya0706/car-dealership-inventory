const express = require("express");
const cors = require("cors");

const app = express();
const authRouts = require("./routes/auth.routes");
const carRouts = require("./routes/car.routes");
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
}));

app.use(express.json());
app.use("/api/auth",authRouts);
app.use("/api/cars",carRouts);


module.exports = app;