/**
 *  Copyright Kirk Technologies.
 */

import * as isAfter from "date-fns/is_after";
import * as subDays from "date-fns/sub_days";

export const generateCommands = (db: any, chance: any, randomDate: any) => {
    const today = new Date();
    const aMonthAgo = subDays(today, 30);

    return Array.from(Array(600).keys()).map(id => {
        const nbProducts = chance.weighted([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [30, 20, 5, 2, 1, 1, 1, 1, 1, 1]);
        const basket = Array.from(Array(nbProducts).keys()).map(() => ({
            product_id: chance.integer({ min: 0, max: 10 * 13 - 1 }),
            quantity: chance.weighted([1, 2, 3, 4, 5], [10, 5, 3, 2, 1]),
        }));

        const totalExTaxes = basket.reduce((total, product) => {
            return total + db.products[product.product_id].price * product.quantity;
        }, 0);

        const deliveryFees = chance.floating({ min: 3, max: 8, fixed: 2 });
        const taxRate = chance.pick([0.12, 0.17, 0.2]);
        const taxes = parseFloat(((totalExTaxes + deliveryFees) * taxRate).toFixed(2));
        const customer = chance.pick(db.customers.filter((c: any) => c.has_ordered));
        const date = randomDate(customer.first_seen, customer.last_seen);

        const status =
            isAfter(date, aMonthAgo) && chance.bool()
                ? "ordered"
                : chance.weighted(["delivered", "cancelled"], [10, 1]);
        return {
            id,
            reference: chance.string({
                length: 6,
                pool: "abcdefghijklmnopqrstuvwxyz0123456789",
            }),
            date,
            customer_id: customer.id,
            basket,
            total_ex_taxes: totalExTaxes,
            delivery_fees: deliveryFees,
            tax_rate: taxRate,
            taxes,
            total: parseFloat((totalExTaxes + deliveryFees + taxes).toFixed(2)),
            status,
            returned: status === "delivered" ? chance.bool({ likelihood: 10 }) : false,
        };
    });
};
