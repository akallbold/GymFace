import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import SignUpForm from './SignUpForm'
import WebcamContainer from '../WebcamContainer'
import { AWS_ID, AWS_KEY } from '../env.js'

let AWS = require('aws-sdk');
let myConfig = new AWS.Config({
  accessKeyId: AWS_ID, secretAccessKey: AWS_KEY, region: 'us-east-2'
})
let rekognition = new AWS.Rekognition(myConfig);

class SignUpContainer extends Component {

  state = {
    capturedFaceId: null,
    capturedPreview: null,
    storedBuffer: null
  }

  signUp = (event) => {
    event.preventDefault()
    let name = event.target.name.value
    let email = event.target.email.value
    let club = event.target.club.value
    let username = event.target.username.value
    let password = event.target.password.value

    let params = {
      CollectionId: "gymface",
      Image: {
       Bytes: this.state.storedBuffer
      }
    };

    rekognition.indexFaces(params, (err, data) => {
      if (err) {
       alert('Try again!')
      } else {
       this.setState({
         capturedFaceId: data.FaceRecords[0].Face.FaceId
       })
      }
    })

    if (this.state.capturedFaceId === null){
      return alert("Take a photo to complete the form.")
    }

    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user: {
          name: name,
          email: email,
          home_club_id: club,
          username: username,
          password: password,
          face_id: this.state.capturedFaceId
        }
      })
    }).then(res => res.json()).then(json => {
      if (json.error){
        alert("Your email or username is already in use. Try again.")
      } else {
        this.props.setUser(json)
      }
    })
  }

  capturePreview = (buffer, base64) => {
    console.log("hi")
    this.setState({capturedPreview: base64, storedBuffer: buffer})
  }

  render() {
    return (
      <Grid centered columns={2} className="page">
        { this.props.currentUser ?
          <h1> Welcome, {this.props.currentUser.name} </h1> :
          <React.Fragment>
            <h1> Sign Up! </h1>
            <Grid.Row>
              <WebcamContainer webcamCallback={this.capturePreview}/>
              {this.state.capturedPreview === null ? <div/> : <img src={this.state.capturedPreview} alt="Profile Pic Preview" height="300"/>}
            </Grid.Row>
            <Grid.Row><SignUpForm submit={this.signUp}/></Grid.Row>
          </React.Fragment>
        }
      </Grid>
    );
  }

}

export default SignUpContainer;
