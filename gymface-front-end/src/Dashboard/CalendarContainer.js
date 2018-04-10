import React from "react"
import CalendarItem from "./CalendarItem"

import { Grid } from 'semantic-ui-react'

class CalendarContainer extends React.Component {
  state = {
    classes: []
  }

  componentDidMount(){
    this.fetchUserCalendar()
  }

  fetchUserCalendar(){
    fetch(`http://localhost:3001/users/${this.props.currentUser.id}`)
    .then(res => res.json()).then(user => this.setState({classes: user.klasses}))
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

  columnHeaders(){
    return { name: <h3>Name</h3>,
      instructor: <h3>Instructor</h3>,
      start_time: <h3>Start Time</h3>,
      end_time: <h3>End Time</h3>,
      joined: false
    }
  }

  // map this.props.calendar items using CalendarItem
  render() {
    return (
      <div className="dashboard-cal page">
        <h1 className="w3-animate-opacity">Welcome Meatbag!</h1>
        <Grid centered columns={5}>
          <Grid.Row>
            <h1>Heres is a list of your classes below!</h1>
          </Grid.Row>

          <CalendarItem classInfo={this.columnHeaders()} display={true}/>

          {this.state.classes.map(clas => <CalendarItem key={clas.id} classInfo={clas} joined={true} addClass={this.addClass} dropClass={this.dropClass}/>)}

        </Grid>
      </div>
    );
  }
}

export default CalendarContainer;
