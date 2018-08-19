/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import { List, Datagrid, DateField, NumberField, BooleanField } from "react-admin";
import { CustomerLinkField } from "./CustomerLinkField";
import { ColoredNumberField } from "./ColoredNumberField";

export const CustomerList = (props: any) => (
    <List {...props}>
        <Datagrid>
            <CustomerLinkField />
            <DateField source="last_seen" type="date" />
            <NumberField source="nb_commands" label="Orders" />
            <ColoredNumberField source="total_spent" options={{ style: "currency", currency: "USD" }} />
            <DateField source="latest_purchase" showTime />
            <BooleanField source="has_newsletter" label="News." />
        </Datagrid>
    </List>
);
