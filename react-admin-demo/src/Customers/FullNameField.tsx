/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import { AvatarField } from "./AvatarField";
import pure from "recompose/pure";

export const FullNameField: any = ({ record = {}, size }: any) => (
    <div style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}>
        <AvatarField record={record} size={size} />
        {record.first_name} {record.last_name}
    </div>
);

const PureFullNameField = pure(FullNameField);

PureFullNameField.defaultProps = {
    source: "last_name",
    label: "resources.customers.fields.name",
};
