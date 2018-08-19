/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import { NumberField } from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";

const fieldStyles = {
    color: { color: "red" },
};

const colored = (WrappedComponent: any) => {
    /*
    const Colored: any = (props: any) =>
        props.record[props.source] > 500 ? <WrappedComponent {...props} /> : <WrappedComponent {...props} />; */

    const Colored = withStyles(fieldStyles)(
        ({ classes, ...props }: any) =>
            props.record[props.source] > 500 ? (
                <WrappedComponent {...props} className={classes.color} />
            ) : (
                <WrappedComponent {...props} />
            ),
    );

    Colored.displayName = `Colored(${WrappedComponent.displayName})`;

    return Colored;
};

export const ColoredNumberField = colored(NumberField);
ColoredNumberField.defaultProps = NumberField.defaultProps;
