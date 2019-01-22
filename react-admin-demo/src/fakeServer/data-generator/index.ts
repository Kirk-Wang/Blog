/**
 *  Copyright Kirk Technologies.
 */

import Chance from "chance";
import { randomDateFactory } from "./randomDate";

import { generateCustomers } from "./customers";
import { generateCategories } from "./categories";
import { generateProducts } from "./products";
import { generateCommands } from "./commands";
import { generateReviews } from "./reviews";
import { finalize } from "./finalize";

export const generateData = ({ serializeDate } = { serializeDate: false }) => {
    const chance = new Chance();
    const randomDate = randomDateFactory(chance, serializeDate);

    const db: any = {};

    db.customers = generateCustomers(db, chance, randomDate);
    db.categories = generateCategories();
    db.products = generateProducts(db, chance);
    db.commands = generateCommands(db, chance, randomDate);
    db.reviews = generateReviews(db, chance, randomDate);
    finalize(db, chance);

    return db;
};
