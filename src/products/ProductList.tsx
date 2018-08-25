/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import { List, ReferenceInput, Filter, TextInput, SelectInput, NumberInput, translate } from "react-admin";
import Chip from "@material-ui/core/Chip";

import { GridList } from "./GridList";

const QuickFilter = translate(({ label, translate: trans }: any) => <Chip>{trans(label)}</Chip>);

export const ProductFilter = (props: any) => (
    <Filter {...props}>
        <TextInput label="pos.search" source="q" alwaysOn />
        <ReferenceInput source="category_id" reference="categories" sort={{ field: "id", order: "ASC" }}>
            <SelectInput source="name" />
        </ReferenceInput>
        <NumberInput source="width_gte" />
        <NumberInput source="width_lte" />
        <NumberInput source="height_gte" />
        <NumberInput source="height_lte" />
        <QuickFilter label="resources.products.fields.stock_lte" source="stock_lte" defaultValue={10} />
    </Filter>
);

export const ProductList = (props: any) => (
    <List {...props} filters={<ProductFilter />} perPage={20} sort={{ field: "id", order: "ASC" }}>
        <GridList />
    </List>
);
