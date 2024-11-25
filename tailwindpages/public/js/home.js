function loadCSS(href) {
  $("<link>")
    .attr("rel", "stylesheet")
    .attr("type", "text/css")
    .attr("href", href)
    .appendTo("head");
}

function getCount(item, callback) {
  frappe.call({
    method: "frappe.client.get_list",
    args: { doctype: item, fields: ["name"] },
    callback: (r) => callback(r.message ? r.message.length : 0),
    error: () => callback(0),
  });
}

function fetchData(method, onSuccess, onError) {
  frappe.call({
    method,
    callback: (response) => {
      if (response.message) onSuccess(response.message);
      else onError("Invalid data format.");
    },
    error: onError,
  });
}

function loadDashboardContent(container) {

  loadCSS("/assets/tailwindpages/css/workspace_content.css");
  container.html(`
<!-- Link to Poppins Font -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">

<style>
    /* Applying the Poppins font */
    body {
        font-family: 'Poppins', sans-serif;
    }

    /* Gradient backgrounds for the cards */
    .bg-gradient-purple {
        background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
    }

    .bg-gradient-orange {
        background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
    }

    .bg-gradient-yellow {
        background: linear-gradient(135deg, #fbc8d4 0%, #fdea9b 100%);
    }

    .bg-gradient-red {
        background: linear-gradient(135deg, #ff6a00 0%, #ee0979 100%);
    }

 .card {

  transition: transform 0.3s ease, border 0.3s ease;

}

.card:hover {
    transform: translateY(-8px) scale(1.05);

}


    .card-body {
        padding: 20px;
    }

    /* Styling the count numbers */
    #item-count, #customer-count, #sales-invoice-count, #purchase-invoice-count, #supplier-count {
        font-size: 2.5rem;
        font-weight: bold;
        color: #fff;
    }



    /* Styling for Chart Cards */
    .chart-card {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    }

    /* Chart Titles */
    .chart-title {
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 20px;
        color: #333;
        text-align: center;
    }
.quick-access .row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Adaptive grid */
    gap: 1rem; /* Adds spacing between cards */
}



/* Hover Effect */
.quick-access .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}


</style>

<!-- HTML Content -->
<div class="container mt-4">
    <!-- Section Title -->
    <div class="row mb-4">
        <div class="col-md-12">
            <h3 class="fw-bold">Home</h3>
        </div>
    </div>

    <!-- Quick Access Section -->
    <div class="quick-access">
        <h4 class="mb-4">Quick Access</h4>

        <div class="row g-4">
            <!-- Card: Item -->
            <div class="">
                <a href="/app/item" class="text-decoration-none">
                    <div class="card border-0 text-white bg-gradient-purple shadow  bg-white rounded">
                        <div class="card-body text-center">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <p id="item-count" class="fs-2 fw-bold mb-1">Loading...</p>
                                    <p class="mb-0">Item</p>
                                </div>
                                <i class="fas fa-cogs fa-3x"></i>
                            </div>
                        </div>
                    </div>
                </a>
            </div>

            <!-- Card: Customer -->
            <div class="">
                <a href="/app/customer" class="text-decoration-none">
                    <div class="card border-0 text-white bg-gradient-orange shadow  bg-white rounded">
                        <div class="card-body text-center">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <p id="customer-count" class="fs-2 fw-bold mb-1">Loading...</p>
                                    <p class="mb-0">Customer</p>
                                </div>
                                <i class="fas fa-users fa-3x"></i>
                            </div>
                        </div>
                    </div>
                </a>
            </div>

            <!-- Card: Sales Invoice -->
            <div class="">
                <a href="/app/sales-invoice" class="text-decoration-none">
                    <div class="card shadow  bg-white rounded border-0 text-white bg-gradient-yellow">
                        <div class="card-body text-center">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <p id="sales-invoice-count" class="fs-2 fw-bold mb-1">Loading...</p>
                                    <p class="mb-0">Sales Invoice</p>
                                </div>
                                <i class="fas fa-file-invoice fa-3x"></i>
                            </div>
                        </div>
                    </div>
                </a>
            </div>

            <!-- Card: Purchase Invoice -->
            <div class="">
                <a href="/app/purchase-invoice" class="text-decoration-none">
                    <div class="card shadow  bg-white rounded border-0 text-white bg-gradient-red">
                        <div class="card-body text-center">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <p id="purchase-invoice-count" class="fs-2 fw-bold mb-1">Loading...</p>
                                    <p class="mb-0">Purchase Invoice</p>
                                </div>
                                <i class="fas fa-file-invoice-dollar fa-3x"></i>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            
           <!-- Card: Supplier -->
            <div class="">
                <a href="/app/supplier" class="text-decoration-none">
                    <div class="card shadow  bg-white rounded border-0 text-white bg-gradient-purple">
                        <div class="card-body text-center">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <p id="supplier-count" class="fs-2 fw-bold mb-1">Loading...</p>
                                    <p class="mb-0">Supplier</p>
                                </div>
                                <i class="fas fa-truck fa-3x"></i>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>

 <!-- Chart Section -->
    
</div>

`);

const fetchCounts = new Promise((resolve) => {
 
  const items = [
    "Item",
    "Customer",
    "Sales Invoice",
    "Purchase Invoice",
    "Supplier",
  ];
  
  items.forEach((item) => {
    getCount(item, (count) =>
      animateCount(
        `${item.toLowerCase().replace(/ /g, "-")}-count`,
        0,
        count,
        1000
      )
    );
  });
});

}


function renderBarChart(canvasId, labels, data, label, stepSize = 50) {
  let charts = {};
  if (typeof Chart === "undefined") {
    console.error("Chart.js is not loaded.");
    return;
  }

  const ctx = document.getElementById(canvasId).getContext("2d");

 
  if (charts[canvasId]) {
    charts[canvasId].destroy();
  }

  charts[canvasId] = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          backgroundColor: [
            "rgba(0, 123, 255, 0.8)",
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 159, 64, 0.8)",
            "rgba(75, 192, 192, 0.8)",
          ],
          borderColor: "transparent",
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: { beginAtZero: true, ticks: { stepSize, maxTicksLimit: 6 } },
        x: { grid: { display: false } },
      },
      barPercentage: 0.5,
      categoryPercentage: 1,
    },
  });
}

function animateCount(elementId, start, end, duration) {
  const stepTime = Math.abs(Math.floor(duration / (end - start)));
  let current = start;

  const increment = end > start ? 1 : -1;
  const timer = setInterval(() => {
    current += increment;
    if (current > end || current < start) {
      clearInterval(timer);
      return;
    }
    if (
      elementId != null &&
      elementId != undefined &&
      document.getElementById(elementId) != null
    ) {
      document.getElementById(elementId).textContent = current;
    }
  }, stepTime);
}

function loadChartJs(callback) {
  if (typeof Chart !== "undefined") {
    callback(); 
    return;
  }

  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/chart.js";
  script.onload = callback;
  script.onerror = () => console.error("Failed to load Chart.js");
  document.head.appendChild(script);
}

$(document).ready(function () {
    loadChartJs(() => loadDashboardContent($("#dashboard-container")));
  });