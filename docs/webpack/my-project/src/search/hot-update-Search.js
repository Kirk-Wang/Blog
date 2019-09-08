import React from 'react'
import './search.less'
import logo from './images/logo.png'
import { a } from './tree-shaking'

export class Search extends React.Component {
  render() {
    return <div className="search-text">{a()}请输入搜索内容: <img src={logo} /> </div>
  }
}