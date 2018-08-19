/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import { Link } from "react-admin";

import { FullNameField } from "./FullNameField";

export const CustomerLinkField: any = (props: any) => (
    <Link to={`/customers/${props.record.id}`}>
        <FullNameField {...props} />
    </Link>
);

CustomerLinkField.defaultProps = {
    source: "customer_id",
    addLabel: true,
};
