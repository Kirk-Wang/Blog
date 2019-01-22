/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import { List, Datagrid, TextField, EditButton } from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import { LinkToRelatedProducts } from "./LinkToRelatedProducts";

const listStyles = {
    name: { padding: "0 12px 0 25px" },
};

export const CategoryList = withStyles(listStyles)(({ classes, ...props }) => (
    <List {...props} sort={{ field: "name", order: "ASC" }}>
        <Datagrid>
            <TextField source="name" className={classes.name} />
            <LinkToRelatedProducts />
            <EditButton />
        </Datagrid>
    </List>
));
