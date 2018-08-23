/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import { FunctionField } from "react-admin";

const render = (record: any) => record.basket.length;

export const NbItemsField: any = (props: any) => <FunctionField {...props} render={render} />;

NbItemsField.defaultProps = {
    label: "Nb Items",
    textAlign: "right",
};
