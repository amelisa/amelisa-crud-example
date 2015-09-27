import React from 'react';
import { Link, RouteHandler } from 'react-router';
import { HtmlLayout, RootComponent } from 'engine';

class App extends RootComponent {

  render() {
    let systemData = this.props.model.getSystemData();
    console.log('App render', systemData)

    return (
      <HtmlLayout>
        <p>Online: {systemData.online ? 'Online' : 'Offline'}</p>
        <Link to='/'>List</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
        <Link to='/auth/logout'>Logout</Link>
        <RouteHandler />
      </HtmlLayout>
    )
  }
}

export default App;
