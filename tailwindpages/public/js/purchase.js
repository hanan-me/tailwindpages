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

function loadPurchaseContent(container) {
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
    
        /* Additional styling for the cards */
        .card {
          height: 100%;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
    
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
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
          
        }
    .quick-access .row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Adaptive grid */
        gap: 1rem; /* Adds spacing between cards */
    }
    
    /* Card Styling */
    .quick-access .card {
        border-radius: 8px;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
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
                <h3 class="fw-bold">Purchase Invoice</h3>
            </div>
        </div>
    
        <!-- Quick Access Section -->
        <div class="quick-access">
            <h4 class="mb-4">Quick Access</h4>
    
            <div class="row g-4">
                <!-- Card: Supplier -->
                <div class="">
                    <a href="/app/supplier" class="text-decoration-none">
                        <div class="card shadow  bg-white rounded border-0 text-white bg-gradient-purple">
                            <div class="card-body text-center">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p id="supplier-count" class="fs-2 fw-bold mb-1">0</p>
                                        <p class="mb-0">Supplier</p>
                                    </div>
                                    <i class="fas fa-cogs fa-3x"></i>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
    
                <!-- Card: Purchase Invoice -->
                <div class="">
                    <a href="/app/purchase-invoice" class="text-decoration-none">
                        <div class="card shadow  bg-white rounded border-0 text-white bg-gradient-orange">
                            <div class="card-body text-center">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p id="purchase-invoice-count" class="fs-2 fw-bold mb-1">0</p>
                                        <p class="mb-0">Purchase Invoice List</p>
                                    </div>
                                    <i class="fas fa-users fa-3x"></i>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
    
                <!-- Card: Purchase Ledger -->
                <div class="">
                    <a href="/app/query-report/Supplier Summary" class="text-decoration-none">
                        <div class="card shadow  bg-white rounded border-0 text-white bg-gradient-yellow">
                            <div class="card-body text-center">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                       
                                        <p class="mb-0">Purchase Ledger</p>
                                    </div>
                                    <i class="fas fa-file-invoice fa-3x"></i>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                </div>
          </div>
            
    
    <div class="chart-card mt-5">
              <h4 class="chart-title">Sales Overview</h4>
  
              <div class="row">
                <div class="col-md-6 mb-2">
                  <div class="card shadow bg-white rounded border border-light p-3">
                    <h5 class="chart-title">Top 5 Suppliers</h5>
                    <div id="topSuppliersChart"></div>
                  </div>
                </div>
                
              </div>
              
          </div>
    </div>
    
    `);

  const items = ["Supplier", "Purchase Invoice", "Sales Invoice"];
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

  // Fetch and render Top 5 Supplier Chart
  fetchData(
    "tailwindpages.tailwind_pages.page.custom_page.workspace.get_top_suppliers",
    (data) => {
      const labels = data.map((d) => d.Supplier);
      const purchases = data.map((d) => d["Total Purchase Amount"]);
      renderFrappeBarChart(
        "topSuppliersChart",
        labels,
        purchases,
        "Total Purchase Amount"
      );
    },
    console.error
  );
}
function renderFrappeBarChart(chartId, labels, data, title) {
  const chartContainer = document.getElementById(chartId);
  if (chartContainer) {
    console.log("Data:", data);
    console.log("Labels:", labels);

    // Clear previous chart if any
    chartContainer.innerHTML = ""; 

    const currencySymbol = "PKR";

    // Function to format numbers (e.g., 20000 -> 20K, 1500000 -> 1.5M)
    function formatNumber(value) {
      if (value >= 1000000) {
        return `${currencySymbol} ${(value / 1000000).toFixed(1)}M`; // Format as millions
      } else if (value >= 1000) {
        return `${currencySymbol} ${(value / 1000).toFixed(1)}K`; // Format as thousands
      } else {
        return `${currencySymbol} ${value}`; // Return original value for smaller numbers
      }
    }

    // Create the chart
    new frappe.Chart(chartContainer, {
      title: title,
      data: {
        labels: labels,
        datasets: [
          {
            name: title,
            type: "bar",
            values: data,
          },
        ],
      },
      type: "bar", // Type of chart (can be 'bar', 'line', 'pie', etc.)
      height: 400,
      colors: ["#7cd6fd", "#743ee2"],

      // Axis configuration using axisOptions
      axisOptions: {
        xAxisMode: 'tick',// Display x-axis labels as ticks
        yAxisMode: "span", // Ensure the y-axis spans from 0 to maximum value
        xIsSeries: true, // X-axis uses labels as series
        formatLabelY: (value) => formatNumber(value), // Format Y-axis values with currency and suffix
      },

      // Tooltip configuration
      tooltipOptions: {
        formatTooltipY: (value) => formatNumber(value), // Format tooltip Y-axis values with currency
      },

      // Optional customizations
      xAxisTitle: "Suppliers", // Title for the x-axis (optional)
      yAxisTitle: `Total Purchase Amount`, // Y-axis title
      showValues: true, // Show values on the bars
      showLegend: true, // Show chart legend
    });
    
  }
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

// Ready Function
$(document).ready(function () {
  const container = $("#dashboard-container");
  loadPurchaseContent(container);
});
