# Trello
Trello Example
![Main Screen](https://user-images.githubusercontent.com/48253088/144048789-c9bdd674-a907-4897-80e0-a326710a53c2.PNG)

# Features
- UI written in React, using functional components with React Hooks
- Backend written in NodeJS/Express
- Relational data storage with PostgreSQL

# Installation
- Install PostgreSQL and create a db named postgres and create tables with queries in Back-End\trello-example.sql
- Clone this repository https://github.com/chirayukh/trello.git
- Run npm install in both Back-End and Front-End to install dependencies
- cd into Back-End and run command "node index.js" or "npx nodemon index.js" to spin Backend API
- cd into Front-End and run command "npm start" respectively to spin Frotend
- Frontend should be running on http://localhost:3000 and Backend API on http://localhost:5000

# Note
- There is no Login screen so consider that user is logged in.
- You can configure Postgres DB connection in Back-End\dbConnection.js.
- If the Back-end service is not up and running and if you have not created the tables in db. The UI won't work properly.
- It's not perfectly created.
