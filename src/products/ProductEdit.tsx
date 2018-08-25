/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import {
    Edit,
    ReferenceInput,
    TextInput,
    SelectInput,
    NumberInput,
    TabbedForm,
    FormTab,
    ReferenceManyField,
    Datagrid,
    DateField,
    TextField,
    EditButton,
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import RichTextInput from "ra-input-rich-text";
import { createStyles } from "./ProductCreate";
import { Poster } from "./Poster";
import { CustomerReferenceField } from "../customers/CustomerReferenceField";
import { StarRatingField } from "../reviews/StarRatingField";

const ProductTitle = ({ record }: any) => <span>产品（海报） #{record.reference}</span>;

const editStyles: any = {
    ...createStyles,
    comment: {
        maxWidth: "20em",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
};

export const ProductEdit = withStyles(editStyles)(({ classes, ...props }) => (
    <Edit {...props} title={<ProductTitle />}>
        <TabbedForm>
            <FormTab label="resources.products.tabs.image">
                <Poster />
                <TextInput source="image" options={{ fullWidth: true }} />
                <TextInput source="thumbnail" options={{ fullWidth: true }} />
            </FormTab>
            <FormTab label="resources.products.tabs.details">
                <TextInput source="reference" />
                <NumberInput source="price" className={classes.price} />
                <NumberInput source="width" className={classes.width} formClassName={classes.widthFormGroup} />
                <NumberInput source="height" className={classes.height} formClassName={classes.heightFormGroup} />
                <ReferenceInput source="category_id" reference="categories">
                    <SelectInput source="name" />
                </ReferenceInput>
                <NumberInput source="stock" className={classes.stock} />
            </FormTab>
            <FormTab label="resources.products.tabs.description">
                <RichTextInput source="description" addLabel={false} />
            </FormTab>
            <FormTab label="resources.products.tabs.reviews">
                <ReferenceManyField reference="reviews" target="product_id" addLabel={false}>
                    <Datagrid>
                        <DateField source="date" />
                        <CustomerReferenceField />
                        <StarRatingField />
                        <TextField source="comment" cellClassName={classes.comment} />
                        <TextField source="status" />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </FormTab>
        </TabbedForm>
    </Edit>
));
