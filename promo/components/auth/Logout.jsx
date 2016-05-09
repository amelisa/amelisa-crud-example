import React from 'react'
import Base from './Base'
import { Card, Button } from 'react-mdl'

class Logout extends Base {

  render () {
    let { style } = this.props
    let { sending, error } = this.state

    return (
      <Card style={{...styles.form, ...style}} shadow={2}>
        <span style={styles.error}>{error}</span>
        <Button onClick={this.onLogout} disabled={sending}>Logout</Button>
      </Card>
    )
  }

  onLogout = () => {
    this.send({}, '/auth/logout')
  }
}

const styles = {
  form: {
    padding: 20
  },
  error: {
    height: 20,
    color: 'red'
  }
}

export default Logout
