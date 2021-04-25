const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("server is working"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
