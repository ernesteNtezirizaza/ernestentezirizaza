const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const port = process.env.PORT || 6000;
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.config");
dotenv.config();
app.use(express.urlencoded({ extended: false }));
connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

const Transactions = require("./routes/Transactions.routes");

app.use("/api/transactions", Transactions);

app.get("/", (req, res) => {
	res.status(200).json({success: true,message: "Welcome to transactions.",
	});
});


app.listen(
	port,
	console.log(`App is running on port ${port}`)
);