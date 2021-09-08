const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./routes/userRoute");
const todo = require("./routes/todoRoute");
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

mongoose
    .connect("mongodb://localhost:27017/to-do", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => {
        console.info("--- Database connected succesfully ---");
    })
    .catch(() => {
        console.error("--- Mongodb connection failed ---");
    });

const PORT = 8080;

app.listen(PORT, () => {
    console.info(`--- Server listening on PORT ${PORT} ---`);
});

app.use(router);
app.use("/todo", todo);
