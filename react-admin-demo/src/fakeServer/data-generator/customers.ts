/**
 *  Copyright Kirk Technologies.
 */

import md5 from "md5";

export const generateCustomers = (db: any, chance: any, randomDate: any) =>
    Array.from(Array(900).keys()).map(id => {
        const firstSeen = randomDate();
        const lastSeen = randomDate(firstSeen);
        const hasOrdered = chance.bool({ likelihood: 25 });
        const email = chance.email();

        return {
            id,
            first_name: chance.first(),
            last_name: chance.last(),
            email,
            address: hasOrdered ? chance.address() : null,
            zipcode: hasOrdered ? chance.zip() : null,
            city: hasOrdered ? chance.city() : null,
            avatar: "https://robohash.org/" + md5(email) + ".png",
            birthday: hasOrdered ? chance.birthday() : null,
            first_seen: firstSeen,
            last_seen: lastSeen,
            has_ordered: hasOrdered,
            latest_purchase: null, // finalize
            has_newsletter: hasOrdered ? chance.bool({ likelihood: 30 }) : true,
            groups: [], // finalize
            nb_commands: 0,
            total_spent: 0,
        };
    });
