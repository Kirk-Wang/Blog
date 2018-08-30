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
import { CommandList, CommandIcon, CommandEdit } from "./commands";
import { ProductList, ProductCreate, ProductEdit, ProductIcon } from "./products";
import { Segments, SegmentsIcon } from "./segments";
import { CategoryList, CategoryIcon, CategoryEdit } from "./categories";
import { ReviewIcon, ReviewList, ReviewEdit } from "./reviews";
import { Menu } from "./Menu";
import { customRoutes } from "./routes";
import { sagas } from "./sagas";
import { themeReducer } from "./themeReducer";
import { AppLayout } from "./Layout";

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
            <Admin
                title="React-Admin-App"
                dataProvider={dataProvider}
                customReducers={{ theme: themeReducer }}
                customSagas={sagas}
                menu={Menu}
                locale="cn"
                customRoutes={customRoutes}
                i18nProvider={i18nProvider}
                appLayout={AppLayout}
            >
                <Resource
                    icon={CustomerIcon}
                    list={CustomerList}
                    create={CustomerCreate}
                    edit={CustomerEdit}
                    name="customers"
                />
                <Resource icon={SegmentsIcon} name="segments" list={Segments} />
                <Resource
                    icon={CommandIcon}
                    list={CommandList}
                    edit={CommandEdit}
                    name="commands"
                    options={{ label: "Orders" }}
                />
                <Resource
                    icon={ProductIcon}
                    name="products"
                    list={ProductList}
                    create={ProductCreate}
                    edit={ProductEdit}
                />
                <Resource icon={CategoryIcon} name="categories" list={CategoryList} edit={CategoryEdit} />
                <Resource icon={ReviewIcon} name="reviews" list={ReviewList} edit={ReviewEdit} />
            </Admin>
        );
    }
}
