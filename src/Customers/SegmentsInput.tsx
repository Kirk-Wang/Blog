/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import { translate, SelectArrayInput } from "react-admin";

import { segments } from "../segments/data";

export const SegmentsInput = translate(({ translate: trans, addField, ...rest }: any) => (
    <SelectArrayInput
        {...rest}
        choices={segments.map((segment: any) => ({
            id: segment.id,
            name: trans(segment.name),
        }))}
    />
));

SegmentsInput.defaultProps = {
    addField: true,
    source: "groups",
};
