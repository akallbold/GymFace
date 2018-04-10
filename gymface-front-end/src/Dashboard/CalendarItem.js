import React from "react"
import { Grid } from 'semantic-ui-react'

  // should have a couple of buttons with different event listeners or actions
  // conditional rendering



const CalendarItem = (props) => (


    <Grid.Row className="calendarItem" centered>
      {console.log(props)}
      <span>{props.classInfo.name}</span>
      <span>{props.classInfo.instructor}</span>
      <span>{props.classInfo.start_time}</span>
      <span>{props.classInfo.end_time}</span>
      { props.display ?
        <span /> :
        <button className="button" onClick={()=> props.joined ? props.dropClass(props.classInfo) : props.addClass(props.classInfo)}>{props.joined ? "Drop Class" : "Join Class"  }</button> }
    </Grid.Row>
);

export default CalendarItem;


// onClick={props.addClass(props.classInfo)}
