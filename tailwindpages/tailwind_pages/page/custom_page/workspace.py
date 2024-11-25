import frappe
from frappe import _
import json
from frappe.model.meta import get_meta
@frappe.whitelist(allow_guest=True)
def get_sales_data():
    """
    Fetches sales data grouped by month with month names.
    """
    # Query to get month names and sales (sum of grand_total)
    data = frappe.db.sql("""
        SELECT MONTHNAME(posting_date) AS month_name, SUM(grand_total) AS sales
        FROM `tabSales Invoice`
        WHERE docstatus = 1  -- Only consider submitted invoices
        GROUP BY MONTH(posting_date)
        ORDER BY MONTH(posting_date)
        
    """, as_dict=True)

    # Check if data is empty and return an appropriate message
    if not data:
        return {"message": _("No sales data available")}

    # Return the sales data with month names
    return data

@frappe.whitelist(allow_guest=True)
def get_top_customers():
    """
    Fetches top 5 customers based on sales amount.
    """
    data = frappe.db.sql("""
        SELECT 
            customer_name AS "Customer",
            SUM(grand_total) AS "Total Sales Amount"
        FROM 
            `tabSales Invoice`
        WHERE 
            docstatus = 1  -- Only include submitted invoices
        GROUP BY 
            customer
        ORDER BY 
            SUM(grand_total) DESC
        LIMIT 5
    """, as_dict=True)

    if not data:
        return {"message": _("No customer data available")}

    return data

@frappe.whitelist(allow_guest=True)
def get_top_suppliers():
    """
    Fetches top 5 supplier based on purchase amount.
    """
    data = frappe.db.sql("""
        SELECT 
            supplier_name AS "Supplier",
            SUM(grand_total) AS "Total Purchase Amount"
        FROM 
            `tabPurchase Invoice`
        WHERE 
            docstatus = 1  -- Only include submitted invoices
        GROUP BY 
            supplier
        ORDER BY 
            SUM(grand_total) DESC
        LIMIT 5
    """, as_dict=True)

    if not data:
        return {"message": _("No supplier data available")}

    return data

@frappe.whitelist()
def get_top_outstanding_suppliers(limit=10):
    """
    Fetch the top suppliers with the highest remaining balances.

    :param limit: Number of suppliers to fetch, default is 10
    """
    raw_data = frappe.db.sql("""
        SELECT
            gle.party AS supplier_name,
            SUM(CASE WHEN gle.debit > 0 THEN gle.debit ELSE 0 END) - 
            SUM(CASE WHEN gle.credit > 0 THEN gle.credit ELSE 0 END) AS remaining
        FROM
            `tabGL Entry` AS gle
        WHERE
            gle.party_type = 'Supplier'  -- Suppliers only
        AND
            gle.docstatus = 1  -- Only submitted entries
        AND
            gle.is_cancelled = 0  -- Exclude cancelled entries
        GROUP BY
            gle.party
        HAVING
            remaining > 0  -- Only include suppliers with outstanding amounts
        ORDER BY
            remaining DESC
        LIMIT {limit}
    """.format(limit=frappe.db.escape(limit)), as_dict=True)
    
    return raw_data

@frappe.whitelist()
def get_simple_product_sales_data(filters):
    import json

    # Convert the filters from string to dictionary
    filters = json.loads(filters)  # Parse the JSON string into a Python dictionary

    # SQL Query to fetch sales data with optional category filter
    sales_data = frappe.db.sql("""
        SELECT
            p.product_name,
            p.units_sold,
            p.price,
            (p.units_sold * p.price) AS total_sales_revenue,
            p.date,
            p.category
        FROM 
            `tabProduct Sales` p
        WHERE 
            p.date BETWEEN %(from_date)s AND %(to_date)s
            AND (%(category)s = '' OR p.category = %(category)s)  -- This condition allows empty category for all categories
        GROUP BY p.product_name
    """, {
        'from_date': filters.get('from_date'),
        'to_date': filters.get('to_date'),
        'category': filters.get('category') or ''  # If no category, use empty string to get all categories
    }, as_dict=True)

    # SQL Query to fetch distinct categories
    categories = frappe.db.sql("""
        SELECT DISTINCT p.category
        FROM `tabProduct Sales` p
    """, as_dict=True)

    # Extract categories as a list of strings
    category_list = [category['category'] for category in categories]

    return {
        "sales_data": sales_data,  # Sales data for chart
        "categories": category_list  # List of categories
    }


@frappe.whitelist(allow_guest=True)  
def get_docfields(doctype):
    # Fetch the metadata for the given DocType
    meta = get_meta(doctype)
    fields = meta.fields
  
    return fields
