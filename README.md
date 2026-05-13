# Task Manager App

This is a full-stack task managment web application. Users can create boards, manage tasks with drag-and-drop functionality,
add new board members, and securely authenticate using JWT authentication. The interface is implemented in React and connected to a backend system built
using Java's Spring Boot framework with a MySQL database connection for data managment. The application is deployed using AWS.

Website endpoint: http://task-manager-app-v.0.2.s3-website.eu-central-1.amazonaws.com/

## App Owerview

<table>
  <tr>
    <td align="center"><strong>Login</strong></td>
    <td align="center"><strong>Register</strong></td>
  </tr>
  <tr>
    <td>
      <img width="900" alt="login-page" src="https://github.com/user-attachments/assets/08c56999-f99d-468d-9850-18692f42e02b" />
    </td>
    <td>
      <img width="900" alt="register-page" src="https://github.com/user-attachments/assets/91002116-975f-4aea-a2df-bda24112dda8" />
    </td>
  </tr>
</table>

### Home Page
<img width="1900" height="831" alt="home-page" src="https://github.com/user-attachments/assets/90e0d37f-f648-41a5-ab85-52186021741e" />

<table>
  <tr>
    <td align="center"><strong>New Task</strong></td>
    <td align="center"><strong>Update Task</strong></td>
  </tr>
  <tr>
    <td>
      <img width="400" alt="new-task-modal" src="https://github.com/user-attachments/assets/41d9552f-ae0e-4b12-9169-f1d16598ed70" />
    </td>
    <td>
      <img width="400" alt="udpate-task-modal" src="https://github.com/user-attachments/assets/46b2ef36-9543-4194-94a6-3c8d29868962" />
    </td>
  </tr>
</table>

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
- Responsive frontend UI built in React
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
