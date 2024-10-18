const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection setup
const MONGO_URI = "mongodb://localhost:27017/mernChallenge";
mongoose
	.connect(MONGO_URI, { connectTimeoutMS: 30000 })
	.then(() => console.log("Connected to MongoDB"))
	.catch((error) => console.error("MongoDB connection error:", error));
// mongoose
// 	.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// 	.then(() => console.log("Connected to MongoDB"))
// 	.catch((error) => console.error("MongoDB connection error:", error));

// Add the connection event listeners
mongoose.connection.on("connected", () => {
	console.log("Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
	console.log("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
	console.log("Mongoose disconnected");
});

// Mongoose Schema and Model
const productTransactionSchema = new mongoose.Schema({
	title: String,
	description: String,
	price: Number,
	dateOfSale: String,
	category: String,
	sold: Boolean,
});

const ProductTransaction = mongoose.model(
	"ProductTransaction",
	productTransactionSchema
);

// Root route
app.get("/", (req, res) => {
	res.send("Welcome to the MERN Stack Coding Challenge API!");
});

// // API to initialize database with seed data from the third-party API
// app.get("/initialize", async (req, res) => {
// 	try {
// 		const response = await axios.get(
// 			"https://s3.amazonaws.com/roxiler.com/product_transaction.json"
// 		);
// 		await ProductTransaction.insertMany(response.data);
// 		res.status(200).send("Database initialized");
// 	} catch (error) {
// 		res.status(500).send("Error initializing database: " + error.message);
// 	}
// });

app.get("/initialize", async (req, res) => {
	try {
		const response = await axios.get(
			"https://s3.amazonaws.com/roxiler.com/product_transaction.json"
		);
		await ProductTransaction.insertMany(response.data);
		res.status(200).send("Database initialized with product transactions");
	} catch (error) {
		console.error("Error initializing database:", error.message);
		res.status(500).send("Error initializing database: " + error.message);
	}
});

// API to list transactions with search and pagination
app.get("/transactions", async (req, res) => {
	const { month, search, page = 1, perPage = 10 } = req.query;
	const query = {
		dateOfSale: { $regex: `-${month.padStart(2, "0")}-` },
	};
	if (search) {
		query.$or = [
			{ title: { $regex: search, $options: "i" } },
			{ description: { $regex: search, $options: "i" } },
			{ price: { $regex: search, $options: "i" } },
		];
	}
	try {
		const transactions = await ProductTransaction.find(query)
			.skip((page - 1) * perPage)
			.limit(parseInt(perPage));
		res.json(transactions);
	} catch (error) {
		res.status(500).send("Error fetching transactions: " + error.message);
	}
});

// API for statistics
app.get("/statistics", async (req, res) => {
	const { month } = req.query;
	try {
		const sales = await ProductTransaction.find({
			dateOfSale: { $regex: `-${month.padStart(2, "0")}-` },
		});
		const totalSales = sales.reduce((sum, sale) => sum + sale.price, 0);
		const soldItems = sales.filter((item) => item.sold).length;
		const notSoldItems = sales.length - soldItems;
		res.json({ totalSales, soldItems, notSoldItems });
	} catch (error) {
		res.status(500).send("Error fetching statistics: " + error.message);
	}
});

// API for bar chart data
app.get("/barchart", async (req, res) => {
	const { month } = req.query;
	try {
		const transactions = await ProductTransaction.find({
			dateOfSale: { $regex: `-${month.padStart(2, "0")}-` },
		});
		const ranges = {
			"0-100": 0,
			"101-200": 0,
			"201-300": 0,
			"301-400": 0,
			"401-500": 0,
			"501-600": 0,
			"601-700": 0,
			"701-800": 0,
			"801-900": 0,
			"901-above": 0,
		};
		transactions.forEach((tx) => {
			if (tx.price <= 100) ranges["0-100"]++;
			else if (tx.price <= 200) ranges["101-200"]++;
			else if (tx.price <= 300) ranges["201-300"]++;
			else if (tx.price <= 400) ranges["301-400"]++;
			else if (tx.price <= 500) ranges["401-500"]++;
			else if (tx.price <= 600) ranges["501-600"]++;
			else if (tx.price <= 700) ranges["601-700"]++;
			else if (tx.price <= 800) ranges["701-800"]++;
			else if (tx.price <= 900) ranges["801-900"]++;
			else ranges["901-above"]++;
		});
		res.json(ranges);
	} catch (error) {
		res.status(500).send("Error fetching bar chart data: " + error.message);
	}
});

// API for pie chart data
app.get("/piechart", async (req, res) => {
	const { month } = req.query;
	try {
		const transactions = await ProductTransaction.find({
			dateOfSale: { $regex: `-${month.padStart(2, "0")}-` },
		});
		const categoryCount = {};
		transactions.forEach((tx) => {
			categoryCount[tx.category] = (categoryCount[tx.category] || 0) + 1;
		});
		res.json(categoryCount);
	} catch (error) {
		res.status(500).send("Error fetching pie chart data: " + error.message);
	}
});

// API to get combined data from all APIs
app.get("/combined", async (req, res) => {
	const { month } = req.query;
	try {
		const [statistics, barChart, pieChart] = await Promise.all([
			axios.get(`/statistics?month=${month}`),
			axios.get(`/barchart?month=${month}`),
			axios.get(`/piechart?month=${month}`),
		]);
		res.json({
			statistics: statistics.data,
			barChart: barChart.data,
			pieChart: pieChart.data,
		});
	} catch (error) {
		res.status(500).send("Error fetching combined data: " + error.message);
	}
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
