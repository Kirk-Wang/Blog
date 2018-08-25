/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import Card from "@material-ui/core/Card";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { translate, ViewTitle } from "react-admin";

import { LinkToRelatedCustomers } from "./LinkToRelatedCustomers";
import { segments } from "./data";

export const SegmentList = translate(({ translate: trans }: any) => (
    <Card>
        <ViewTitle title={trans("resources.segments.name")} />
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>{trans("resources.segments.fields.name")}</TableCell>
                    <TableCell />
                </TableRow>
            </TableHead>
            <TableBody>
                {segments.map((segment: any) => (
                    <TableRow key={segment.id}>
                        <TableCell>{trans(segment.name)}</TableCell>
                        <TableCell>
                            <LinkToRelatedCustomers segment={segment.id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </Card>
));
