frappe.pages["custom-page"].on_page_load = function (wrapper) {
  const pageController = {
    init: function (wrapper) {
      this.page = frappe.ui.make_app_page({
        parent: wrapper,
        title: "Custom Page",
        single_column: true,
      });

      // Ensure the primary action button is added after page setup
      this.page.set_primary_action('Save', () => {
        console.log("Clicked");
      });

      this.container = $(wrapper).find(".layout-main-section");
      $(".container.page-body").css("max-width", "100%");

      this.loadFrappeCharts(() => {
        console.log("Frappe Charts loaded successfully!");
      });

      this.loadStylesheets();
      this.createLayout();
    },

    loadFrappeCharts: function (callback) {
      if (
        typeof frappe === "undefined" ||
        typeof frappe.Chart === "undefined"
      ) {
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/frappe-charts@1.6.1/dist/frappe-charts.min.umd.js";
        script.onload = callback;
        document.head.appendChild(script);

        $("<link>")
          .attr("rel", "stylesheet")
          .attr(
            "href",
            "https://cdn.jsdelivr.net/npm/frappe-charts@1.6.1/dist/frappe-charts.min.css"
          )
          .appendTo("head");
      } else {
        callback();
      }
    },

    loadStylesheets: function () {
      $("<link>")
        .attr("rel", "stylesheet")
        .attr("type", "text/css")
        .attr(
          "href",
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        )
        .appendTo("head");
      $("<link>")
        .attr("rel", "stylesheet")
        .attr("type", "text/css")
        .attr("href", "/assets/tailwindpages/css/style.css")
        .appendTo("head");
    },

    createLayout: function () {
      const sidebar = $("<div></div>")
        .addClass("sidebar p-3 rounded")
        .html('<h5 class="font-weight-bold mb-3">Menu</h5>');

      const mobileMenuButton = $("<button></button>")
        .addClass("btn ellipsis p-2 mb-3 align-self-start")
        .html('<i class="fas fa-bars"></i>') // Hamburger icon
        .on("click", function () {
          if (sidebar.hasClass("visible")) {
            sidebar.removeClass("visible"); // Remove the class if it exists
          } else {
            sidebar.addClass("visible"); // Add the class if it doesn't exist
          }
        })
        .hide(); // Initially hidden

      // Main content area
      const mainContent = $("<div></div>")
        .addClass("main-content p-3 flex-grow-1")
        .html("<p>Select an item from the menu to view details.</p>");

      // Append elements
      this.container.append(mobileMenuButton);
      this.container.append(sidebar);
      this.container.append(mainContent);

      // Hide sidebar when clicking outside it
      $(document).on("click", (e) => {
        if (!$(e.target).closest(".sidebar, .ellipsis").length) {
          sidebar.removeClass("visible");
        }
      });
    },

    renderSidebarMenu: function () {
      const sidebar = this.container.find(".sidebar");
      const menuItems = [
        {
          name: "Home",
          icon: "fas fa-home text-primary",
          jsFile: "/assets/tailwindpages/js/home.js",
          functionName: "loadDashboardContent",
        },
        {
          name: "Sales",
          icon: "fas fa-chart-line text-success",
          jsFile: "/assets/tailwindpages/js/sales.js",
          functionName: "loadSalesContent",
        },
        {
          name: "Purchase",
          icon: "fas fa-shopping-cart text-info",
          jsFile: "/assets/tailwindpages/js/purchase.js",
          functionName: "loadPurchaseContent",
        },
        {
          name: "Inventory",
          icon: "fas fa-box-open text-warning",
          jsFile: "/assets/tailwindpages/js/inventory.js",
          functionName: "loadInventoryContent",
        },
        {
          name: "Accounts",
          icon: "fas fa-user-tie text-secondary",
          jsFile: "/assets/tailwindpages/js/accounts.js",
          functionName: "loadAccountsContent",
        },
        {
          name: "Simplified Salaries",
          icon: "fas fa-money-check-alt text-dark",
          jsFile: "/assets/tailwindpages/js/salary.js",
          functionName: "loadSalaryContent",
        },
        {
          name: "Production",
          icon: "fas fa-industry text-danger",
          jsFile: "/assets/tailwindpages/js/production.js",
          functionName: "loadProductionContent",
        },
        {
          name: "Training Guide",
          icon: "fas fa-book-open text-primary",
          jsFile: "/assets/tailwindpages/js/training.js",
          functionName: "loadTrainingContent",
        },
        {
          name: "Frappe Charts",
          icon: "fas fa-book-open text-primary",
          jsFile: "/assets/tailwindpages/js/charts.js",
          functionName: "loadChartContent",
        },
      ];

      menuItems.forEach((item) => {
        const menuItem = $(
          `<div class="sidebar-item pb-2 mb-2 d-flex align-items-center cursor-pointer">
             <i class="${item.icon} mr-2"></i>
             <span>${item.name}</span>
           </div>`
        );
        menuItem.on("click", () => {
          this.loadContent(menuItem, item);
          menuItem.addClass("active");
          if ($(window).width() < 768) {
            sidebar.removeClass("visible");// Hide sidebar on mobile
          }
        });
        sidebar.append(menuItem);
      });

      const activeMenuName = localStorage.getItem("activeMenuItem") || "Home";
      const activeItem = menuItems.find((item) => item.name === activeMenuName);
      if (activeItem) {
        const activeMenuItem = sidebar.find(
          `.sidebar-item:contains(${activeItem.name})`
        );
        this.loadContent(activeMenuItem, activeItem);
      }
    },

    loadContent: function (menuItem, item) {
      const sidebar = this.container.find(".sidebar");
      const mainContent = this.container.find(".main-content");

      sidebar.find(".sidebar-item").removeClass("active");
      menuItem.addClass("active");
      localStorage.setItem("activeMenuItem", item.name);

      mainContent.empty();

      $.getScript(item.jsFile, function () {
        console.log(`${item.jsFile} loaded successfully.`);
        if (typeof window[item.functionName] === "function") {
          pageController.loadFrappeCharts(() =>
            window[item.functionName](mainContent)
          );
        } else {
          console.error(
            `${item.functionName} is not defined in ${item.jsFile}`
          );
          mainContent.html("<p>Error loading content.</p>");
        }
      }).fail(function (jqxhr, settings, exception) {
        console.error(`Failed to load ${item.jsFile}:`, exception);
      });

      if ($(window).width() < 768) {
        sidebar.removeClass("show");
      }
    },
  };

  pageController.init(wrapper);
  pageController.renderSidebarMenu();
};
