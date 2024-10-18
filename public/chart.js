// Fetch the price range data from the API
fetch("/api/bar-chart-data")
	.then((response) => response.json())
	.then((data) => {
		// Prepare the data for the chart
		const labels = Object.keys(data); // Price ranges as labels
		const values = Object.values(data); // Count of items in each range

		// console.log(selectedMonth);

		// Create the bar chart
		const ctx = document.getElementById("barChart").getContext("2d");
		new Chart(ctx, {
			// type: "pie",
			type: "bar",
			data: {
				labels: labels,
				datasets: [
					{
						label: "# of Products",
						data: values,
						backgroundColor: "#40E0D0",
						// backgroundColor: [
						// 	"rgba(255, 99, 132, 0.2)",
						// 	"rgba(54, 162, 235, 0.2)",
						// 	"rgba(255, 206, 86, 0.2)",
						// 	"rgba(75, 192, 192, 0.2)",
						// 	"rgba(153, 102, 255, 0.2)",
						// 	"rgba(255, 159, 64, 0.2)",
						// 	"rgba(255, 99, 132, 0.2)",
						// 	"rgba(54, 162, 235, 0.2)",
						// 	"rgba(255, 206, 86, 0.2)",
						// 	"rgba(75, 192, 192, 0.2)",
						// 	"rgba(153, 102, 255, 0.2)",
						// ],
						borderColor: "#40E0D0",
						// borderColor: "black",
						borderWidth: 1,
					},
				],
			},
			options: {
				title: {
					display: true,
					text: "Bar Chart Stats - June",
				},
				scales: {
					y: {
						beginAtZero: true,
					},
				},
				responsive: true,
			},
		});
	})
	.catch((error) => console.error("Error fetching chart data:", error));
