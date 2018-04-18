import React from "react"
import CalendarItem from "./CalendarItem"

import { Grid } from 'semantic-ui-react'

class CalendarContainer extends React.Component {
  state = {
    classes: [],
    user: null
  }

  componentDidMount(){
    this.fetchUserCalendar()
  }

  fetchUserCalendar(){
    fetch(`http://localhost:3001/users/${this.props.currentUser.id}`)
    .then(res => res.json()).then(user => this.setState({classes: user.klasses, user: user}))
  }

  // addClass = (clas) => {
  //   let newArray=[...this.state.classes,clas]
  //   this.setState({classes:newArray})
  // }

  addClass = (clas) => {
    fetch(`http://localhost:3001/user_klasses`,
    { method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        {klass_id: clas.id, user_id: this.props.currentUser.id}
      )
    }).then(response => response.json())
     .then(json => console.log(json))
  }

  dropClass = (clas) => {
    fetch(`http://localhost:3001/user_klasses/`,
    { method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        {klass_id:clas.id, user_id:this.props.currentUser.id}
      )
    }
    ).then(response => response.json())
     .then(console.log)
  }

  // map this.props.calendar items using CalendarItem
  render() {
    console.log(this.state.user)
    return (
      <div className="dashboard-cal page">
        <h1 className="w3-animate-opacity">Welcome Meatbag!</h1>
        <Grid centered columns={5} className="dash-cal-adjust-main">
          <Grid.Row>
            <h1>Heres is a list of your classes below!</h1>
          </Grid.Row>

          <Grid.Row className="calendarHeader dashboard-cal-adjust" centered>
            <span className="header-item"><h3>Name</h3></span>
            <span className="header-item"><h3>Instructor</h3></span>
            <span className="header-item"><h3>Start Time</h3></span>
            <span className="header-item"><h3>End Time</h3></span>
            <span className="header-item"></span>
          </Grid.Row>

          {this.state.classes.map(clas => <CalendarItem key={clas.id} classInfo={clas} joined={true} addClass={this.addClass} dropClass={this.dropClass}/>)}

        </Grid>
      </div>
    );
  }
}

export default CalendarContainer;
