# Task Manager App

This is a full-stack task managment web application. Users can create boards, manage tasks with drag-and-drop functionality,
add new board members, and securely authenticate using JWT authentication. The interface is implemented in React and connected to a backend system built
using Java's Spring Boot framework with a MySQL database connection for data managment. The application is deployed using AWS.

## Features

- User authentication with JWT
- Register and login system
- Create and manage boards
- Add members to boards
- Create, edit, and delete tasks
- Drag-and-drop task management
- Task status workflow:
  - To Do
  - In Progress
  - Done
- Responsive frontend UI bulit in React
- REST API backend with Java Spring Boot framework
- MySQL database integration
- AWS deployment

## Tech Stack

### Backend
- Spring Boot
- Spring Security
- JWT Authentication
- Maven
- REST APIs

### Frontend
- React
- JavaScript
- CSS
- Axios
- React Router
- @hello-pangea/dnd

### Database
- MySQL

## Deployment

Frontend deployed using AWS S3 static website hosting.

Backend deployed using AWS Elastic Beanstalk.

Database hosted on AWS RDS MySQL.
