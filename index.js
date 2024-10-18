const express = require("express");
const axios = require("axios");
const app = express();

// Serve static files like CSS and JS
app.use(express.static("public"));

// API endpoint to fetch product transaction data and group by price ranges
app.get("/api/bar-chart-data", async (req, res) => {
	try {
		const response = await axios.get(
			"https://s3.amazonaws.com/roxiler.com/product_transaction.json"
		);
		const products = response.data;

		// Define the price ranges
		const priceRanges = {
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

		// Group products by price ranges
		products.forEach((product) => {
			const price = product.price;

			if (price >= 0 && price <= 100) priceRanges["0-100"]++;
			else if (price >= 101 && price <= 200) priceRanges["101-200"]++;
			else if (price >= 201 && price <= 300) priceRanges["201-300"]++;
			else if (price >= 301 && price <= 400) priceRanges["301-400"]++;
			else if (price >= 401 && price <= 500) priceRanges["401-500"]++;
			else if (price >= 501 && price <= 600) priceRanges["501-600"]++;
			else if (price >= 601 && price <= 700) priceRanges["601-700"]++;
			else if (price >= 701 && price <= 800) priceRanges["701-800"]++;
			else if (price >= 801 && price <= 900) priceRanges["801-900"]++;
			else if (price > 900) priceRanges["901-above"]++;
		});

		// Send the grouped data as a response
		res.json(priceRanges);
	} catch (error) {
		console.error("Error fetching product data:", error);
		res.status(500).send("Error fetching product data");
	}
});

// New API endpoint to fetch all transactions
app.get("/api/transactions", async (req, res) => {
	try {
		const response = await axios.get(
			"https://s3.amazonaws.com/roxiler.com/product_transaction.json"
		);
		const products = response.data;
		res.json(products);
	} catch (error) {
		console.error("Error fetching transactions:", error);
		res.status(500).send("Error fetching transactions");
	}
});

// Express route to get transaction statistics by month
app.get("/api/statistics", async (req, res) => {
	try {
		const response = await axios.get(
			"https://s3.amazonaws.com/roxiler.com/product_transaction.json"
		);
		const products = response.data;

		const totalSaleAmount = 1110;
		const totalSoldItems = 0;
		const totalNotSoldItems = 0;

		// Group products by price ranges
		products.forEach((product) => {
			// const price = product.price;
			totalSaleAmount += product.price;
			totalSoldItems += product.sold;
		});

		totalNotSoldItems = products.length - totalSoldItems;

		res.json({
			totalSaleAmount,
			totalSoldItems,
			totalNotSoldItems,
		});
	} catch (error) {
		console.error("Error fetching transactions:", error);
		res.status(500).send("Error fetching transactions");
	}
});

// Serve the HTML file
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
