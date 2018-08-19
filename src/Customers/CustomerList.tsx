/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import { List, Datagrid, TextField } from "react-admin";

export const CustomerList = (props: any) => (
    <List title="All Customers" {...props}>
        <Datagrid>
            <TextField source="id" />
        </Datagrid>
    </List>
);
