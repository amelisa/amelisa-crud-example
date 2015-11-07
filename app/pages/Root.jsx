import React from 'react';
import { RootComponent } from 'amelisa';
import App from './App';

class Root extends RootComponent {

  render() {
    return (
      <App>
        {this.props.children}
      </App>
    )
  }
}

export default Root;
