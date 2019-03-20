import React from "react";
import { Admin, Resource } from 'react-admin';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import { PostList, PostEdit, PostCreate } from './Posts';
import { UserList } from './Users';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import jsonServerProvider from './dataProvider';

// const dataProvider = jsonServerProvider("http://jsonplaceholder.typicode.com");
const dataProvider = jsonServerProvider("http://dev.admin.com:6868");
const App = () => (
  <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
    <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
    <Resource name="users" list={UserList} icon={UserIcon} />
  </Admin>
);

export default App;
