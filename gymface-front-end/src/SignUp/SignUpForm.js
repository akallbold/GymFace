import React from 'react';
import CLUBS from '../ClubData'

const SignUpForm = (props) => (
  <form onSubmit={props.submit}>
    <input type="text" className="button" name="name"placeholder="Name" /><br/>
    <input type="text" className="button" name="email" placeholder="Email" /><br/>
    <select name="club" className="button">
      <option value="">Select your club location:</option>
      {Object.keys(CLUBS).map(id => <option value={id} key={id}>{CLUBS[id]}</option>)}
    </select><br/>
    <input type="text" className="button" name="username"placeholder="Username" /><br/>
    <input type="password" className="button" name="password" placeholder="Password" /><br/>
    <input type="submit" className="button" value="Sign Up" /><br/>
  </form>
);

export default SignUpForm;
