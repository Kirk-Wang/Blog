/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import { Link } from "react-router-dom";

export const ProductRefField: any = ({ record }: any) => <Link to={`products/${record.id}`}>{record.reference}</Link>;

ProductRefField.defaultProps = {
    source: "id",
    label: "Reference",
};
