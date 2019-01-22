/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import { ReferenceField, TextField } from "react-admin";

export const ProductReferenceField: any = (props: any) => (
    <ReferenceField label="Product" source="product_id" reference="products" {...props}>
        <TextField source="reference" />
    </ReferenceField>
);

ProductReferenceField.defaultProps = {
    source: "product_id",
    addLabel: true,
};
