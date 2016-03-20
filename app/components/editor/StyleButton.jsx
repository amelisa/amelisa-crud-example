import React, { Component, PropTypes } from 'react'

class StyleButton extends Component {

  static propTypes = {
    active: PropTypes.bool,
    label: PropTypes.string,
    onToggle: PropTypes.func,
    style: PropTypes.any
  };

  render () {
    let { active, label } = this.props

    let className = 'RichEditor-styleButton'
    if (active) {
      className += ' RichEditor-activeButton'
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {label}
      </span>
    )
  }

  onToggle = (e) => {
    let { onToggle, style } = this.props

    e.preventDefault()
    onToggle(style)
  };
}

export default StyleButton
