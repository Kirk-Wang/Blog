/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import simpleRestProvider from "ra-data-simple-rest";
import { Admin, Resource } from "react-admin";
import { englishMessages } from "./i18n/en";
import { chineseMessages } from "./i18n/cn";
import { fakeServer } from "./fakeServer";
import { CustomerList, CustomerEdit, CustomerCreate, CustomerIcon } from "./customers";
import { CommandList, CommandIcon } from "./commands";
import { SegmentList, SegmentIcon } from "./segments";

const dataProvider = simpleRestProvider("http://api.fakeserver.com");

const messages = {
    cn: chineseMessages,
    en: englishMessages,
};

const i18nProvider = (locale: string) => messages[locale];

export class App extends React.Component {
    public componentWillMount() {
        fakeServer();
    }

    public render() {
        return (
            <Admin title="React-Admin-App" dataProvider={dataProvider} locale="cn" i18nProvider={i18nProvider}>
                <Resource
                    icon={CustomerIcon}
                    list={CustomerList}
                    create={CustomerCreate}
                    edit={CustomerEdit}
                    name="customers"
                />
                <Resource icon={SegmentIcon} name="segments" list={SegmentList} />
                <Resource icon={CommandIcon} list={CommandList} name="commands" options={{ label: "Orders" }} />
                <Resource name="reviews" />
                <Resource name="products" />
            </Admin>
        );
    }
}
