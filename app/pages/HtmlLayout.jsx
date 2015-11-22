import React, { PropTypes } from 'react'

class HtmlLayout extends React.Component {

  static propTypes = {
    children: PropTypes.any,
    model: PropTypes.object
  }

  render () {
    let { children, model } = this.props
    let json = model.getBundleJson()
    let style

    if (process.env.NODE_ENV === 'production') {
      style = <link href='/css/apps/app.styles.css' rel='stylesheet' type='text/css' />
    }

    return (
      <html>
        <head>
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <link rel='stylesheet' href='/extra/material.css' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
          {style}
        </head>
        <body>
          <div id='app'>
            {children}
          </div>
          <script defer src='/js/bundle.js' />
          <script defer src='/extra/material.js' />
          <script type='application/json' id='bundle' dangerouslySetInnerHTML={{__html: json}}></script>
        </body>
      </html>
    )
  }
}

export default HtmlLayout
