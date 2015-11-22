import React from 'react'
import Base from './Base'
import { Card, Textfield, Button } from 'react-mdl'

class Register extends Base {

  render () {
    let { sending, error } = this.state

    return (
      <Card className='form' shadowLevel={2}>
        <Textfield label='Email' type='email' ref='email' />
        <Textfield label='Password' type='password' ref='password' />
        <Textfield label='Confirm' type='password' ref='confirm' />
        <Button onClick={this.register.bind(this)} disabled={sending}>Register</Button>
        <span className='error'>{error}</span>
      </Card>
    )
  }

  register () {
    let email = this.refs.email.refs.input.value
    let password = this.refs.password.refs.input.value
    let confirm = this.refs.confirm.refs.input.value

    let data = {
      email,
      password,
      confirm
    }

    this.send(data, '/auth/register')
  }
}

export default Register
