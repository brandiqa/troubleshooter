# TROUBLESHOOTER

## Introduction
This a help desk application designed to support an organization's employees. Its runs on NodeJS and is developed using Javascript technologies: React, Mobx, FeathersJS and Mongodb.

##  How to install

```bash
git clone git@github.com:brandiqa/troubleshooter.git
cd troubleshooter

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

## How to run
Ensure you have mongodb installed in your system and that it is running

Inside the project root folder, create a file and name it .env. Paste the following content and save the file:

```env
# babel
REACT_APP_BABEL_STAGE_0=true
REACT_APP_DECORATORS=true
```


### Start the backend server
Start the backend server first:

```bash
cd troubleshooter/backend
npm start
```
This will run the backend server at localhost:3030. If all is working well, you should be able to access the url http://localhost:3030/contacts from your Browser or Postman


### Start the client
Open a separate terminal to start the client:

```bash
cd troubleshooter
npm start
```

Your default web browser will be launched automatically with the url http://localhost:3000

### Default Credentials
You will be present with the login screen. Login as admin and create other users:

email: admin@example.com
password: admin
