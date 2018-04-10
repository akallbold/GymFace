import React from 'react';
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const Header = (props) => (
  <div id="header">
    <Menu inverted>
      <Link to="/"><Menu.Item content="Dashboard"/></Link>
      <Link to="/classes"><Menu.Item content="View Classes"/></Link>
      <Menu.Item position="right" content={<Link to="/account">My Account</Link>}/>
      {props.currentUser ? <Menu.Item onClick={props.logout} content="Logout"/> : null}
    </Menu>

  </div>
);

export default Header;
