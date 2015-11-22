import React from 'react'
import Base from './Base'
import { Card, Button } from 'react-mdl'

class Logout extends Base {

  render () {
    let { sending, error } = this.state

    return (
      <Card className='form' shadowLevel={2}>
        <Button onClick={this.logout.bind(this)} disabled={sending}>Logout</Button>
        <span className='error'>{error}</span>
      </Card>
    )
  }

  logout () {
    this.send({}, '/auth/logout')
  }
}

export default Logout
