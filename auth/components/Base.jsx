import React from 'react'
import superagent from 'superagent'

class Base extends React.Component {

  constructor () {
    super()
    this.state = {
      sending: false
    }
  }

  send (data, path) {
    this.setState({sending: true})

    superagent
      .post(path)
      .send(data)
      .set('Content-Type', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest')
      .end((err, res) => {
        console.log(err, res.body)
        this.setState({sending: false})

        if (err) return this.setState({error: 'Connection error, please try again'})

        let { info, success } = res.body

        if (success) window.location.reload()

        if (info) this.setState({error: info})
      })
  }
}

export default Base
