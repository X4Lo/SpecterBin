require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const accountRoutes = require("./routes/account.routes");
const pasteRoutes = require("./routes/paste.routes");
const errorHandler = require("./middlewares/errorHandler");
const deleteExpiredPastes = require("./tasks/deleteExpiredPastes");

const app = express();
connectDB();

// running pastes cleanup every 10 minutes (600,000 ms)
// setInterval(deleteExpiredPastes, 10 * 60 * 1000);

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);


app.use(express.json());
app.use("/accounts", accountRoutes);
app.use("/pastes", pasteRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
