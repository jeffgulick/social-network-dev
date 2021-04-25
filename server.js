const express = require("express");
const connectDB = require("./config/dbConnection");

const app = express();

//database connection
connectDB();

app.get("/", (req, res) => res.send("server is working"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
