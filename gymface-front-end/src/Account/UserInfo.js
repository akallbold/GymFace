import React from 'react';

const UserInfo = (props) => (








props.edit ?
    <div>
      <h3>Account Information</h3>
      <form onSubmit={props.handleFormInput}>
        <input onChange={props.handleName} value={props.user.name} name="name" ></input><br />
        <input onChange={props.handleUsername} value={props.user.username} name="username" ></input><br />
        <input onChange={props.handleEmail} value={props.user.email} name="email" ></input><br />
        <input onChange={props.handleHomeClubId} value={props.user.home_club_id} name="home_club_id" ></input>
        <input value= "Update Info" type="submit"/>
      </form>
    </div>
    :
    <div>
      <h3>Account Information</h3>
      <span>Name: {props.user.name}</span><br />
      <span>Username: {props.user.username}</span><br />
      <span>Email: {props.user.email}</span><br />
      <span>Home Club: {props.user.home_club_id}</span>
    </div>
);

export default UserInfo;
