/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import { List, ReferenceInput, Filter, TextInput, SelectInput, NumberInput } from "react-admin";

import { GridList } from "./GridList";

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
    </Filter>
);

export const ProductList = (props: any) => (
    <List {...props} filters={<ProductFilter />} perPage={20} sort={{ field: "id", order: "ASC" }}>
        <GridList />
    </List>
);
