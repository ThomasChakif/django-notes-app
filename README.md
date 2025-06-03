# Django/React Notes App

### Project Description
* This application is a React-based web app with a Django backend that allows users to sign in, as well as create and delete notes.

![Example home page](https://github.com/ThomasChakif/django-notes-app/blob/main/img/django-notes-app-home.png)

### Project Specifications
* User Accounts & Roles: users are able to sign in using their username and password. Once signed in, all users can view their notes, create new notes, and delete any previous notes.

![Login page](https://github.com/ThomasChakif/django-notes-app/blob/main/img/django-notes-app-login.png)

### Installation and Running the Project

#### Client
The client for this project uses React.

You must have node.js running on your machine. Once you have cloned this project you can run `npm install` to install all of the packages for this project. Then running `npm run dev` will run the dev version of this code, which will run this project on localhost:5173 (or at the location specified in the console).

#### Server
The backend for this project uses Django, a Python framework. To run the backend, make sure to cd into the backend folder and then run `python manage.py runserver`.
