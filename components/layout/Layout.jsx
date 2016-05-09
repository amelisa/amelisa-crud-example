import React, { Component, PropTypes } from 'react'
import { Layout as MdlLayout } from 'react-mdl'

class Layout extends Component {

  static contextTypes = {
    model: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    style: PropTypes.any
  }

  render () {
    let { children, style = {} } = this.props

    return (
      <MdlLayout fixedHeader style={{...styles.layout, ...style}}>
        {children}
      </MdlLayout>
    )
  }
}

const styles = {
  layout: {
    background: 'url(http://www.getmdl.io/assets/demos/transparent.jpg) center / cover'
  }
}

export default Layout
