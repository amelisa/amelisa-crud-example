import React, { Component } from 'react'

class Loading extends Component {

  render () {
    return (
      <div style={styles.container} />
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'url(http://www.getmdl.io/assets/demos/transparent.jpg) center / cover'
  }
}

export default Loading
