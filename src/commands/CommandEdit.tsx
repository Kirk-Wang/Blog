/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import {
    translate,
    AutocompleteInput,
    BooleanInput,
    DateInput,
    Edit,
    ReferenceInput,
    SelectInput,
    SimpleForm,
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";

import { Basket } from "./Basket";

const CommandTitle = translate(({ record, translate: trans }: any) => (
    <span>
        {trans("resources.commands.name", { smart_count: 1 })} #{record.reference}
    </span>
));

const editStyles: any = {
    clear: { clear: "both" },
};

const optionText = (choice: any) => `${choice.first_name} ${choice.last_name}`;

export const CommandEdit = withStyles(editStyles)(({ classes, ...props }: any) => (
    <Edit title={<CommandTitle />} {...props}>
        <SimpleForm>
            <Basket />
            <DateInput source="date" />
            <ReferenceInput source="customer_id" reference="customers">
                <AutocompleteInput optionText={optionText} />
            </ReferenceInput>
            <SelectInput
                source="status"
                choices={[
                    { id: "delivered", name: "delivered" },
                    { id: "ordered", name: "ordered" },
                    { id: "cancelled", name: "cancelled" },
                ]}
            />
            <BooleanInput source="returned" />
        </SimpleForm>
    </Edit>
));
