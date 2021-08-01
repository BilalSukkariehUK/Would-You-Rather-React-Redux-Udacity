# Would You Rather Project

This project was bootstraped using create-react-app for the final assessment project for Udacity's React Redux course, this app makes use of redux to manage react's state as well as bootstrap.

## App Functionality

* login to user account 
* answer list of question
* view answer statistics upon answering a question
* add new new questions
* view the leader board

## TL;DR

To start using the app right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`


## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── package.json # npm package manager file. 
├── public
│   ├── favicon.ico # React Icon.
│   └── index.html # DO NOT MODIFY
└── src
    ├── actions # the app's actions
    │   ├── questions.js # includes question related actions
    │   ├── users.js # includes users related actions
    │   └── shared.js # includes the app shared actions
    ├── reducers # the app's reducers
    │   ├── questions.js # questions reducers 
    │   ├── users.js # answers reducers
    │   └── index.js # combines the reducers
    ├── middleware # the app's middleware
    │   ├── logger.js # logs the dispatches
    │   └── index.js # adds thunk and exports applyMiddleware
    ├── components # the app's components
    │   ├── App.js # the main app component includes the routes
    │   ├── Home.js # the main component upon login includes the shared navigation
    │   ├── HomeTabs.js # renders the tabs for answered / unanswered questions
    │   ├── LeaderBoard.js # component responsible for viewing users leader board
    │   ├── Login.js # component responsible for loging users in
    │   ├── Navigation.js # the navigation bar
    │   ├── Question.js # the component responsible answering and viewing question result
    │   ├── NewQuestion.js # the component responsible for adding new questions
    │   └── QuestionList.js # the component responsible for rendering list on questions
    ├── index.css # custom styles
    └── index.js # creates the store and adds provider
```

This project follows React best practices.

## Backend Server

This project makes use of the backend server provided by Udacity. The provided file [`_DATA_.js`](src/utils/_DATA.js) contains the methods needed to perform necessary operations on the backend:



## Important
As we are using a fake database, refreshing the page will reset any events that occured such as answering a question or adding a new one.


## Contributing

This repository is part of Udacity ReactJS nanodegree program submited projects. Therefore, I most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
