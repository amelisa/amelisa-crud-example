import React, { PropTypes } from 'react'
import { RootComponent } from 'amelisa/react'
import Loading from '../../components/Loading'
let isServer = process.title !== 'browser'

class Root extends RootComponent {

  static propTypes = {
    children: PropTypes.element
  };

  render () {
    let { children } = this.props

    // server rendering is disabled intentionally, because it's not finished
    if (isServer) return <Loading />

    return children
  }
}

export default Root
