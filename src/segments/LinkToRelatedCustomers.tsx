/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import compose from "recompose/compose";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { translate } from "react-admin";
import { stringify } from "query-string";

import { CustomerIcon } from "../customers";

const styles = {
    icon: { paddingRight: "0.5em" },
    link: {
        display: "inline-flex",
        alignItems: "center",
    },
};

const Comp = ({ classes, segment, translate: trans }: any) => (
    <Button
        size="small"
        color="primary"
        component={Link}
        to={{
            pathname: "/customers",
            search: stringify({
                page: 1,
                perPage: 25,
                filter: JSON.stringify({ groups: segment }),
            }),
        }}
        className={classes.link}
    >
        <CustomerIcon className={classes.icon} />
        {trans("resources.segments.fields.customers")}
    </Button>
);

export const LinkToRelatedCustomers: any = compose(
    withStyles(styles),
    translate,
)(Comp);
