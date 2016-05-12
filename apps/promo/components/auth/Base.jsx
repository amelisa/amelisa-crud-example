import { Component } from 'react'

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  credentials: 'include'
}

class Base extends Component {

  constructor () {
    super()

    this.state = {
      sending: false
    }
  }

  static defaultProps = {
    style: {}
  }

  send (data, path) {
    this.setState({sending: true})

    window.fetch(path, {...options, body: JSON.stringify(data)})
      .then((res) => {
        if (res.status !== 200) throw new Error('Internal Error')

        return res.json()
      })
      .then((data) => {
        let { info, success } = data

        this.setState({sending: false})

        if (success) window.location.reload()

        if (info) this.setState({error: info})
      })
  }
}

export default Base
