/**
 *  Copyright Kirk Technologies.
 */

import chinese from "ra-language-chinese";

export const chineseMessages = {
    ...chinese,
    pos: {
        search: "搜搜～～",
    },
    resources: {
        customers: {
            name: "客户",
            fields: {
                last_seen_gte: "Visited Since",
                groups: "Segments",
                commands: "Orders",
                total_spent: "Total spent",
            },
            tabs: {
                identity: "Identity",
                address: "Address",
                orders: "Orders",
                reviews: "Reviews",
                stats: "Stats",
            },
        },
        segments: {
            name: "客户分组",
            fields: {
                customers: "Customers",
                name: "Name",
            },
            data: {
                compulsive: "Compulsive",
                collector: "Collector",
                ordered_once: "Ordered once",
                regular: "Regular",
                returns: "Returns",
                reviewer: "Reviewer",
            },
        },
        commands: {
            name: "订单",
            fields: {
                basket: {
                    delivery: "Delivery",
                    reference: "Reference",
                    quantity: "Quantity",
                    sum: "Sum",
                    tax_rate: "Tax Rate",
                    total: "Total",
                    unit_price: "Unit Price",
                },
                customer_id: "Customer",
                date_gte: "Passed Since",
                date_lte: "Passed Before",
                total_gte: "Min amount",
                status: "Status",
                returned: "Returned",
            },
        },
        products: {
            name: "产品（海报）",
            fields: {
                category_id: "Category",
                height_gte: "Min height",
                height_lte: "Max height",
                height: "Height",
                image: "Image",
                price: "Price",
                reference: "Reference",
                stock_lte: "Low Stock",
                stock: "Stock",
                thumbnail: "Thumbnail",
                width_gte: "Min width",
                width_lte: "Max width",
                width: "Width",
            },
            tabs: {
                image: "Image",
                details: "Details",
                description: "Description",
                reviews: "Reviews",
            },
        },
    },
};
