/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import { List, Datagrid } from "react-admin";
import { CustomerLinkField } from "./CustomerLinkField";

export const CustomerList = (props: any) => (
    <List {...props}>
        <Datagrid>
            <CustomerLinkField />
        </Datagrid>
    </List>
);
