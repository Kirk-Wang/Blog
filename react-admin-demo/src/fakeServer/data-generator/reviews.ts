/**
 *  Copyright Kirk Technologies.
 */

import * as subDays from "date-fns/sub_days";
import * as isAfter from "date-fns/is_after";

export const generateReviews = (db: any, chance: any, randomDate: any) => {
    const today = new Date();
    const aMonthAgo = subDays(today, 30);

    let id = 0;
    const reviewers = db.customers
        .filter((customer: any) => customer.has_ordered)
        .filter(() => chance.bool({ likelihood: 60 })) // only 60% of buyers write reviews
        .map((customer: any) => customer.id);

    return db.commands.filter((command: any) => reviewers.indexOf(command.customer_id) !== -1).reduce(
        (acc: any, command: any) => [
            ...acc,
            ...command.basket
                .filter(() => chance.bool({ likelihood: 40 })) // reviewers review 40% of their products
                .map((product: any) => {
                    const date = randomDate(command.date);
                    const status = isAfter(aMonthAgo, date)
                        ? chance.weighted(["accepted", "rejected"], [3, 1])
                        : chance.weighted(["pending", "accepted", "rejected"], [5, 3, 1]);

                    return {
                        id: id++,
                        date,
                        status,
                        command_id: command.id,
                        product_id: product.product_id,
                        customer_id: command.customer_id,
                        rating: chance.integer({ min: 1, max: 5 }),
                        comment: chance.paragraph(),
                    };
                }),
        ],
        [],
    );
};
