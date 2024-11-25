function loadCSS(href) {
    $("<link>")
        .attr("rel", "stylesheet")
        .attr("type", "text/css")
        .attr("href", href)
        .appendTo("head");
}

function loadChartContent(container) {
    loadCSS("/assets/your_custom_app/css/workspace_content.css");
    container.html(`
        <div id="form-container"></div>
    `);
    loadFormFields("Person");
}

function getFieldNames(doctype) {
    return frappe.call({
        method: "tailwindpages.tailwind_pages.page.custom_page.workspace.get_docfields",
        args: {
            doctype: doctype
        }
    });
}

function loadFormFields(doctype) {
    getFieldNames(doctype).then(function(response) {
        if (response.message) {
            const fields = response.message;
            generateForm(fields);
        }
    }).catch(function(error) {
        console.error("Error fetching field names:", error);
    });
}

function generateForm(fields) {
    const formContainer = $("#form-container");
    formContainer.empty();

    fields.forEach(field => {
        const controlOptions = {
            parent: formContainer,
            df: {
                fieldname: field.fieldname,
                fieldtype: field.fieldtype,
                label: field.label || field.fieldname,
            },
            render_input: true,
        };

        let control;
        switch (field.fieldtype) {
            case "Data":
                controlOptions.df.placeholder = `Enter ${field.label || field.fieldname}`;
                control = frappe.ui.form.make_control(controlOptions);
                break;
            case "Select":
                controlOptions.df.options = field.options || "";
                control = frappe.ui.form.make_control(controlOptions);
                break;
            case "Date":
                control = frappe.ui.form.make_control(controlOptions);
                break;
            case "Text":
                control = frappe.ui.form.make_control(controlOptions);
                break;
            case "Int":
                controlOptions.df.placeholder = `Enter a number`;
                control = frappe.ui.form.make_control(controlOptions);
                break;
            case "Float":
                controlOptions.df.placeholder = `Enter a decimal number`;
                control = frappe.ui.form.make_control(controlOptions);
                break;
            case "Link":
                controlOptions.df.options = field.options || "";
                control = frappe.ui.form.make_control(controlOptions);
                break;
            default:
                control = frappe.ui.form.make_control(controlOptions);
        }

        $(control.wrapper).data("control", control);
        $(control.wrapper).on('change', function() {
            trackFieldChanges(field.fieldname, control.get_value());
        });
    });

    const buttonHTML = `
        <div class="text-center mt-4">
            <button id="save-button" class="btn btn-primary">
                Save Form
            </button>
        </div>
    `;
    formContainer.append(buttonHTML);

    $("#save-button").on("click", function() {
        handleFormSave(fields);
    });
}

let formData = {};

function trackFieldChanges(fieldname, value) {
    console.log(`Field changed: ${fieldname}, New Value: ${value}`);
    formData[fieldname] = value;
}

function handleFormSave(fields) {
    console.log("Form Data before saving:", formData);

    frappe.call({
        method: "frappe.client.save",
        args: {
            doc: {
                doctype: "Person", // Replace with the correct Doctype
                ...formData
            }
        },
        callback: function(response) {
            if (response.message) {
                alert("Data saved successfully!");
            } else if (response.error) {
                alert("Error: " + response.error);
            }
        }
    });
}

$(document).ready(function () {
    const container = $("#dashboard-container");
    loadChartContent(container);
});
