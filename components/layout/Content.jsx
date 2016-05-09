import React, { Component, PropTypes } from 'react'
import { Content as MdlContent } from 'react-mdl'

class Content extends Component {

  static contextTypes = {
    model: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any
  }

  render () {
    let { children } = this.props

    return (
      <MdlContent style={styles.content}>
        {children}
      </MdlContent>
    )
  }
}

const styles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    alignItems: 'center'
  }
}

export default Content
