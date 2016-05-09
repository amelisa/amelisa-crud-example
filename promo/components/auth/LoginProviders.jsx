import React from 'react'
import Base from './Base'
import { Card } from 'react-mdl'

class LoginProviders extends Base {

  render () {
    let { style } = this.props

    return (
      <Card style={{...styles.form, ...style}} shadow={2}>
        <a href='/auth/facebook' style={styles.facebook} />
        <a href='/auth/twitter' style={styles.twitter} />
      </Card>
    )
  }

  onLogin = () => {
    this.send({}, '/auth/facebook')
  }
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 130,
    padding: 20,
    background: 'rgba(255,255,255,0.7)'
  },
  error: {
    height: 20,
    color: 'red'
  },
  facebook: {
    width: 202,
    height: 46,
    background: 'url(/img/facebook.png)',
    cursor: 'pointer'
  },
  twitter: {
    width: 141,
    height: 16,
    background: 'url(/img/twitter.png)',
    cursor: 'pointer'
  }
}

export default LoginProviders
