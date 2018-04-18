# GYMFACE

**By Anna Kallenborn-Bolden & Julien Tregoat**

A lifestyle management application that doubles as a solution to gyms with physical tokens for entry.

In an online form, **GYMFACE** is a dashboard for your to view gym classes (in this case, Equinox) and add them to a personal calendar. Currently, it's limited to solely those classes, but the plan is to next add restaurant reccomendations based on what gym you're located at. Currently, it supports only NYC Equinox gyms.

In a gym solution form, you could have GYMFACE manage your gyms coming and going clients. Logging in with their face would be faster and cause less of a bottleneck. On a security note, it would be able to prevent other people using memberships that aren't theirs.

The app was made with a Rails API and a React frontend. To enable users to log into an account using their face, AWS Rekognition was used. Faces were initially uploaded to S3, but it was more cost efficient to store the face in Rekognition using their face-ids, and storing that within the database. Obtaining the Equinox schedule was more involved than expected; they have no API and the schedule is JavaScript rendered. To get around this, we implemented Watir and Selenium to open up a virtual browser, wait to pull the information from the DOM, and save it, while making sure the minimize the amount of time the window was open (thus minimizing user wait time).

This was completed in one week as the Module 4 final project at the Flatiron School.
