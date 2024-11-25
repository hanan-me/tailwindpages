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

function loadSalesContent(container) {
  // Load the external CSS file
  loadCSS("/assets/tailwindpages/css/workspace_content.css");
  container.html(`
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
    
        /* Styling for Quick Access container */
   
    
        /* Styling the count numbers */
        #customer-count, #sales-invoice-count, #purchase-invoice-count, #sales-order-count{
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
    /* Styling for Quick Access container */
    .quick-access .row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Adaptive grid for responsiveness */
        gap: 1rem; /* Spacing between grid items */
    }

    .quick-access .card {
        min-height: 120px; /* Optional: Set a baseline height */
    }

    @media (max-width: 768px) {
        .quick-access .card {
            height: auto; /* Ensures proper layout on smaller screens */
        }
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
                <h3 class="fw-bold">Sales</h3>
            </div>
        </div>
    
        <!-- Quick Access Section -->
        <div class="quick-access">
            <h4 class="mb-4">Quick Access</h4>
    
            <div class="row g-4">
    
                <!-- Card: Customer -->
                <div class="">
                    <a href="/app/customer" class="text-decoration-none">
                        <div class="card shadow  bg-white rounded border-0 text-white bg-gradient-orange">
                            <div class="card-body text-center">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p id="customer-count" class="fs-2 fw-bold mb-1">0</p>
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
                                        <p id="sales-invoice-count" class="fs-2 fw-bold mb-1">0</p>
                                        <p class="mb-0">Sales Invoice</p>
                                    </div>
                                    <i class="fas fa-file-invoice fa-3x"></i>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
    
                <!-- Card: Gate Pass -->
                <div class="">
                    <a href="/app/delivery-note/new-delivery-note" class="text-decoration-none">
                        <div class="card shadow  bg-white rounded border-0 text-white bg-gradient-red">
                            <div class="card-body text-center">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                      
                                        <p class="mb-0">Gate Pass</p>
                                    </div>
                                    <i class="fas fa-file-invoice-dollar fa-3x"></i>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                   <!-- Card: Gate Pass List
                <div class="">
                    <a href="/app/delivery-note" class="text-decoration-none">
                        <div class="card shadow  bg-white rounded border-0 text-white bg-gradient-red">
                            <div class="card-body text-center">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p id="purchase-invoice-count" class="fs-2 fw-bold mb-1">0</p>
                                        <p class="mb-0">Gate Pass List</p>
                                    </div>
                                    <i class="fas fa-file-invoice-dollar fa-3x"></i>
                                </div>
                            </div>
                        </div>
                    </a>
                </div> -->
            
               <!-- Card: Sales Invoice List 
                <div class="">
                    <a href="/app/sales-invoice" class="text-decoration-none">
                        <div class="card shadow  bg-white rounded border-0 text-white bg-gradient-purple">
                            <div class="card-body text-center">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p id="sales-invoice-count" class="fs-2 fw-bold mb-1">0</p>
                                        <p class="mb-0">Sales Invoice List</p>
                                    </div>
                                    <i class="fas fa-truck fa-3x"></i>
                                </div>
                            </div>
                        </div>
                    </a>
                </div> -->
                <!-- Card: Sales Ledger -->
                <div class="w-full">
                    <a href="/app/query-report/Customer Summary" class="text-decoration-none">
                        <div class="card shadow  bg-white rounded border-0 text-white bg-gradient-purple">
                            <div class="card-body text-center">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                 
                                        <p class="mb-0">Sales Ledger</p>
                                    </div>
                                    <i class="fas fa-truck fa-3x"></i>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <!-- Card: Sales Order -->
                <div >
                    <a href="/app/sales-order/new-sales-order" class="text-decoration-none">
                        <div class="card shadow  bg-white rounded border-0 text-white bg-gradient-purple">
                            <div class="card-body text-center">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p class="fs-2 fw-bold mb-1" id="sales-order-count" >0</p>
                                        <p class="mb-0">Sales Order</p>
                                    </div>
                                    <i class="fas fa-cogs fa-3x"></i>
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
                    <h5 class="chart-title">Top 5 Customers</h5>
                    <div id="topCustomersChart"></div>
                  </div>
                </div>
                <div class="col-md-6 mb-2">
                  <div class="card shadow bg-white rounded border border-light p-3">
                    <h5 class="chart-title">Monthly Sales</h5>
                    <div id="dashboardBarChart"></div>
                  </div>
                </div>
              </div>
              
          </div>
      </div>
    `);

  // Initialize counts
  const counts = {};
  const items = [
    "Customer",
    "Sales Invoice",
    "Purchase Invoice",
    "Sales Order",
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

  // Fetch and render Top 5 Customers Chart
  fetchData(
    "tailwindpages.tailwind_pages.page.custom_page.workspace.get_top_suppliers",
    (data) => {
      const labels = data.map((d) => d.Supplier);
      const purchases = data.map((d) => d["Total Purchase Amount"]);
      renderFrappeBarChart(
        "topCustomersChart",
        labels,
        purchases,
        "Total Sales Amount"
      );
    },
    console.error
  );

  // Fetch and render Monthly Sales Chart
  fetchData(
    "tailwindpages.tailwind_pages.page.custom_page.workspace.get_sales_data",
    (data) => {
      const labels = data.map((d) => d.month_name);
      const sales = data.map((d) => d.sales);
      renderFrappeBarChart("dashboardBarChart", labels, sales, "Monthly Sales");
    },
    console.error
  );
 



}

function renderFrappeBarChart(chartId, labels, data, title) {
  const chartContainer = document.getElementById(chartId);
  if (chartContainer) {
    console.log(data,labels)
    chartContainer.innerHTML = ""; // Clear previous chart
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
      type: "bar", // Can be 'bar', 'line', etc.
      height: 300,
      colors: ["#7cd6fd", "#743ee2"],
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
  loadSalesContent(container);
});
