import React from 'react';
import CalendarContainer from "./CalendarContainer"

const Dashboard = (props) => (
  <React.Fragment>

    <CalendarContainer currentUser={props.currentUser} className="dashboard-cal"/>

  </React.Fragment>
);

export default Dashboard;



{/* <video controls autoplay muted loop
       className="myVideo"
       src={"bgvid.mp4"}
       type={"video/mp4"}>
</video> */}
