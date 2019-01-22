/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import {
    AutocompleteInput,
    BooleanField,
    Datagrid,
    DateField,
    DateInput,
    EditButton,
    Filter,
    List,
    NullableBooleanInput,
    NumberField,
    ReferenceInput,
    Responsive,
    TextField,
    TextInput,
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/icons/AttachMoney";
import Divider from "@material-ui/core/Divider";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { NbItemsField } from "./NbItemsField";
import { CustomerReferenceField } from "../customers/CustomerReferenceField";
import { MobileGrid } from "./MobileGrid";

export const CommandIcon = Icon;

const filterStyles = {
    status: { width: 150 },
};

const optionText = (choice: any) => `${choice.first_name} ${choice.last_name}`;

const CommandFilter = withStyles(filterStyles)(({ classes, ...props }) => (
    <Filter {...props}>
        <TextInput label="pos.search" source="q" alwaysOn />
        <ReferenceInput source="customer_id" reference="customers">
            <AutocompleteInput optionText={optionText} />
        </ReferenceInput>
        <DateInput source="date_gte" />
        <DateInput source="date_lte" />
        <TextInput source="total_gte" />
        <NullableBooleanInput source="returned" />
    </Filter>
));

const datagridStyles: any = {
    total: { fontWeight: "bold" },
};

const Fragment = React.Fragment;

class TabbedDatagrid extends React.Component<any, any> {
    public static getDerivedStateFromProps(props: any, state: any) {
        if (props.ids !== state[props.filterValues.status]) {
            return { ...state, [props.filterValues.status]: props.ids };
        }
        return null;
    }

    public state = { ordered: [], delivered: [], cancelled: [] };

    private tabs = [
        { id: "ordered", name: "ordered" },
        { id: "delivered", name: "delivered" },
        { id: "cancelled", name: "cancelled" },
    ];

    public handleChange = (event: any, value: any) => {
        const { filterValues, setFilters } = this.props;
        setFilters({ ...filterValues, status: value });
    };

    public render() {
        const { classes, filterValues, ...props } = this.props;
        return (
            <Fragment>
                <Tabs
                    fullWidth
                    centered
                    value={filterValues.status}
                    indicatorColor="primary"
                    onChange={this.handleChange}
                >
                    {this.tabs.map(choice => (
                        <Tab key={choice.id} label={choice.name} value={choice.id} />
                    ))}
                </Tabs>
                <Divider />
                <Responsive
                    xsmall={<MobileGrid {...props} ids={this.state[filterValues.status]} />}
                    medium={
                        <div>
                            {filterValues.status === "ordered" && (
                                <Datagrid {...props} ids={this.state.ordered}>
                                    <DateField source="date" showTime />
                                    <TextField source="reference" />
                                    <CustomerReferenceField />
                                    <NbItemsField />
                                    <NumberField
                                        source="total"
                                        options={{
                                            style: "currency",
                                            currency: "USD",
                                        }}
                                        className={classes.total}
                                    />
                                    <EditButton />
                                </Datagrid>
                            )}
                            {filterValues.status === "delivered" && (
                                <Datagrid {...props} ids={this.state.delivered}>
                                    <DateField source="date" showTime />
                                    <TextField source="reference" />
                                    <CustomerReferenceField />
                                    <NbItemsField />
                                    <NumberField
                                        source="total"
                                        options={{
                                            style: "currency",
                                            currency: "USD",
                                        }}
                                        className={classes.total}
                                    />
                                    <BooleanField source="returned" />
                                    <EditButton />
                                </Datagrid>
                            )}
                            {filterValues.status === "cancelled" && (
                                <Datagrid {...props} ids={this.state.cancelled}>
                                    <DateField source="date" showTime />
                                    <TextField source="reference" />
                                    <CustomerReferenceField />
                                    <NbItemsField />
                                    <NumberField
                                        source="total"
                                        options={{
                                            style: "currency",
                                            currency: "USD",
                                        }}
                                        className={classes.total}
                                    />
                                    <BooleanField source="returned" />
                                    <EditButton />
                                </Datagrid>
                            )}
                        </div>
                    }
                />
            </Fragment>
        );
    }
}

const StyledTabbedDatagrid = withStyles(datagridStyles)(TabbedDatagrid);

export const CommandList = ({ classes, ...props }: any) => (
    <List
        {...props}
        filterDefaultValues={{ status: "ordered" }}
        sort={{ field: "date", order: "DESC" }}
        perPage={25}
        filters={<CommandFilter />}
    >
        <StyledTabbedDatagrid />
    </List>
);
