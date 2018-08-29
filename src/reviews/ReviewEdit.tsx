/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import { DateField, Edit, LongTextInput, ReferenceField, SelectInput, TextField, SimpleForm } from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import { ReviewEditActions } from "./ReviewEditActions";
import { ProductReferenceField } from "../products/ProductReferenceField";
import { CustomerReferenceField } from "../customers/CustomerReferenceField";
import { StarRatingField } from "./StarRatingField";

const editStyle = {
    detail: {
        display: "inline-block",
        verticalAlign: "top",
        marginRight: "2em",
        minWidth: "8em",
    },
};
export const ReviewEdit = withStyles(editStyle)(({ classes, ...props }) => (
    <Edit {...props} actions={<ReviewEditActions />}>
        <SimpleForm>
            <DateField source="date" formClassName={classes.detail} />
            <CustomerReferenceField formClassName={classes.detail} />
            <ProductReferenceField formClassName={classes.detail} />
            <ReferenceField source="command_id" reference="commands" addLabel formClassName={classes.detail}>
                <TextField source="reference" />
            </ReferenceField>
            <StarRatingField formClassName={classes.detail} />
            <LongTextInput source="comment" />
            <SelectInput
                source="status"
                choices={[
                    { id: "accepted", name: "Accepted" },
                    { id: "pending", name: "Pending" },
                    { id: "rejected", name: "Rejected" },
                ]}
            />
        </SimpleForm>
    </Edit>
));
