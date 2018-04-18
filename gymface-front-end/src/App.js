import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Header from './Header'
import Dashboard from './Dashboard/Dashboard'
import Classes from './Classes/Classes'
import Account from './Account/Account'
import LoginContainer from './Login/LoginContainer'
import SignUpContainer from './SignUp/SignUpContainer'

import './App.css';
import { Grid } from 'semantic-ui-react'

class App extends Component {

  state = {
    currentUser: null
  }

  // TODO - add loading for classes, string parse the dates

  setUser = (user) => {
    this.setState({currentUser: user})
  }

  logout = () => {
    this.setState({currentUser: null})
  }

  render() {
    return (
      <Grid centered id="app">
        <Router>
          <React.Fragment>

            <Grid.Row>
              <Header logout={this.logout} currentUser={this.state.currentUser}/>
            </Grid.Row>

            <Grid.Row>
              <div className="page">
                <Switch>
                  <Route exact path='/login' render={() => <LoginContainer setUser={this.setUser}
                  currentUser={this.state.currentUser}/>} />

                  <Route exact path="/signup" render={routerProps => <SignUpContainer {...routerProps} setUser={this.setUser} currentUser={this.state.currentUser}/>} />
                  
                  {this.state.currentUser ?
                    <React.Fragment>
                    <Route exact path="/" render={() => <Dashboard currentUser={this.state.currentUser}/>} />
                    <Route exact path="/classes" component={Classes} />
                    <Route exact path="/account" component={Account} />
                    </React.Fragment>
                    : <Redirect to="/login" />}
                </Switch>
              </div>
            </Grid.Row>

          </React.Fragment>
        </Router>

      </Grid>
    );
  }
}

export default App;
