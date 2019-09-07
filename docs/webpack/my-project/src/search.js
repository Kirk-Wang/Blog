'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import './search.less'

class Search extends React.Component {
  render() {
    return <div className="search-text">search text</div>
  }
}

ReactDOM.render(<Search/>, document.getElementById('root'))