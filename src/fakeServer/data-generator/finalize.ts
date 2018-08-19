/**
 *  Copyright Kirk Technologies.
 */

export const finalize = (db: any, chance: any) => {
    // set latest purchase date
    db.commands.forEach((command: any) => {
        const customer = db.customers[command.customer_id];
        if (!customer.latest_purchase || customer.latest_purchase < command.date) {
            customer.latest_purchase = command.date;
        }
        customer.total_spent += command.total;
        customer.nb_commands++;
    });

    // add 'collector' group
    const customersBySpending = db.commands.reduce((customers: any, command: any) => {
        if (!customers[command.customer_id]) {
            customers[command.customer_id] = { nbProducts: 0 };
        }
        customers[command.customer_id].nbProducts += command.basket.length;
        return customers;
    }, {});
    Object.keys(customersBySpending).map(customerId => {
        if (customersBySpending[customerId].nbProducts > 10) {
            db.customers[customerId].groups.push("collector");
        }
    });

    // add 'ordered_once' group
    db.customers
        .filter((customer: any) => customer.nb_commands === 1)
        .forEach((customer: any) => customer.groups.push("ordered_once"));

    // add 'compulsive' group
    db.customers
        .filter((customer: any) => customer.total_spent > 1500)
        .forEach((customer: any) => customer.groups.push("compulsive"));

    // add 'regular' group
    db.customers
        .filter(() => chance.bool({ likelihood: 20 }))
        .forEach((customer: any) => customer.groups.push("regular"));

    // add 'returns' group
    db.commands.filter((command: any) => command.returned).forEach((command: any) => {
        if (db.customers[command.customer_id].groups.indexOf("returns") === -1) {
            db.customers[command.customer_id].groups.push("returns");
        }
    });

    // add 'reviewer' group
    db.reviews.forEach((review: any) => {
        const customer = db.customers[review.customer_id];
        if (customer.groups.indexOf("reviewer") === -1) {
            customer.groups.push("reviewer");
        }
    });

    // add settings
    db.settings = [
        {
            id: 1,
            configuration: {
                url: "http://posters-galore.com/",
                mail: {
                    sender: "julio@posters-galore.com",
                    transport: {
                        service: "fakemail",
                        auth: {
                            user: "fake@mail.com",
                            pass: "f00b@r",
                        },
                    },
                },
                file_type_whiltelist: ["txt", "doc", "docx", "xls", "xlsx", "pdf", "png", "jpg"],
            },
        },
    ];
};
