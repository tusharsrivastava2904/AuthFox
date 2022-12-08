const express = require("express");
const dotenv = require("dotenv");
const {chats} = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");

dotenv.config();
connectDB();
const app = express();

app.get('/', (req, res) => {
    res.send("API is running successfully");
});

app.get("/chat", (req, res) => {
    res.send(chats);
});

app.get("/chat/:id", (req, res) => {
    // console.log(req.params.id);
    const singleChat = chats.find(c=>c._id===req.params.id);
    res.send(singleChat);
});

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`Server started on port ${PORT}`.yellow.bold));