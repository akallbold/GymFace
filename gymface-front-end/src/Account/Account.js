import React, { Component } from 'react';

import UserInfo from './UserInfo'

import { Grid } from 'semantic-ui-react'
import Webcam from 'react-webcam'

import { AWS_ID, AWS_KEY } from '../env.js'

let AWS = require('aws-sdk');
let myConfig = new AWS.Config({
  accessKeyId: AWS_ID, secretAccessKey: AWS_KEY, region: 'us-east-2'
})
let rekognition = new AWS.Rekognition(myConfig);


class Account extends Component {

  state = {
    user: {
      name:"",
      username:"",
      email:"",
      home_club_id:""
    },
    capturedImage: "",
    edit:false
  }

  handleName = (event) => {this.setState({user:{...this.state.user, name:event.target.value}})}
  handleUsername = (event) => {this.setState({user:{...this.state.user, username:event.target.value}})}
  handleEmail = (event) => {this.setState({user:{...this.state.user, email:event.target.value}})}
  handleHomeClubId = (event) => {this.setState({user:{...this.state.user, home_club_id:event.target.value}})}

  componentDidMount(){
    fetch('http://localhost:3001/users/1')
    .then(res => res.json())
    .then(user => this.setState({user: user}))
  }

  handleEditInfo = () => {
    this.setState({edit:!this.state.edit})
  }

  handleFormInput = (event) => {
    event.preventDefault()
    fetch(`http://localhost:3001/users/1`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        {user_id:1,
        name:event.target.name.value,
        username:event.target.username.value,
        email:event.target.email.value,
        home_club_id:event.target.home_club_id.value
        }
      )
    }).then(response => response.json())
      .then(data => this.handleEditInfo())
  }

  render() {
    return (
      <Grid centered columns={2}>
        <Grid.Row><UserInfo user={this.state.user}
                            edit={this.state.edit}
                            updateInfo={this.updateInfo}
                            handleFormInput={this.handleFormInput}
                            handleName={this.handleName}
                            handleUsername={this.handleUsername}
                            handleEmail={this.handleEmail}
                            handleHomeClubId={this.handleHomeClubId}/>
        <button onClick={this.capture}>Capture photo</button>
        <button onClick={this.handleEditInfo}>Edit Profile</button></Grid.Row>

        <Grid.Row>
          <Webcam
          audio={false}
          ref={this.setRef}
          screenshotFormat="image/jpeg"/>
          {this.state.capturedImage ? <img src={this.state.capturedImage} alt="snapshot results"/> : null}
        </Grid.Row>
      </Grid>
    );
  }

}

export default Account;
