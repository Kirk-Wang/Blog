import React from 'react'
import './search.less'
import logo from './images/logo.png'

export class Search extends React.Component {
  render() {
    return <div className="search-text">搜索文字内容: <img src={logo} /> </div>
  }
}