const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute")
const chatRoute = require("./routes/chatRoute")
const messageRoute = require("./routes/messageRoute")

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.get("/", (req, res) => {
  res.send("Welcome our chat app APIs..")
})

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("connected to database");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectDatabase();

const server = app.listen(process.env.PORT, () =>
  console.log(mongoose.connection.readyState),
  console.log(`Server started on ${process.env.PORT}`),
  console.log(`Server started on http://14.177.129.78:${process.env.PORT}`),
);
