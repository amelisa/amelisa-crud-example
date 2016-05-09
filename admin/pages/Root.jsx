import { PropTypes } from 'react'
import { RootComponent } from 'react-amelisa'

class Root extends RootComponent {

  static propTypes = {
    children: PropTypes.element
  }

  render () {
    let { children } = this.props

    return children
  }
}

export default Root
