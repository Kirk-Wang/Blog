/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import { Edit, SimpleForm, DisabledInput, ReferenceInput, SelectInput, TextInput, LongTextInput } from "react-admin";

const PostTitle = ({ record }: any) => {
    return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

export const PostEdit = (props: any) => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <ReferenceInput label="User" source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <LongTextInput source="body" />
        </SimpleForm>
    </Edit>
);
