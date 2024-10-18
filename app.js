// {
// 	/* <script> */
// }
// // Fetch the price range data from the API
// fetch("/api/bar-chart-data")
// 	.then((response) => response.json())
// 	.then((data) => {
// 		// Prepare the data for the chart
// 		const labels = Object.keys(data); // Price ranges as labels
// 		const values = Object.values(data); // Count of items in each range

// 		// Create the bar chart
// 		const ctx = document.getElementById("barChart").getContext("2d");
// 		new Chart(ctx, {
// 			type: "bar",
// 			data: {
// 				labels: labels,
// 				datasets: [
// 					{
// 						label: "# of Products",
// 						data: values,
// 						backgroundColor: [
// 							"rgba(255, 99, 132, 0.2)",
// 							"rgba(54, 162, 235, 0.2)",
// 							"rgba(255, 206, 86, 0.2)",
// 							"rgba(75, 192, 192, 0.2)",
// 							"rgba(153, 102, 255, 0.2)",
// 							"rgba(255, 159, 64, 0.2)",
// 							"rgba(255, 99, 132, 0.2)",
// 							"rgba(54, 162, 235, 0.2)",
// 							"rgba(255, 206, 86, 0.2)",
// 							"rgba(75, 192, 192, 0.2)",
// 							"rgba(153, 102, 255, 0.2)",
// 						],
// 						borderColor: [
// 							"rgba(255, 99, 132, 1)",
// 							"rgba(54, 162, 235, 1)",
// 							"rgba(255, 206, 86, 1)",
// 							"rgba(75, 192, 192, 1)",
// 							"rgba(153, 102, 255, 1)",
// 							"rgba(255, 159, 64, 1)",
// 							"rgba(255, 99, 132, 1)",
// 							"rgba(54, 162, 235, 1)",
// 							"rgba(255, 206, 86, 1)",
// 							"rgba(75, 192, 192, 1)",
// 							"rgba(153, 102, 255, 1)",
// 						],
// 						borderWidth: 1,
// 					},
// 				],
// 			},
// 			options: {
// 				scales: {
// 					y: {
// 						beginAtZero: true,
// 					},
// 				},
// 				responsive: true,
// 			},
// 		});
// 	})
// 	.catch((error) => console.error("Error fetching chart data:", error));

// // Fetch all transactions from the API and populate the table
// fetch("/api/transactions")
// 	.then((response) => response.json())
// 	.then((transactions) => {
// 		const tbody = document.querySelector("#transactionsTable tbody");
// 		transactions.forEach((transaction) => {
// 			const row = document.createElement("tr");
// 			row.innerHTML = `
//                         <td>${transaction.id}</td>
//                         <td>${transaction.title}</td>
//                         <td>${transaction.description}</td>
//                         <td>${transaction.price}</td>
//                         <td>${transaction.category}</td>
//                         <td>${transaction.sold}</td>
//                         <td><img src="${transaction.image}" alt="${transaction.title}" style="width: 50px;"/></td>
//                     `;
// 			tbody.appendChild(row);
// 		});
// 	})
// 	.catch((error) => console.error("Error fetching transactions:", error));
// {
// 	/* </script> */
// }
