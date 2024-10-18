<!DOCTYPE html>
<html>
<head>
    <title>Simple Chart</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <canvas id="myChart"></canvas>
    <script src="script.js"></script>
</body>
</html>const ctx = document.getElementById('myChart').getContext('2d');

async function fetchDataAndCreateChart() {
    try {
        const response = await axios.get('/api/data');
        const { labels, values } = response.data;

        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'My Chart',
                    data: values,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchDataAndCreateChart();