const React = require('react')
const logo = require('./images/logo.png')
const evLargeNumber = require('ev-large-number')
require('./search.less')

class Search extends React.Component {

  constructor() {
    super(...arguments)
    this.state = {
      Text: null
    }
  }

  loadComponent() {
    import('./text').then((text) => {
      this.setState({
        Text: text.default
      })
    })
  }

  render() {
    const { Text } = this.state
    return (
      <div className="search-text">
        <div>{evLargeNumber('9999999999', '10')}</div>
        {Text ? <Text/> : null}
        请输入搜索内容: <img src={logo} onClick={this.loadComponent.bind(this)}/> 
      </div>)
  }
}

module.exports = <Search />