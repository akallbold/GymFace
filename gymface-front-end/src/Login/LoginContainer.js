import React, { Component } from 'react';

import LoginForm from './LoginForm'
import WebcamContainer from '../WebcamContainer';

import { AWS_ID, AWS_KEY } from '../env.js'
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

let AWS = require('aws-sdk');
let myConfig = new AWS.Config({
  accessKeyId: AWS_ID, secretAccessKey: AWS_KEY, region: 'us-east-2'
})
let rekognition = new AWS.Rekognition(myConfig);

class LoginContainer extends Component {

   matchFace = (buffer) => {
     let params = {
       CollectionId: "gymface",
       FaceMatchThreshold: 95,
       Image: { Bytes: buffer },
       MaxFaces: 5
     };

     rekognition.searchFacesByImage(params, (err, data) => {
        if (err) {
          alert("Make sure your face is in the photo!")
        } else if (data["FaceMatches"].length === 0){
          alert("No user found. Try again.")
        } else {
          fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({face_info: data})
          }).then(res => res.json()).then(json => {
            console.log(json, buffer)
            alert(`Welcome, ${json.name}`)
            this.props.setUser(json)
          })
        }
      })
   }

   handleLogin = (event) => {
     event.preventDefault()
     let username = event.target.username.value
     let password = event.target.password.value

     fetch('http://localhost:3001/login', {
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({user: {username: username, password: password}})
     }).then(res => res.json()).then(user => {
       if (user.error){
         alert(user.error)
       } else {
         this.props.setUser(user)
       }
     })
   }

  render() {
    return (
      <Grid centered columns={2}>
        {this.props.currentUser ? <h1> Welcome, {this.props.currentUser.name}!</h1> : <React.Fragment> <h1> Login </h1>
        <Grid.Row>
          <WebcamContainer webcamCallback={this.matchFace}/>
        </Grid.Row>
        <Grid.Row>
          <LoginForm loginCallback={this.handleLogin}/>
        </Grid.Row>
          <Link to="/signup" className="button">Or Sign Up!</Link>
        </React.Fragment>}
      </Grid>
    );
  }

}

export default LoginContainer;
