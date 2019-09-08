import React from 'react'
import './search.less'
import logo from './images/logo.png'

export class Search extends React.Component {
  render() {
    return <div className="search-text">请输入搜索内容: <img src={logo} /> </div>
  }
}