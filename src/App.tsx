/**
 *  Copyright Kirk Technologies.
 */

import * as React from "react";
import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import PostIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";
import { PostList, PostEdit, PostCreate } from "./Post";
import { UserList } from "./User";
import { Dashboard } from "./Dashboard";
import { authProvider } from "./authProvider";

const dataProvider = jsonServerProvider("http://jsonplaceholder.typicode.com");

export const App = () => (
    <Admin dashboard={Dashboard} dataProvider={dataProvider} authProvider={authProvider}>
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
        <Resource name="users" list={UserList} icon={UserIcon} />
    </Admin>
);
