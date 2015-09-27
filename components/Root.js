import React from 'react';
import { HtmlLayout, RootComponent } from 'engine';
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
