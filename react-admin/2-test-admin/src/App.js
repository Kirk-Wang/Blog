import React from "react"
import { Admin, Resource } from 'react-admin';
import { UserList } from './users';
import { PostList } from './posts';
import jsonServerProvider from 'ra-data-json-server'

const dataProvider = jsonServerProvider('http://localhost:3004')
const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="posts" list={PostList} />
    <Resource name="users" list={UserList} />
  </Admin>
)

export default App
