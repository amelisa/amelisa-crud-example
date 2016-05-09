import React from 'react'
import Base from './Base'
import { Card, Textfield, Button } from 'react-mdl'

class Login extends Base {

  render () {
    let { style } = this.props
    let { sending, error } = this.state

    return (
      <Card style={{...styles.form, ...style}} shadow={2}>
        <Textfield label='Email' type='email' ref='email' />
        <Textfield label='Password' type='password' ref='password' />
        <span style={styles.error}>{error}</span>
        <Button onClick={this.onLogin} disabled={sending}>Login</Button>
      </Card>
    )
  }

  onLogin = () => {
    let email = this.refs.email.refs.input.value
    let password = this.refs.password.refs.input.value

    let data = {
      email,
      password
    }

    this.send(data, '/auth/login')
  }
}

const styles = {
  form: {
    minHeight: 230,
    padding: 20,
    background: 'rgba(255,255,255,0.7)'
  },
  error: {
    height: 20,
    color: 'red'
  }
}

export default Login
