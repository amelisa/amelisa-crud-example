import React from 'react';
import { HtmlLayout, RootComponent } from 'amelisa';
import App from './App';

class Root extends RootComponent{

  render() {
    return (
      <HtmlLayout>
        <App />
      </HtmlLayout>
    )
  }
}

export default Root;
