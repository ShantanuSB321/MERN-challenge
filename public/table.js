// const transactionTableBody = document.getElementById("transactionTableBody");
// const currentPageElement = document.getElementById("currentPage");
// const nextPageButton = document.getElementById("nextPage");
// const previousPageButton = document.getElementById("previousPage");
// const perPageSelect = document.getElementById("perPage");

// let currentPage = 1;
// let perPage = 10;
// let totalPages = 0;
// let transactions = [];

// function fetchTransactions(page, perPage) {
// 	fetch(`/api/bar-chart-data?page=${page}&perPage=${perPage}`)
// 		.then((response) => response.json())
// 		.then((data) => {
// 			transactions = data;
// 			totalPages = Math.ceil(data.length / perPage);
// 			updateTable();
// 			updatePagination();
// 		})
// 		.catch((error) => console.error("Error fetching transactions:", error));
// }

// function updateTable() {
// 	transactionTableBody.innerHTML = "";
// 	transactions.forEach((transaction) => {
// 		const row = document.createElement("tr");
// 		row.innerHTML = `
//       <td>${transaction.id}</td>
//       <td>${transaction.productName}</td>
//       <td>${transaction.description}</td>
//       <td>${transaction.price}</td>
//       <td>${transaction.category}</td>
//       <td>${transaction.isSold ? "Yes" : "No"}</td>
//       <td><img src="${transaction.image}" alt="${
// 			transaction.productName
// 		}" width="100"></td>
//     `;
// 		transactionTableBody.appendChild(row);
// 	});
// }

// function updatePagination() {
// 	currentPageElement.textContent = currentPage;
// 	nextPageButton.disabled = currentPage === totalPages;
// 	previousPageButton.disabled = currentPage === 1;
// }

// // Initial data fetch
// fetchTransactions(1, perPage);

// // Event listeners for pagination buttons and per page select
// nextPageButton.addEventListener("click", () => {
// 	if (currentPage < totalPages) {
// 		currentPage++;
// 		fetchTransactions(currentPage, perPage);
// 	}
// });

// previousPageButton.addEventListener("click", () => {
// 	if (currentPage > 1) {
// 		currentPage--;
// 		fetchTransactions(currentPage, perPage);
// 	}
// });

// perPageSelect.addEventListener("change", () => {
// 	perPage = parseInt(perPageSelect.value);
// 	currentPage = 1;
// 	fetchTransactions(currentPage, perPage);
// });
