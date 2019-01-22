/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import { translate, SelectInput } from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import compose from "recompose/compose";

import { segments } from "../segments/data";

const styles = {
    input: { width: 150 },
};

export const SegmentInput = compose(
    translate,
    withStyles(styles),
)(({ classes, translate: trans, ...rest }: any) => (
    <SelectInput
        {...rest}
        choices={segments.map((segment: any) => ({
            id: segment.id,
            name: trans(segment.name),
        }))}
        className={classes.input}
    />
));

SegmentInput.defaultProps = {
    source: "groups",
};
