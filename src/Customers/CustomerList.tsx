/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import { List, Datagrid, DateField, NumberField, BooleanField, EditButton } from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import { CustomerLinkField } from "./CustomerLinkField";
import { ColoredNumberField } from "./ColoredNumberField";
import { SegmentsField } from "./SegmentsField";

const listStyles = {
    nb_commands: { color: "purple" },
};
export const CustomerList = withStyles(listStyles)(({ classes, ...props }) => (
    <List {...props}>
        <Datagrid>
            <CustomerLinkField />
            <DateField source="last_seen" type="date" />
            <NumberField source="nb_commands" label="Orders" className={classes.nb_commands} />
            <ColoredNumberField source="total_spent" options={{ style: "currency", currency: "USD" }} />
            <DateField source="latest_purchase" showTime />
            <BooleanField source="has_newsletter" label="News." />
            <SegmentsField label="Segments" />
            <EditButton />
        </Datagrid>
    </List>
));
