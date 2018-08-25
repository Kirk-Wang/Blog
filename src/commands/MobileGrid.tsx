/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import { DateField, EditButton, translate, NumberField, TextField, BooleanField } from "react-admin";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import { CustomerReferenceField } from "../customers/CustomerReferenceField";

const listStyles: any = (theme: any) => ({
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        margin: "0.5rem 0",
    },
    cardTitleContent: {
        display: "flex",
        flexDirection: "rows",
        alignItems: "center",
        justifyContent: "space-between",
    },
    cardContent: theme.typography.body1,
    cardContentRow: {
        display: "flex",
        flexDirection: "rows",
        alignItems: "center",
        margin: "0.5rem 0",
    },
});

export const MobileGrid: any = withStyles(listStyles)(
    translate(({ classes, ids, data, basePath, translate: trans }: any) => (
        <div style={{ margin: "1em" }}>
            {ids.map((id: number) => (
                <Card key={id} className={classes.card}>
                    <CardHeader
                        title={
                            <div className={classes.cardTitleContent}>
                                <span>
                                    {trans("resources.commands.name", 1)}
                                    :&nbsp;
                                    <TextField record={data[id]} source="reference" />
                                </span>
                                <EditButton resource="commands" basePath={basePath} record={data[id]} />
                            </div>
                        }
                    />
                    <CardContent className={classes.cardContent}>
                        <span className={classes.cardContentRow}>
                            {trans("resources.customers.name", 1)}
                            :&nbsp;
                            <CustomerReferenceField record={data[id]} basePath={basePath} />
                        </span>
                        <span className={classes.cardContentRow}>
                            {trans("resources.reviews.fields.date")}
                            :&nbsp;
                            <DateField record={data[id]} source="date" showTime />
                        </span>
                        <span className={classes.cardContentRow}>
                            {trans("resources.commands.fields.basket.total")}
                            :&nbsp;
                            <NumberField
                                record={data[id]}
                                source="total"
                                options={{ style: "currency", currency: "USD" }}
                                className={classes.total}
                            />
                        </span>
                        <span className={classes.cardContentRow}>
                            {trans("resources.commands.fields.status")}
                            :&nbsp;
                            <TextField source="status" record={data[id]} />
                        </span>
                        <span className={classes.cardContentRow}>
                            {trans("resources.commands.fields.returned")}
                            :&nbsp;
                            <BooleanField record={data[id]} source="returned" />
                        </span>
                    </CardContent>
                </Card>
            ))}
        </div>
    )),
);

MobileGrid.defaultProps = {
    data: {},
    ids: [],
};
