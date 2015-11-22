import { RootComponent } from 'amelisa'

class Root extends RootComponent {

  render () {
    let { children } = this.props

    return children
  }
}

export default Root
