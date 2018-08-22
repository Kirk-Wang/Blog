/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import { translate, SelectArrayInput } from "react-admin";

import { segments } from "../segments/data";

const SegmentsInput = ({ translate: trans, addField, ...rest }: any) => (
    <SelectArrayInput
        {...rest}
        choices={segments.map((segment: any) => ({
            id: segment.id,
            name: trans(segment.name),
        }))}
    />
);

export const TranslatedSegmentsInput = translate(SegmentsInput);

TranslatedSegmentsInput.defaultProps = {
    addField: true,
    source: "groups",
};
