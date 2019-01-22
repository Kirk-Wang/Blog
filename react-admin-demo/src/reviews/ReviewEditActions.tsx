/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import CardActions from "@material-ui/core/CardActions";
import { ListButton, DeleteButton, RefreshButton } from "react-admin";

import { AcceptButton } from "./AcceptButton";
import { RejectButton } from "./RejectButton";

const cardActionStyle: any = {
    zIndex: 2,
    display: "inline-block",
    float: "right",
};

export const ReviewEditActions = ({ basePath, data, resource, hasShow, refresh }: any) => (
    <CardActions style={cardActionStyle}>
        <AcceptButton record={data} />
        <RejectButton record={data} />
        <ListButton basePath={basePath} />
        <DeleteButton basePath={basePath} record={data} resource={resource} />
        <RefreshButton refresh={refresh} />
    </CardActions>
);
