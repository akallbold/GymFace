import React from 'react';

import Webcam from 'react-webcam'

const LoginForm = (props) => (
  <form  onSubmit={props.loginCallback}>
    <input className= "button" type="text" name="username" placeholder="Username" />
    <input className= "button" type="password" name="password" placeholder="Password" />
    <input className="button" type="submit" value="Login" />
  </form>
);

export default LoginForm;
