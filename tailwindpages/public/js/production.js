// Function to load external CSS
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

// Function to initialize the dashboard content
function loadProductionContent(container) {
  // Load the external CSS file
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
          #record-output-count, #material-issue-count, #sales-order-count, #production-job-count {
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
                  <h3 class="fw-bold">Production</h3>
              </div>
          </div>
      
          <!-- Quick Access Section -->
          <div class="quick-access">
              <h4 class="mb-4">Quick Access</h4>
      
              <div class="row g-4">
      
                  <!-- Card: Sales Order -->
                  <div class="">
                      <a href="/app/sales-order" class="text-decoration-none">
                          <div class="card shadow  bg-white rounded border-0 text-white bg-gradient-orange">
                              <div class="card-body text-center">
                                  <div class="d-flex justify-content-between align-items-center">
                                      <div>
                                          <p id="sales-order-count" class="fs-2 fw-bold mb-1">0</p>
                                          <p class="mb-0">Sales Order</p>
                                      </div>
                                      <i class="fas fa-users fa-3x"></i>
                                  </div>
                              </div>
                          </div>
                      </a>
                  </div>
      
                  <!-- Card: Production Job-->
                  <div class="">
                      <a href="/app/production-job" class="text-decoration-none">
                          <div class="card shadow  bg-white rounded border-0 text-white bg-gradient-yellow">
                              <div class="card-body text-center">
                                  <div class="d-flex justify-content-between align-items-center">
                                      <div>
                                          <p id="production-job-count" class="fs-2 fw-bold mb-1">0</p>
                                          <p class="mb-0">Production Job</p>
                                      </div>
                                      <i class="fas fa-file-invoice fa-3x"></i>
                                  </div>
                              </div>
                          </div>
                      </a>
                  </div>
      
                  <!-- Card: Material Issue -->
                  <div class="">
                      <a href="/app/material-issue" class="text-decoration-none">
                          <div class="card shadow  bg-white rounded border-0 text-white bg-gradient-red">
                              <div class="card-body text-center">
                                  <div class="d-flex justify-content-between align-items-center">
                                      <div>
                                          <p id="material-issue-count" class="fs-2 fw-bold mb-1">0</p>
                                          <p class="mb-0">Material Issue</p>
                                      </div>
                                      <i class="fas fa-file-invoice-dollar fa-3x"></i>
                                  </div>
                              </div>
                          </div>
                      </a>
                  </div>
                     <!-- Record -->
                  <div class="">
                      <a href="/app/record-output" class="text-decoration-none">
                          <div class="card shadow  bg-white rounded border-0 text-white bg-gradient-red">
                              <div class="card-body text-center">
                                  <div class="d-flex justify-content-between align-items-center">
                                      <div>
                                          <p id="record-output-count" class="fs-2 fw-bold mb-1">0</p>
                                          <p class="mb-0">Record Output</p>
                                      </div>
                                      <i class="fas fa-file-invoice-dollar fa-3x"></i>
                                  </div>
                              </div>
                          </div>
                      </a>
                  </div> 
              
                 <!-- Card: Production Report -->
                  <div class="">
                      <a href="/app/query-report/Product Report" class="text-decoration-none">
                          <div class="card shadow  bg-white rounded border-0 text-white bg-gradient-purple">
                              <div class="card-body text-center">
                                  <div class="d-flex justify-content-between align-items-center">
                                      <div>
                                        
                                          <p class="mb-0"> Production Report</p>
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

  const items = [
    "Sales Order",
    "Production Job",
    "Material Issue",
    "Record Output",
    ,
  ];
  items.forEach((item) => {
    getCount(item, (count) => animateCount(`${item.toLowerCase().replace(/ /g, "-")}-count`, 0, count, 1000));
  });
  
}


function renderBarChart(canvasId, labels, data, label, stepSize = 10) {
  let charts = {}; 
  if (typeof Chart === "undefined") {
    console.error("Chart.js is not loaded.");
    return;
  }

  const ctx = document.getElementById(canvasId).getContext("2d");
  
  // Destroy existing chart if it exists
  if (charts[canvasId]) {
    charts[canvasId].destroy();
  }

  // Create and store the new chart instance
  charts[canvasId] = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          backgroundColor: [
            "rgba(0, 123, 255, 0.8)", "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)", "rgba(255, 159, 64, 0.8)",
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
    if(current > end  || current < start){
      clearInterval(timer);
      return;
    }
    if (elementId != null && elementId != undefined && document.getElementById(elementId) != null) {
      document.getElementById(elementId).textContent = current;
    }
    
  }, stepTime);
}

$(document).ready(() => {
  const container = $("#dashboard-container");
  loadChartJs(() => loadProductionContent(container));
  // Load Chart.js script
  $.getScript("https://cdn.jsdelivr.net/npm/chart.js")
    .done(() => {
      console.log("Chart.js loaded successfully");
    })
    .fail(() => {
      console.error("Failed to load Chart.js");
    });
});

$(document).ready(function () {
  const container = $("#dashboard-container");
  loadChartJs(() => loadProductionContent(container));
});
