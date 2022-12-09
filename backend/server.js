const express = require("express");
const dotenv = require("dotenv");
const {chats} = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const router = require("./routes/userRoutes");
const userRoutes = require("./routes/userRoutes");
const {notFound, errorHandler} = require("./middlewares/errorMiddleware");

dotenv.config();
connectDB();
const app = express();

//to accept json data
app.use(express.json());

app.get('/', (req, res) => {
    res.send("API is running successfully");
});

app.use('/api/user', userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`Server started on port ${PORT}`.yellow.bold));