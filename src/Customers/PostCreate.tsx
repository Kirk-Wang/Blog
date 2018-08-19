/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import { Create, SimpleForm, ReferenceInput, SelectInput, TextInput, LongTextInput } from "react-admin";

export const PostCreate = (props: any) => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput label="User" source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <LongTextInput source="body" />
        </SimpleForm>
    </Create>
);
