document.addEventListener("DOMContentLoaded", function () {
    const cryptoTable = document.getElementById("crypto-table");
    const searchInput = document.getElementById("search");
    const themeToggle = document.getElementById("theme-toggle");

    function fetchCryptoData() {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
            .then(response => response.json())
            .then(data => {
                displayData(data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }

    function displayData(data) {
        cryptoTable.innerHTML = "";
        data.slice(0, 10).forEach(coin => {
            let row = `
                <tr>
                    <td>${coin.name}</td>
                    <td>${coin.symbol.toUpperCase()}</td>
                    <td>$${coin.current_price.toFixed(2)}</td>
                    <td style="color:${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}">
                        ${coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                </tr>`;
            cryptoTable.innerHTML += row;
        });
    }

    // Search Functionality
    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase();
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(coin => 
                    coin.name.toLowerCase().includes(query) || 
                    coin.symbol.toLowerCase().includes(query)
                );
                displayData(filteredData);
            })
            .catch(error => console.error("Error fetching data:", error));
    });

    // Dark Mode Toggle
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
    });

    // Auto Refresh every 30 seconds
    fetchCryptoData();
    setInterval(fetchCryptoData, 30000);
});
document.addEventListener("DOMContentLoaded", function () {
    const cryptoTable = document.getElementById("crypto-table");
    const searchInput = document.getElementById("search");
    const themeToggle = document.getElementById("theme-toggle");
    const ctx = document.getElementById("cryptoChart").getContext("2d");
    let chartInstance;

    function fetchCryptoData() {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
            .then(response => response.json())
            .then(data => {
                displayData(data);
                fetchHistoricalData(data[0].id); // Fetch history for first coin
            })
            .catch(error => console.error("Error fetching data:", error));
    }

    function displayData(data) {
        cryptoTable.innerHTML = "";
        data.slice(0, 10).forEach(coin => {
            let row = `
                <tr>
                    <td>${coin.name}</td>
                    <td>${coin.symbol.toUpperCase()}</td>
                    <td>$${coin.current_price.toFixed(2)}</td>
                    <td style="color:${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}">
                        ${coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td><button onclick="fetchHistoricalData('${coin.id}')">📈 View Chart</button></td>
                </tr>`;
            cryptoTable.innerHTML += row;
        });
    }

    function fetchHistoricalData(coinId) {
        fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30`)
            .then(response => response.json())
            .then(data => {
                const dates = data.prices.map(price => new Date(price[0]).toLocaleDateString());
                const prices = data.prices.map(price => price[1]);
                updateChart(dates, prices);
            })
            .catch(error => console.error("Error fetching historical data:", error));
    }

    function updateChart(labels, data) {
        if (chartInstance) {
            chartInstance.destroy();
        }
        chartInstance = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "Price (USD)",
                    data: data,
                    borderColor: "#007bff",
                    fill: false
                }]
            }
        });
    }

    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
    });

    fetchCryptoData();
    setInterval(fetchCryptoData, 30000);
});
document.addEventListener("DOMContentLoaded", function () {
    const cryptoTable = document.getElementById("crypto-table");
    const searchInput = document.getElementById("search");
    const themeToggle = document.getElementById("theme-toggle");
    const ctx = document.getElementById("cryptoChart").getContext("2d");
    let chartInstance;

    function fetchCryptoData() {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
            .then(response => response.json())
            .then(data => {
                displayData(data);
                fetchHistoricalData(data[0].id); // Fetch history for first coin
            })
            .catch(error => console.error("Error fetching data:", error));
    }

    function displayData(data) {
        cryptoTable.innerHTML = "";
        data.slice(0, 10).forEach(coin => {
            let row = `
                <tr>
                    <td>${coin.name}</td>
                    <td>${coin.symbol.toUpperCase()}</td>
                    <td>$${coin.current_price.toFixed(2)}</td>
                    <td style="color:${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}">
                        ${coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td><button onclick="fetchHistoricalData('${coin.id}')">📈 View Chart</button></td>
                </tr>`;
            cryptoTable.innerHTML += row;
        });
    }

    function fetchHistoricalData(coinId) {
        fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30`)
            .then(response => response.json())
            .then(data => {
                const dates = data.prices.map(price => new Date(price[0]).toLocaleDateString());
                const prices = data.prices.map(price => price[1]);
                updateChart(dates, prices);
            })
            .catch(error => console.error("Error fetching historical data:", error));
    }

    function updateChart(labels, data) {
        if (chartInstance) {
            chartInstance.destroy();
        }
        const isDarkMode = document.body.classList.contains("dark-mode");
        chartInstance = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "Price (USD)",
                    data: data,
                    borderColor: isDarkMode ? "#ffffff" : "#007bff",
                    backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,123,255,0.2)",
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: isDarkMode ? "#ffffff" : "#333"
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: isDarkMode ? "#ffffff" : "#333"
                        }
                    },
                    y: {
                        ticks: {
                            color: isDarkMode ? "#ffffff" : "#333"
                        }
                    }
                }
            }
        });
    }

    // Dark Mode Toggle
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
        updateChartTheme();
    });

    function updateChartTheme() {
        if (chartInstance) {
            fetchCryptoData();
        }
    }

    fetchCryptoData();
    setInterval(fetchCryptoData, 30000);
});
document.addEventListener("DOMContentLoaded", function () {
    const cryptoTable = document.getElementById("crypto-table");
    const searchInput = document.getElementById("search");
    const themeToggle = document.getElementById("theme-toggle");

    function fetchCryptoData() {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
            .then(response => response.json())
            .then(data => {
                displayData(data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }

    function displayData(data) {
        cryptoTable.innerHTML = "";
        data.slice(0, 10).forEach(coin => {
            let updatedTime = new Date().toLocaleTimeString();
            let row = `
                <tr>
                    <td>${coin.name}</td>
                    <td>${coin.symbol.toUpperCase()}</td>
                    <td>$${coin.current_price.toFixed(2)}</td>
                    <td style="color:${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}">
                        ${coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td>${updatedTime}</td>
                </tr>`;
            cryptoTable.innerHTML += row;
        });
    }

    // Dark Mode Toggle
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
    });

    // Fetch data every 10 seconds
    fetchCryptoData();
    setInterval(fetchCryptoData, 10000);
});
document.addEventListener("DOMContentLoaded", function () {
    const cryptoTable = document.getElementById("crypto-table");
    const searchInput = document.getElementById("search");
    const themeToggle = document.getElementById("theme-toggle");

    function fetchCryptoData() {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
            .then(response => response.json())
            .then(data => {
                displayData(data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }

    function displayData(data) {
        cryptoTable.innerHTML = "";
        data.slice(0, 10).forEach(coin => {
            let updatedTime = new Date().toLocaleTimeString();
            let row = `
                <tr>
                    <td>${coin.name}</td>
                    <td>${coin.symbol.toUpperCase()}</td>
                    <td>$${coin.current_price.toFixed(2)}</td>
                    <td style="color:${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}">
                        ${coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td>${updatedTime}</td>
                </tr>`;
            cryptoTable.innerHTML += row;
        });
    }

    // Dark Mode Toggle
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
    });

    // Fetch data every 10 seconds
    fetchCryptoData();
    setInterval(fetchCryptoData, 10000);
});
document.addEventListener("DOMContentLoaded", function () {
    const cryptoTable = document.getElementById("crypto-table");
    const searchInput = document.getElementById("search");
    const themeToggle = document.getElementById("theme-toggle");

    // Check saved theme preference
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️ Light Mode";
    }

    function fetchCryptoData() {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
            .then(response => response.json())
            .then(data => {
                displayData(data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }

    function displayData(data) {
        cryptoTable.innerHTML = "";
        data.slice(0, 10).forEach(coin => {
            let updatedTime = new Date().toLocaleTimeString();
            let row = `
                <tr>
                    <td>${coin.name}</td>
                    <td>${coin.symbol.toUpperCase()}</td>
                    <td>$${coin.current_price.toFixed(2)}</td>
                    <td style="color:${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}">
                        ${coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td>${updatedTime}</td>
                </tr>`;
            cryptoTable.innerHTML += row;
        });
    }

    // Dark Mode Toggle with Local Storage
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        const isDarkMode = document.body.classList.contains("dark-mode");
        themeToggle.textContent = isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
        
        // Save preference to localStorage
        localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
    });

    // Fetch data every 10 seconds
    fetchCryptoData();
    setInterval(fetchCryptoData, 10000);
});
document.addEventListener("DOMContentLoaded", function () {
    const cryptoTable = document.getElementById("crypto-table");
    const searchInput = document.getElementById("search");
    const themeToggle = document.getElementById("theme-toggle");

    // Check saved theme preference
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️ Light Mode";
    }

    function fetchCryptoData() {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
            .then(response => response.json())
            .then(data => {
                displayData(data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }

    function displayData(data) {
        cryptoTable.innerHTML = "";
        data.slice(0, 10).forEach(coin => {
            let updatedTime = new Date().toLocaleTimeString();
            let row = `
                <tr>
                    <td>${coin.name}</td>
                    <td>${coin.symbol.toUpperCase()}</td>
                    <td>$${coin.current_price.toFixed(2)}</td>
                    <td style="color:${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}">
                        ${coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td>${updatedTime}</td>
                </tr>`;
            cryptoTable.innerHTML += row;
        });
    }

    // Dark Mode Toggle with Local Storage
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        const isDarkMode = document.body.classList.contains("dark-mode");
        themeToggle.textContent = isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
        
        // Save preference to localStorage
        localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
    });

    // Fetch data every 10 seconds
    fetchCryptoData();
    setInterval(fetchCryptoData, 10000);
});
document.addEventListener("DOMContentLoaded", function () {
    const cryptoTable = document.getElementById("crypto-table");
    const searchInput = document.getElementById("search");
    const themeToggle = document.getElementById("theme-toggle");
    const cryptoSelect = document.getElementById("crypto-select");
    let chartInstance = null;

    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️ Light Mode";
    }

    function fetchCryptoData() {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
            .then(response => response.json())
            .then(data => displayData(data))
            .catch(error => console.error("Error fetching data:", error));
    }

    function displayData(data) {
        cryptoTable.innerHTML = "";
        data.slice(0, 10).forEach(coin => {
            let updatedTime = new Date().toLocaleTimeString();
            let row = `
                <tr>
                    <td>${coin.name}</td>
                    <td>${coin.symbol.toUpperCase()}</td>
                    <td>$${coin.current_price.toFixed(2)}</td>
                    <td style="color:${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}">
                        ${coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td>${updatedTime}</td>
                </tr>`;
            cryptoTable.innerHTML += row;
        });
    }

    // Fetch Historical Data & Draw Chart
    function fetchChartData(cryptoId) {
        fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=7`)
            .then(response => response.json())
            .then(data => {
                const prices = data.prices.map(p => p[1]); // Extract price
                const dates = data.prices.map(p => new Date(p[0]).toLocaleDateString());

                drawChart(dates, prices, cryptoId);
            })
            .catch(error => console.error("Error fetching chart data:", error));
    }

    // Draw Chart with Chart.js
    function drawChart(labels, data, cryptoId) {
        const ctx = document.getElementById("cryptoChart").getContext("2d");
        if (chartInstance) chartInstance.destroy();

        chartInstance = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: `${cryptoId.toUpperCase()} Price (USD)`,
                    data: data,
                    borderColor: "#007bff",
                    backgroundColor: "rgba(0, 123, 255, 0.2)",
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Dark Mode Toggle
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        const isDarkMode = document.body.classList.contains("dark-mode");
        themeToggle.textContent = isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
        localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
    });

    // Crypto Selection Change
    cryptoSelect.addEventListener("change", function () {
        fetchChartData(cryptoSelect.value);
    });

    // Initialize
    fetchCryptoData();
    fetchChartData("bitcoin"); // Default chart
    setInterval(fetchCryptoData, 10000);
});
document.addEventListener("DOMContentLoaded", function () {
    const cryptoTable = document.getElementById("crypto-table");
    const searchInput = document.getElementById("search");
    const themeToggle = document.getElementById("theme-toggle");
    const cryptoSelect = document.getElementById("crypto-select");
    const timeframeSelect = document.getElementById("timeframe-select");
    let chartInstance = null;

    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️ Light Mode";
    }

    function fetchCryptoData() {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
            .then(response => response.json())
            .then(data => displayData(data))
            .catch(error => console.error("Error fetching data:", error));
    }

    function displayData(data) {
        cryptoTable.innerHTML = "";
        data.slice(0, 10).forEach(coin => {
            let updatedTime = new Date().toLocaleTimeString();
            let row = `
                <tr>
                    <td>${coin.name}</td>
                    <td>${coin.symbol.toUpperCase()}</td>
                    <td>$${coin.current_price.toFixed(2)}</td>
                    <td style="color:${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}">
                        ${coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td>${updatedTime}</td>
                </tr>`;
            cryptoTable.innerHTML += row;
        });
    }

    // Fetch Historical Data & Draw Chart
    function fetchChartData(cryptoId, days) {
        fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=${days}`)
            .then(response => response.json())
            .then(data => {
                const prices = data.prices.map(p => p[1]); // Extract price
                const dates = data.prices.map(p => new Date(p[0]).toLocaleDateString());

                drawChart(dates, prices, cryptoId, days);
            })
            .catch(error => console.error("Error fetching chart data:", error));
    }

    // Draw Chart with Chart.js
    function drawChart(labels, data, cryptoId, days) {
        const ctx = document.getElementById("cryptoChart").getContext("2d");
        if (chartInstance) chartInstance.destroy();

        chartInstance = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: `${cryptoId.toUpperCase()} Price (${days} Days)`,
                    data: data,
                    borderColor: "#007bff",
                    backgroundColor: "rgba(0, 123, 255, 0.2)",
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Dark Mode Toggle
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        const isDarkMode = document.body.classList.contains("dark-mode");
        themeToggle.textContent = isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
        localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
    });

    // Crypto or Timeframe Selection Change
    function updateChart() {
        fetchChartData(cryptoSelect.value, timeframeSelect.value);
    }

    cryptoSelect.addEventListener("change", updateChart);
    timeframeSelect.addEventListener("change", updateChart);

    // Initialize
    fetchCryptoData();
    updateChart(); // Default chart
    setInterval(fetchCryptoData, 10000);
});
function predictPrice(prices) {
    let n = prices.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;

    for (let i = 0; i < n; i++) {
        sumX += i;
        sumY += prices[i];
        sumXY += i * prices[i];
        sumXX += i * i;
    }

    let slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    let intercept = (sumY - slope * sumX) / n;

    let predictedPrice = slope * (n + 1) + intercept;
    return predictedPrice.toFixed(2);
}

function fetchChartData(cryptoId, days) {
    fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=${days}`)
        .then(response => response.json())
        .then(data => {
            const prices = data.prices.map(p => p[1]);
            const dates = data.prices.map(p => new Date(p[0]).toLocaleDateString());

            drawChart(dates, prices, cryptoId, days);

            // Predict Future Price
            const predicted = predictPrice(prices);
            document.getElementById("predicted-price").innerHTML = `Next Estimated Price: $${predicted}`;
        })
        .catch(error => console.error("Error fetching chart data:", error));
}
function predictPrice(prices) {
    let n = prices.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;

    for (let i = 0; i < n; i++) {
        sumX += i;
        sumY += prices[i];
        sumXY += i * prices[i];
        sumXX += i * i;
    }

    let slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    let intercept = (sumY - slope * sumX) / n;

    let futurePrices = [];
    for (let i = 0; i < n + 3; i++) { // Extending 3 future points
        futurePrices.push(slope * i + intercept);
    }

    return futurePrices;
}

function fetchChartData(cryptoId, days) {
    fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=${days}`)
        .then(response => response.json())
        .then(data => {
            const prices = data.prices.map(p => p[1]);
            const dates = data.prices.map(p => new Date(p[0]).toLocaleDateString());

            // Generate Future Dates
            let futureDates = [...dates];
            for (let i = 1; i <= 3; i++) {
                let nextDate = new Date();
                nextDate.setDate(nextDate.getDate() + i);
                futureDates.push(nextDate.toLocaleDateString());
            }

            let predictedPrices = predictPrice(prices);
            drawChart(futureDates, prices, predictedPrices, cryptoId, days);

            // Update Predicted Price Text
            let futurePrice = predictedPrices[predictedPrices.length - 1].toFixed(2);
            document.getElementById("predicted-price").innerHTML = `Next Estimated Price: $${futurePrice}`;
        })
        .catch(error => console.error("Error fetching chart data:", error));
}

function drawChart(labels, actualData, predictedData, cryptoId, days) {
    const ctx = document.getElementById("cryptoChart").getContext("2d");
    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: `${cryptoId.toUpperCase()} Actual Prices (USD)`,
                    data: actualData,
                    borderColor: "#007bff",
                    backgroundColor: "rgba(0, 123, 255, 0.2)",
                    borderWidth: 2,
                },
                {
                    label: "Predicted Trend",
                    data: predictedData,
                    borderColor: "red",
                    borderDash: [5, 5],
                    borderWidth: 2,
                    backgroundColor: "rgba(255, 0, 0, 0.2)",
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
let pastPredictions = JSON.parse(localStorage.getItem("pastPredictions")) || [];

function savePrediction(date, predictedPrice, actualPrice) {
    let difference = ((actualPrice - predictedPrice) / predictedPrice) * 100;
    pastPredictions.push({ date, predictedPrice, actualPrice, difference: difference.toFixed(2) });

    if (pastPredictions.length > 10) pastPredictions.shift(); // Keep last 10 records
    localStorage.setItem("pastPredictions", JSON.stringify(pastPredictions));

    updatePredictionTable();
}

function updatePredictionTable() {
    let tableBody = document.getElementById("prediction-table").querySelector("tbody");
    tableBody.innerHTML = "";

    pastPredictions.forEach(entry => {
        let row = `
            <tr>
                <td>${entry.date}</td>
                <td>$${entry.predictedPrice.toFixed(2)}</td>
                <td>$${entry.actualPrice.toFixed(2)}</td>
                <td style="color:${entry.difference >= 0 ? 'green' : 'red'}">
                    ${entry.difference}%
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function fetchChartData(cryptoId, days) {
    fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=${days}`)
        .then(response => response.json())
        .then(data => {
            const prices = data.prices.map(p => p[1]);
            const dates = data.prices.map(p => new Date(p[0]).toLocaleDateString());

            let predictedPrices = predictPrice(prices);
            let futurePrice = predictedPrices[predictedPrices.length - 1].toFixed(2);
            document.getElementById("predicted-price").innerHTML = `Next Estimated Price: $${futurePrice}`;

            let today = new Date().toLocaleDateString();
            let latestActualPrice = prices[prices.length - 1];

            savePrediction(today, parseFloat(futurePrice), latestActualPrice);
            drawChart(dates, prices, predictedPrices, cryptoId, days);
        })
        .catch(error => console.error("Error fetching chart data:", error));
}

// Load past predictions on page load
updatePredictionTable();
const deviationThreshold = 5; // Set threshold for alerts (5%)

function checkPriceDeviation(predictedPrice, actualPrice) {
    let deviation = ((actualPrice - predictedPrice) / predictedPrice) * 100;
    
    if (Math.abs(deviation) > deviationThreshold) {
        showAlert(`🚨 Price Alert: Prediction was off by ${deviation.toFixed(2)}%!`);
    }
}

function showAlert(message) {
    const alertBox = document.getElementById("alert-box");
    const alertMessage = document.getElementById("alert-message");

    alertMessage.textContent = message;
    alertBox.style.display = "block";

    setTimeout(() => {
        alertBox.style.display = "none";
    }, 5000);
}

function closeAlert() {
    document.getElementById("alert-box").style.display = "none";
}

function savePrediction(date, predictedPrice, actualPrice) {
    let difference = ((actualPrice - predictedPrice) / predictedPrice) * 100;
    
    pastPredictions.push({ date, predictedPrice, actualPrice, difference: difference.toFixed(2) });

    if (pastPredictions.length > 10) pastPredictions.shift();
    localStorage.setItem("pastPredictions", JSON.stringify(pastPredictions));

    checkPriceDeviation(predictedPrice, actualPrice);
    updatePredictionTable();
}
const deviationThreshold = 5;
const userPhoneNumber = "+1234567890";  // Replace with actual user phone number
const userEmail = "user@example.com";   // Replace with actual user email

function checkPriceDeviation(predictedPrice, actualPrice) {
    let deviation = ((actualPrice - predictedPrice) / predictedPrice) * 100;

    if (Math.abs(deviation) > deviationThreshold) {
        let alertMessage = `🚨 Price Alert: Prediction was off by ${deviation.toFixed(2)}%!`;
        showAlert(alertMessage);
        sendSMS(alertMessage);
        sendEmail(alertMessage);
    }
}

function sendSMS(message) {
    fetch("http://localhost:3000/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, phoneNumber: userPhoneNumber }),
    })
    .then(response => response.text())
    .then(data => console.log("SMS Sent:", data))
    .catch(error => console.error("SMS Error:", error));
}

function sendEmail(message) {
    emailjs.send("your_service_id", "your_template_id", {
        to_email: userEmail,
        message: message
    })
    .then(response => console.log("Email Sent:", response))
    .catch(error => console.error("Email Error:", error));
}
// Load user settings
let notificationSettings = JSON.parse(localStorage.getItem("notificationSettings")) || {
    sms: true,
    email: true
};

document.getElementById("enable-sms").checked = notificationSettings.sms;
document.getElementById("enable-email").checked = notificationSettings.email;

document.getElementById("enable-sms").addEventListener("change", function() {
    notificationSettings.sms = this.checked;
    localStorage.setItem("notificationSettings", JSON.stringify(notificationSettings));
});

document.getElementById("enable-email").addEventListener("change", function() {
    notificationSettings.email = this.checked;
    localStorage.setItem("notificationSettings", JSON.stringify(notificationSettings));
});

function checkPriceDeviation(predictedPrice, actualPrice) {
    let deviation = ((actualPrice - predictedPrice) / predictedPrice) * 100;

    if (Math.abs(deviation) > deviationThreshold) {
        let alertMessage = `🚨 Price Alert: Prediction was off by ${deviation.toFixed(2)}%!`;
        showAlert(alertMessage);

        if (notificationSettings.sms) sendSMS(alertMessage);
        if (notificationSettings.email) sendEmail(alertMessage);
    }
}
// Load saved settings on page load
let notificationSettings = JSON.parse(localStorage.getItem("notificationSettings")) || { sms: true, email: true };

document.getElementById("enable-sms").checked = notificationSettings.sms;
document.getElementById("enable-email").checked = notificationSettings.email;

document.getElementById("enable-sms").addEventListener("change", function() {
    notificationSettings.sms = this.checked;
    localStorage.setItem("notificationSettings", JSON.stringify(notificationSettings));
});

document.getElementById("enable-email").addEventListener("change", function() {
    notificationSettings.email = this.checked;
    localStorage.setItem("notificationSettings", JSON.stringify(notificationSettings));
});

function checkPriceDeviation(predictedPrice, actualPrice) {
    let deviation = ((actualPrice - predictedPrice) / predictedPrice) * 100;

    if (Math.abs(deviation) > deviationThreshold) {
        let alertMessage = `🚨 Price Alert: Prediction was off by ${deviation.toFixed(2)}%!`;
        showAlert(alertMessage);

        if (notificationSettings.sms) sendSMS(alertMessage);
        if (notificationSettings.email) sendEmail(alertMessage);
    }
}
// Load user settings
let notificationSettings = JSON.parse(localStorage.getItem("notificationSettings")) || { sms: true, email: true };
let userContact = JSON.parse(localStorage.getItem("userContact")) || { phone: "", email: "" };

// Set input values from saved settings
document.getElementById("enable-sms").checked = notificationSettings.sms;
document.getElementById("enable-email").checked = notificationSettings.email;
document.getElementById("user-phone").value = userContact.phone;
document.getElementById("user-email").value = userContact.email;

document.getElementById("enable-sms").addEventListener("change", function() {
    notificationSettings.sms = this.checked;
    localStorage.setItem("notificationSettings", JSON.stringify(notificationSettings));
});

document.getElementById("enable-email").addEventListener("change", function() {
    notificationSettings.email = this.checked;
    localStorage.setItem("notificationSettings", JSON.stringify(notificationSettings));
});

function saveUserContact() {
    let phone = document.getElementById("user-phone").value.trim();
    let email = document.getElementById("user-email").value.trim();

    userContact = { phone, email };
    localStorage.setItem("userContact", JSON.stringify(userContact));

    alert("✅ Contact details saved successfully!");
}

function checkPriceDeviation(predictedPrice, actualPrice) {
    let deviation = ((actualPrice - predictedPrice) / predictedPrice) * 100;

    if (Math.abs(deviation) > deviationThreshold) {
        let alertMessage = `🚨 Price Alert: Prediction was off by ${deviation.toFixed(2)}%!`;
        showAlert(alertMessage);

        if (notificationSettings.sms && userContact.phone) sendSMS(alertMessage, userContact.phone);
        if (notificationSettings.email && userContact.email) sendEmail(alertMessage, userContact.email);
    }
}

function sendSMS(message, phoneNumber) {
    fetch("http://localhost:3000/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, phoneNumber }),
    })
    .then(response => response.text())
    .then(data => console.log("SMS Sent:", data))
    .catch(error => console.error("SMS Error:", error));
}

function sendEmail(message, userEmail) {
    emailjs.send("your_service_id", "your_template_id", {
        to_email: userEmail,
        message: message
    })
    .then(response => console.log("Email Sent:", response))
    .catch(error => console.error("Email Error:", error));
}
// Load saved settings on page load
let notificationSettings = JSON.parse(localStorage.getItem("notificationSettings")) || { sms: true, email: true };
let userContact = JSON.parse(localStorage.getItem("userContact")) || { phone: "", email: "" };

// Apply stored settings
document.getElementById("enable-sms").checked = notificationSettings.sms;
document.getElementById("enable-email").checked = notificationSettings.email;
document.getElementById("user-phone").value = userContact.phone;
document.getElementById("user-email").value = userContact.email;

// Save settings in real time
document.getElementById("enable-sms").addEventListener("change", function() {
    notificationSettings.sms = this.checked;
    localStorage.setItem("notificationSettings", JSON.stringify(notificationSettings));
});

document.getElementById("enable-email").addEventListener("change", function() {
    notificationSettings.email = this.checked;
    localStorage.setItem("notificationSettings", JSON.stringify(notificationSettings));
});

// Save user contact details
function saveUserContact() {
    let phone = document.getElementById("user-phone").value.trim();
    let email = document.getElementById("user-email").value.trim();

    userContact = { phone, email };
    localStorage.setItem("userContact", JSON.stringify(userContact));

    alert("✅ Contact details saved successfully!");
}

// Use stored contact info for alerts
function checkPriceDeviation(predictedPrice, actualPrice) {
    let deviation = ((actualPrice - predictedPrice) / predictedPrice) * 100;

    if (Math.abs(deviation) > deviationThreshold) {
        let alertMessage = `🚨 Price Alert: Prediction was off by ${deviation.toFixed(2)}%!`;
        showAlert(alertMessage);

        if (notificationSettings.sms && userContact.phone) sendSMS(alertMessage, userContact.phone);
        if (notificationSettings.email && userContact.email) sendEmail(alertMessage, userContact.email);
    }
}
