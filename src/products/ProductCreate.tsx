/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import {
    Create,
    ReferenceInput,
    TextInput,
    SelectInput,
    NumberInput,
    TabbedForm,
    FormTab,
    required,
} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import withStyles from "@material-ui/core/styles/withStyles";

export const createStyles = {
    stock: { width: "5em" },
    price: { width: "5em" },
    width: { width: "5em" },
    widthFormGroup: { display: "inline-block" },
    height: { width: "5em" },
    heightFormGroup: { display: "inline-block", marginLeft: 32 },
};

export const ProductCreate = withStyles(createStyles)(({ classes, ...props }) => (
    <Create {...props}>
        <TabbedForm>
            <FormTab label="resources.products.tabs.image">
                <TextInput source="image" options={{ fullWidth: true }} validate={required()} />
                <TextInput source="thumbnail" options={{ fullWidth: true }} validate={required()} />
            </FormTab>
            <FormTab label="resources.products.tabs.details">
                <TextInput source="reference" validate={required()} />
                <NumberInput source="price" validate={required()} className={classes.price} />
                <NumberInput
                    source="width"
                    validate={required()}
                    className={classes.width}
                    formClassName={classes.widthFormGroup}
                />
                <NumberInput
                    source="height"
                    validate={required()}
                    className={classes.height}
                    formClassName={classes.heightFormGroup}
                />
                <ReferenceInput source="category_id" reference="categories" allowEmpty>
                    <SelectInput source="name" />
                </ReferenceInput>
                <NumberInput source="stock" validate={required()} className={classes.stock} />
            </FormTab>
            <FormTab label="resources.products.tabs.description">
                <RichTextInput source="description" addLabel={false} />
            </FormTab>
        </TabbedForm>
    </Create>
));
