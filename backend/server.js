const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
})
.then(() =>  console.log("Connected to MongoDB"))
.catch((err) => console.log(err))

// Routes
const noteRoutes = require("./routes/noteRoutes");
app.use("/api/notes", noteRoutes);

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
