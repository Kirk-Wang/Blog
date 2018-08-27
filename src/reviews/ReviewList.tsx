/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import {
    AutocompleteInput,
    BulkActions,
    BulkDeleteAction,
    Datagrid,
    DateField,
    DateInput,
    EditButton,
    Filter,
    List,
    ReferenceInput,
    Responsive,
    SelectInput,
    TextField,
    TextInput,
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";

import { BulkApproveAction } from "./BulkApproveAction";
import { BulkRejectAction } from "./BulkRejectAction";
import { MobileGrid } from "./MobileGrid";
import { rowStyle } from "./rowStyle";
import { ProductReferenceField } from "../products/ProductReferenceField";
import { CustomerReferenceField } from "../customers/CustomerReferenceField";
import { StarRatingField } from "./StarRatingField";
import { ApproveButton } from "./ApproveButton";

const listStyles: any = {
    comment: {
        maxWidth: "18em",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
};

const filterStyles: any = {
    status: { width: 150 },
};

const optionText = (choice: any) => `${choice.first_name} ${choice.last_name}`;

export const ReviewFilter = withStyles(filterStyles)(({ classes, ...props }) => (
    <Filter {...props}>
        <TextInput label="pos.search" source="q" alwaysOn />
        <SelectInput
            source="status"
            choices={[
                { id: "accepted", name: "Accepted" },
                { id: "pending", name: "Pending" },
                { id: "rejected", name: "Rejected" },
            ]}
            className={classes.status}
        />
        <ReferenceInput source="customer_id" reference="customers">
            <AutocompleteInput optionText={optionText} />
        </ReferenceInput>
        <ReferenceInput source="product_id" reference="products">
            <AutocompleteInput optionText="reference" />
        </ReferenceInput>
        <DateInput source="date_gte" />
        <DateInput source="date_lte" />
    </Filter>
));

const ReviewsBulkActions = (props: any) => (
    <BulkActions {...props}>
        <BulkApproveAction label="resources.reviews.action.accept" />
        <BulkRejectAction label="resources.reviews.action.reject" />
        <BulkDeleteAction />
    </BulkActions>
);

export const ReviewList = withStyles(listStyles)(({ classes, ...props }) => (
    <List
        {...props}
        bulkActions={<ReviewsBulkActions />}
        filters={<ReviewFilter />}
        perPage={25}
        sort={{ field: "date", order: "DESC" }}
    >
        <Responsive
            xsmall={<MobileGrid />}
            medium={
                <Datagrid rowStyle={rowStyle}>
                    <DateField source="date" />
                    <CustomerReferenceField />
                    <ProductReferenceField />
                    <StarRatingField />
                    <TextField source="comment" cellClassName={classes.comment} />
                    <TextField source="status" />
                    <ApproveButton />
                    <EditButton />
                </Datagrid>
            }
        />
    </List>
));
