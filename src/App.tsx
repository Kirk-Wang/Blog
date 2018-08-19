/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import simpleRestProvider from "ra-data-simple-rest";
import { Admin, Resource } from "react-admin";
import { fakeServer } from "./fakeServer";
import { CustomerList } from "./Customers";

const dataProvider = simpleRestProvider("http://api.fakeserver.com");

export class App extends React.Component {
    public componentWillMount() {
        fakeServer();
    }

    public render() {
        return (
            <Admin title="React-Admin-App" dataProvider={dataProvider}>
                <Resource list={CustomerList} name="customers" />
            </Admin>
        );
    }
}
