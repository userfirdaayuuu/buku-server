const express = require("express");
const userRoute = require("./routes/UserRoute");
const bookRoute = require("./routes/BookRoute");
const reviewRoute = require("./routes/ReviewRoute");

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Book Store Api");
});

app.use(userRoute);
app.use(bookRoute);
app.use(reviewRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
