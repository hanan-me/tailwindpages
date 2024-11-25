// Function to load external CSS
function loadCSS(href) {
    $("<link>")
      .attr("rel", "stylesheet")
      .attr("type", "text/css")
      .attr("href", href)
      .appendTo("head");
  }
  
  // Function to initialize the dashboard content
  function loadTrainingContent(container) {
    // Load the external CSS file
    loadCSS("/assets/tailwindpages/css/workspace_content.css");
    container.html(`
      <!-- Link to Poppins Font -->
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
      
      <style>
        body {
          font-family: 'Poppins', sans-serif;
        }
        .training-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .training-link {
          display: flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
          color: #333;
        }
        .training-link:hover {
          text-decoration: underline;
        }
        .training-count {
          display: flex;
          align-items: center;
          gap: 6px;
          background-color: #f4f4f4;
          border-radius: 6px;
          padding: 4px 8px;
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }
        .dot-icon {
          display: inline-block;
          width: 6px;
          height: 6px;
          background-color: #333;
          border-radius: 50%;
        }
      </style>
      
      <!-- HTML Content -->
      <div class="container mt-4">
          <!-- Section Title -->
          <div class="row mb-4">
              <div class="col-md-12">
                  <h3 class="fw-bold">Training Guide</h3>
              </div>
          </div>
          <!-- Content Row -->
          <div class="row">
              <div class="col-12">
                  <div class="training-container">
                      <!-- Label and Count -->
                      <a href="#" class="training-link">
                          Training Video <i class="bi bi-box-arrow-up-right"></i>
                          <span class="training-count">
                              <span class="dot-icon"></span>
                              8
                          </span>
                      </a>
                  </div>
              </div>
          </div>
      </div>
    `);
  }
  
  // Ready Function
  $(document).ready(function () {
    const container = $("#dashboard-container");
   loadTrainingContent(container)
  });
  