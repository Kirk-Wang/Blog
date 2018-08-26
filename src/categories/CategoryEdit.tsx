/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import {
    Edit,
    Datagrid,
    SimpleForm,
    NumberField,
    EditButton,
    translate,
    TextInput,
    ReferenceManyField,
} from "react-admin";
import { ThumbnailField } from "../products/ThumbnailField";
import { ProductRefField } from "../products/ProductRefField";

const CategoryTitle = translate(({ record, translate: trans }: any) => (
    <span>
        {trans("resources.categories.name", { smart_count: 1 })} &quot; {record.name}
        &quot;
    </span>
));

export const CategoryEdit = (props: any) => (
    <Edit title={<CategoryTitle />} {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <ReferenceManyField
                reference="products"
                target="category_id"
                label="resources.categories.fields.products"
                perPage={5}
            >
                <Datagrid>
                    <ThumbnailField />
                    <ProductRefField source="reference" />
                    <NumberField source="price" options={{ style: "currency", currency: "USD" }} />
                    <NumberField source="width" options={{ minimumFractionDigits: 2 }} />
                    <NumberField source="height" options={{ minimumFractionDigits: 2 }} />
                    <NumberField source="stock" />
                    <EditButton />
                </Datagrid>
            </ReferenceManyField>
        </SimpleForm>
    </Edit>
);
