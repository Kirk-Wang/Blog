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
            fields: {
                last_seen_gte: "Visited Since",
                groups: "Segments",
                commands: "Orders",
                total_spent: "Total spent",
            },
        },
        segments: {
            name: "Segments",
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
    },
};
