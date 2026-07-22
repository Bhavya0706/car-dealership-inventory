const express = require("express");
const cors = require("cors");

const app = express();
const authRouts = require("./routes/auth.routes");
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
}));

app.use(express.json());
app.use("/api/auth",authRouts);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "testing"
    });
});

module.exports = app;