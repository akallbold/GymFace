import React, { Component } from 'react';
import Webcam from 'react-webcam'

class WebcamContainer extends Component {

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.generateBuffer(imageSrc)
  };

  generateBuffer = (base64img) => {
    var matches = base64img.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var type = matches[1]; // e.g. 'image/jpeg'
    var buffer = new Buffer(matches[2], 'base64');
    // ^^ img content converted to binary buffer stream
    this.props.webcamCallback(buffer, base64img)
  }

render() {
    return (
      <div>
        <Webcam audio={false} ref={this.setRef} screenshotFormat="image/jpeg" height="500"/><br/>
        <button className="button" onClick={this.capture}>Capture Image</button>
      </div>
    );
  }

}

export default WebcamContainer;
