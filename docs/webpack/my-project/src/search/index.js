'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import { Search } from './hot-update-Search'

const rootEl = document.getElementById('root')
ReactDOM.render(<Search/>, rootEl)
if(module.hot) {
  module.hot.accept("./hot-update-Search", function() {
    ReactDOM.render(<Search/>, rootEl)
  })
}