/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    Filter,
    TextInput,
    ReferenceInput,
    SelectInput,
    Responsive,
    SimpleList,
} from "react-admin";

const PostFilter = (props: any) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

const primaryText = (record: any) => record.title;
const secondaryText = (record: any) => `${record.views} views`;
const tertiaryText = (record: any) => new Date(record.published_at).toLocaleDateString();

export const PostList = (props: any) => (
    <List {...props} filters={<PostFilter />}>
        <Responsive
            small={<SimpleList primaryText={primaryText} secondaryText={secondaryText} tertiaryText={tertiaryText} />}
            medium={
                <Datagrid>
                    <TextField source="id" />
                    <ReferenceField label="User" source="userId" reference="users">
                        <TextField source="name" />
                    </ReferenceField>
                    <TextField source="title" />
                    <TextField source="body" />
                    <EditButton />
                </Datagrid>
            }
        />
    </List>
);
