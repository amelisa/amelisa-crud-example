import React, { Component } from 'react'
import ReactQuill from 'react-quill'

class QuillEditor extends Component {

  componentDidMount () {
    let { value } = this.props
    let { quill } = this.refs

    setTimeout(() => {
      this.editor = quill.getEditor()

      if (!value) return

      this.updating = true
      for (let delta of value) {
        this.editor.updateContents(delta)
      }
      this.updating = false
    })
  }

  componentWillReceiveProps (nextProps) {
    let { value } = nextProps
    this.updating = true
    this.editor.setContents([])

    for (let delta of value) {
      this.editor.updateContents(delta)
    }
    this.updating = false
  }

  render () {
    return <ReactQuill ref='quill' theme='snow' onChange={this.onChange} />
  }

  onChange = (value, delta) => {
    let { onChange } = this.props
    if (this.updating) return
    if (onChange) onChange(delta)
  }
}

export default QuillEditor
