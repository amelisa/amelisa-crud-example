import React, { Component, PropTypes } from 'react'

class HtmlLayout extends Component {

  static propTypes = {
    app: PropTypes.string,
    children: PropTypes.any,
    model: PropTypes.object
  }

  render () {
    let { app, children, model } = this.props
    let json = model.getBundleJson()
    let style

    if (process.env.NODE_ENV === 'production') {
      style = <link href={`/css/apps/${app}.styles.css`} rel='stylesheet' type='text/css' />
    }

    return (
      <html>
        <head>
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <meta charSet='utf-8' />
          <link rel='stylesheet' href='/extra/material.min.css' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
          {style}
        </head>
        <body>
          <div id='root'>{children}</div>
          <script defer src='/extra/material.min.js' />
          <script defer src={`/js/${app}.bundle.js`} />
          <script type='application/json' id='bundle' dangerouslySetInnerHTML={{__html: json}}></script>
        </body>
      </html>
    )
  }
}

export default HtmlLayout
