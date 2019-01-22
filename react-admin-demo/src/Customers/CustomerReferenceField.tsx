/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import { ReferenceField } from "react-admin";

import { FullNameField } from "./FullNameField";

export const CustomerReferenceField: any = (props: any) => (
    <ReferenceField source="customer_id" reference="customers" {...props}>
        <FullNameField />
    </ReferenceField>
);
CustomerReferenceField.defaultProps = {
    source: "customer_id",
    addLabel: true,
};
